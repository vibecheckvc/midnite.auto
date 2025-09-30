"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/utils/supabaseClient";
import { RealtimePostgresInsertPayload } from "@supabase/supabase-js";

/** --- Types --- */
type Profile = { username: string; avatar_url: string | null };

export type ActivityRow = {
  id: string;
  user_id: string;
  type: "build_added" | "like" | "comment" | "event_joined";
  ref_id: string | null;
  created_at: string;
  profiles: Profile | null;
  ref_title?: string | null; // resolved later
};

/** --- Narrowing helpers --- */
function isObj(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}
function isProfile(v: unknown): v is Profile {
  return (
    isObj(v) &&
    typeof v.username === "string" &&
    (typeof v.avatar_url === "string" || v.avatar_url === null)
  );
}
function pickOne<T>(val: unknown, guard: (x: unknown) => x is T): T | null {
  if (Array.isArray(val)) {
    const first = val[0];
    return guard(first) ? first : null;
  }
  return guard(val) ? val : null;
}

/** shape any raw row from supabase into ActivityRow (or null if invalid) */
function normalizeActivity(raw: unknown): ActivityRow | null {
  if (!isObj(raw)) return null;

  const id = raw["id"];
  const user_id = raw["user_id"];
  const type = raw["type"];
  const ref_id = raw["ref_id"];
  const created_at = raw["created_at"];
  const profiles = pickOne(raw["profiles"], isProfile);

  if (
    typeof id === "string" &&
    typeof user_id === "string" &&
    (type === "build_added" ||
      type === "like" ||
      type === "comment" ||
      type === "event_joined") &&
    (ref_id === null || typeof ref_id === "string") &&
    typeof created_at === "string"
  ) {
    return {
      id,
      user_id,
      type,
      ref_id,
      created_at,
      profiles: profiles ?? null,
    };
  }
  return null;
}

export default function ActivityFeed() {
  const [activities, setActivities] = useState<ActivityRow[]>([]);
  const [loading, setLoading] = useState(true);

  const selectCols = `
    id, user_id, type, ref_id, created_at,
    profiles ( username, avatar_url )
  ` as const;

  /** Batch fetch builds + events */
  const enrichRefs = async (rows: ActivityRow[]): Promise<ActivityRow[]> => {
    const buildIds = rows
      .filter((a) => a.type === "build_added" && a.ref_id)
      .map((a) => a.ref_id as string);

    const eventIds = rows
      .filter((a) => a.type === "event_joined" && a.ref_id)
      .map((a) => a.ref_id as string);

    let buildMap: Record<string, string> = {};
    let eventMap: Record<string, string> = {};

    if (buildIds.length > 0) {
      const { data } = await supabase
        .from("builds")
        .select("id, title")
        .in("id", buildIds);

      if (data) {
        buildMap = Object.fromEntries(data.map((b) => [b.id, b.title]));
      }
    }

    if (eventIds.length > 0) {
      const { data } = await supabase
        .from("events")
        .select("id, title")
        .in("id", eventIds);

      if (data) {
        eventMap = Object.fromEntries(data.map((e) => [e.id, e.title]));
      }
    }

    return rows.map((a) => {
      if (a.type === "build_added" && a.ref_id) {
        return { ...a, ref_title: buildMap[a.ref_id] ?? null };
      }
      if (a.type === "event_joined" && a.ref_id) {
        return { ...a, ref_title: eventMap[a.ref_id] ?? null };
      }
      return a;
    });
  };

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("activities")
        .select(selectCols)
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) {
        console.error("ActivityFeed fetch error:", error.message);
        setActivities([]);
      } else {
        const rows = (data ?? [])
          .map(normalizeActivity)
          .filter((x): x is ActivityRow => x !== null);

        const enriched = await enrichRefs(rows);
        setActivities(enriched);
      }

      setLoading(false);
    };

    fetchActivities();

    // realtime insert → fetch new row + batch resolve its ref
    const channel = supabase
      .channel("activity-feed")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "activities" },
        async (
          payload: RealtimePostgresInsertPayload<Record<string, unknown>>
        ) => {
          const insertedId =
            isObj(payload.new) && typeof payload.new["id"] === "string"
              ? (payload.new["id"] as string)
              : null;
          if (!insertedId) return;

          const { data } = await supabase
            .from("activities")
            .select(selectCols)
            .eq("id", insertedId)
            .single();

          const normalized = normalizeActivity(data as unknown);
          if (normalized) {
            const [enriched] = await enrichRefs([normalized]);
            setActivities((prev) => [enriched, ...prev]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const renderMessage = (a: ActivityRow) => {
    const user = a.profiles?.username ?? "Someone";
    switch (a.type) {
      case "build_added":
        return `${user} added a new build: ${a.ref_title ?? "Untitled build"}`;
      case "like":
        return `${user} liked a build`;
      case "comment":
        return `${user} commented on a build`;
      case "event_joined":
        return `${user} joined event: ${a.ref_title ?? "Unknown event"}`;
      default:
        return `${user} did something`;
    }
  };

  if (loading) {
    return (
      <div className="rounded-lg border bg-black/40 backdrop-blur-md p-4">
        <h2 className="font-semibold mb-4 text-white">Activity Feed</h2>
        <p className="text-neutral-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-black/40 backdrop-blur-md p-4 shadow-lg shadow-purple-700/30">
      <h2 className="font-semibold mb-4 text-white">Activity Feed</h2>
      {activities.length === 0 ? (
        <p className="text-neutral-400">No recent activity.</p>
      ) : (
        <ul className="space-y-4">
          {activities.map((a) => (
            <li
              key={a.id}
              className="flex items-center gap-3 text-sm text-neutral-300"
            >
              {a.profiles?.avatar_url ? (
                <Image
                  src={a.profiles.avatar_url}
                  alt={a.profiles.username ?? "user"}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-purple-600" />
              )}
              <div>
                <p className="text-white">{renderMessage(a)}</p>
                <span className="text-xs text-neutral-500">
                  {new Date(a.created_at).toLocaleString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
