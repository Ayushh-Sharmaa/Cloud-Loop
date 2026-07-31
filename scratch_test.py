import urllib.request
import urllib.error
import json
import ssl
import urllib.parse

def test_google():
    print("Testing Google Careers API...")
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    
    # Try the official Google about/careers endpoint
    urls = [
        "https://www.google.com/about/careers/applications/api/v1/jobs/?q=Software%20Engineer&page_size=10",
        "https://www.google.com/about/careers/applications/api/v1/jobs/search/?q=Software%20Engineer&page_size=10",
        "https://careers.google.com/api/v1/jobs/search/?q=Software%20Engineer&page_size=10"
    ]
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
    
    for url in urls:
        print(f"Trying Google URL: {url}")
        req = urllib.request.Request(url, headers=headers)
        try:
            with urllib.request.urlopen(req, context=ctx, timeout=10) as response:
                body = response.read().decode('utf-8')
                data = json.loads(body)
                # Sometimes response is in 'jobs' or 'results'
                jobs = data.get('jobs', data.get('results', []))
                print(f"  SUCCESS! Fetched {len(jobs)} jobs.")
                if jobs:
                    print("  Sample job title:", jobs[0].get('title') or jobs[0].get('role'))
                break
        except urllib.error.HTTPError as e:
            print(f"  HTTP Error {e.code}: {e.reason}")
            try:
                print("  Body:", e.read().decode('utf-8')[:200])
            except Exception:
                pass
        except Exception as e:
            print(f"  General Error: {e}")

def test_gfg():
    print("\nTesting GeeksforGeeks Jobs Page...")
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    
    # Let's try fetching GeeksforGeeks Jobs home or search page
    url = "https://jobs.geeksforgeeks.org/"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    }
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=10) as response:
            body = response.read().decode('utf-8')
            print("GFG Response Status:", response.status)
            print("GFG HTML length:", len(body))
            # Check if there is some script tag containing job details, or search results
            if "job" in body.lower():
                print("GFG HTML contains the word 'job'.")
            else:
                print("GFG HTML does not contain 'job'.")
            # Print a portion of HTML to inspect it
            print("GFG HTML preview:", body[:1000])
    except Exception as e:
        print(f"GFG Error: {e}")

if __name__ == "__main__":
    test_google()
    test_gfg()
