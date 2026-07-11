export const dynamic = "force-dynamic";

export default function TestEnvPage() {
  const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const clerkSecretKey = process.env.CLERK_SECRET_KEY;
  const dbUrl = process.env.DATABASE_URL;

  return (
    <div style={{ padding: "2rem", fontFamily: "monospace" }}>
      <h1>Environment Variable Check</h1>
      <ul>
        <li>
          <strong>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:</strong>{" "}
          {clerkPubKey ? `Loaded (Length: ${clerkPubKey.length}, Starts with: ${clerkPubKey.substring(0, 8)})` : "MISSING ❌"}
        </li>
        <li>
          <strong>CLERK_SECRET_KEY:</strong>{" "}
          {clerkSecretKey ? `Loaded (Length: ${clerkSecretKey.length}, Starts with: ${clerkSecretKey.substring(0, 8)})` : "MISSING ❌"}
        </li>
        <li>
          <strong>DATABASE_URL:</strong>{" "}
          {dbUrl ? `Loaded (Length: ${dbUrl.length})` : "MISSING ❌"}
        </li>
      </ul>
      <p>If any key is MISSING, please check your Vercel Project Settings -> Environment Variables.</p>
    </div>
  );
}
