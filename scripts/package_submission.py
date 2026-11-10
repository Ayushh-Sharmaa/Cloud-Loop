#!/usr/bin/env python3
"""
Submission Packaging & Validation Script
Packages Cloud Loop into the official submissions/cloud-loop folder,
scans for secrets, and validates against the hackathon requirements.
"""

import os
import sys
import shutil
import re
import json
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
SUBMISSION_SLUG = "cloud-loop"
OUTPUT_DIR = ROOT_DIR / "dist" / "submissions" / SUBMISSION_SLUG

# Submissions submodule repo
IBM_REPO_DIR = ROOT_DIR / "IBM_Db2_TechX_Project_Submission"
IBM_SUBMISSION_DIR = IBM_REPO_DIR / "submissions" / SUBMISSION_SLUG

FORBIDDEN_FILES = [".env", ".env.local", ".env.development", ".env.production", "id_rsa", "id_ed25519"]
FORBIDDEN_EXTENSIONS = [".pem", ".pfx", ".p12", ".key", ".db", ".sqlite", ".sqlite3"]

ALLOW_LIST = [
    "README.md",
    "architecture.md",
    "submission.json",
    ".env.example",
    "docker-compose.yml",
    "src/ai-service",
    "src/web",
    "docs",
    "tests",
    "scripts",
]

IGNORE_PATTERNS = shutil.ignore_patterns(
    "node_modules",
    ".next",
    ".git",
    "*.pyc",
    "__pycache__",
    ".pytest_cache",
    "*.tsbuildinfo",
    "*.db",
    "*.sqlite",
    "*.sqlite3",
    ".clerk",
    ".probe",
    "dist",
)


def secret_scan(dir_path: Path) -> list:
    errors = []
    secret_patterns = [
        re.compile(r"(?i)api[_-]?key\s*[:=]\s*['\"](?!your_|placeholder|<)[A-Za-z0-9_\-]{20,}['\"]"),
        re.compile(r"(?i)password\s*[:=]\s*['\"](?!your_|placeholder|<)[A-Za-z0-9_\-]{8,}['\"]"),
        re.compile(r"(?i)sk_live_[0-9a-zA-Z]{24}"),
        re.compile(r"(?i)ghp_[0-9a-zA-Z]{36}"),
    ]

    for root, _, files in os.walk(dir_path):
        for file in files:
            file_lower = file.lower()
            file_path = Path(root, file)

            # Check filename / extension
            if file_lower in FORBIDDEN_FILES or any(file_lower.endswith(ext) for ext in FORBIDDEN_EXTENSIONS):
                errors.append(f"Forbidden file pattern detected: {file_path.relative_to(dir_path)}")
                continue

            # Check contents of text files
            if file_lower.endswith((".py", ".json", ".md", ".txt", ".ts", ".tsx", ".yaml", ".yml", ".env.example")):
                try:
                    with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                        for line_no, line in enumerate(f, 1):
                            for pattern in secret_patterns:
                                if pattern.search(line):
                                    errors.append(
                                        f"Potential secret in {file_path.relative_to(dir_path)}:{line_no}"
                                    )
                except Exception:
                    pass

    return errors


def package_submission():
    print(f"=== Packaging Submission: {SUBMISSION_SLUG} ===")

    # 1. Clean output directory
    if OUTPUT_DIR.exists():
        shutil.rmtree(OUTPUT_DIR)
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # 2. Copy root files and directories
    for item in ALLOW_LIST:
        src = ROOT_DIR / item
        dst = OUTPUT_DIR / item
        if not src.exists():
            continue

        if src.is_file():
            dst.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(src, dst)
            print(f"Copied file: {item}")
        elif src.is_dir():
            shutil.copytree(src, dst, ignore=IGNORE_PATTERNS)
            print(f"Copied directory: {item}")

    # 3. Perform Secret Scanning
    print("\n--- Running Secret & Security Scan ---")
    scan_errors = secret_scan(OUTPUT_DIR)
    if scan_errors:
        print("SECURITY SCAN FAILED:")
        for err in scan_errors:
            print(f"  [!] {err}")
        sys.exit(1)
    else:
        print("Security scan PASSED: Zero committed secrets or prohibited extensions detected.")

    # 4. Sync with official IBM submission repo if available
    if IBM_REPO_DIR.exists():
        print(f"\n--- Syncing to {IBM_SUBMISSION_DIR} ---")
        if IBM_SUBMISSION_DIR.exists():
            shutil.rmtree(IBM_SUBMISSION_DIR)
        shutil.copytree(OUTPUT_DIR, IBM_SUBMISSION_DIR)
        print(f"Synced submission package to {IBM_SUBMISSION_DIR}")

        # Run official validator
        val_script = IBM_REPO_DIR / "scripts" / "validate_submission.py"
        if val_script.exists():
            print("\n--- Running Official Validator ---")
            import subprocess
            res = subprocess.run([sys.executable, str(val_script), str(IBM_SUBMISSION_DIR)], capture_output=True, text=True)
            print(res.stdout)
            if res.stderr:
                print(res.stderr)
            if res.returncode != 0:
                print(f"Official validation exited with code {res.returncode}")
                sys.exit(res.returncode)
            else:
                print("Official hackathon validator: PASSED!")

    print("\nPackage generated successfully at:", OUTPUT_DIR)


if __name__ == "__main__":
    package_submission()
