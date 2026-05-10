import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { users } from "../db/schema.js";
import { createClerkClient } from "@clerk/backend";
import { getEnv } from "./env";
import { parseRole } from "./roles";

export async function getLocalUser(clerkUserId: string) {
  const [row] = await db.select().from(users).where(eq(users.clerkUserId, clerkUserId)).limit(1);
  return row;
}

/**
 * Tries to get the user from the local DB. If missing, fetches from Clerk and syncs.
 * This handles cases where webhooks might be delayed or failed.
 */
export async function getOrSyncUser(clerkUserId: string) {
  const local = await getLocalUser(clerkUserId);
  if (local) return local;

  console.log(`User ${clerkUserId} not found locally. Attempting JIT sync with Clerk...`);

  try {
    const env = getEnv();
    const clerk = createClerkClient({ secretKey: env.CLERK_SECRET_KEY });
    const u = await clerk.users.getUser(clerkUserId);

    if (!u) {
      console.warn(`User ${clerkUserId} not found in Clerk.`);
      return null;
    }

    const email =
      u.emailAddresses?.find((e) => e.id === u.primaryEmailAddressId)?.emailAddress ??
      u.emailAddresses?.[0]?.emailAddress;

    const displayName =
      [u.firstName, u.lastName].filter(Boolean).join(" ") || u.username || null;

    const role = parseRole(u.publicMetadata?.role);

    const [synced] = await db
      .insert(users)
      .values({
        clerkUserId: u.id,
        email: email ?? "",
        displayName,
        role,
      })
      .onConflictDoUpdate({
        target: users.clerkUserId,
        set: { email: email ?? "", displayName, role, updatedAt: new Date() },
      })
      .returning();

    console.log(`JIT sync successful for user: ${u.id}`);
    return synced;
  } catch (err) {
    console.error("Failed to sync user with Clerk:", err);
    return null;
  }
}

