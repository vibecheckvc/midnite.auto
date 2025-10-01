"use client";

import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/utils/supabaseClient";
import type { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

/** Narrow row type so Supabase payloads are properly typed */
type Row = Record<string, unknown>;

/** subscribe helper (typed + correct cleanup shape) */
function subscribeTable<T extends Row>(
  table: string,
  filter: string | undefined,
  cb: (payload: RealtimePostgresChangesPayload<T>) => void
): () => void {
  const channel = supabase
    .channel(`${table}:${filter ?? "all"}`)
    .on(
      "postgres_changes", // exact literal expected by the overload
      { event: "*", schema: "public", table, filter },
      cb
    )
    .subscribe();

  // Cleanup must return void (not a Promise)
  return () => {
    void supabase.removeChannel(channel);
  };
}

/**
 * useRealtimeQuery
 * - fetchFn: how to get initial data
 * - table: supabase table name
 * - filter: string like `user_id=eq.${uid}`
 * - onChange: merge realtime payload into cache
 */
export function useRealtimeQuery<T extends Row>({
  keys,
  fetchFn,
  table,
  filter,
  onChange,
}: {
  keys: (string | number)[];
  fetchFn: () => Promise<T[]>;
  table: string;
  filter?: string;
  onChange?: (
    prev: T[] | undefined,
    payload: RealtimePostgresChangesPayload<T>
  ) => T[] | undefined;
}) {
  const qc = useQueryClient();

  const query = useQuery<T[]>({
    queryKey: keys,
    queryFn: fetchFn,
  });

  useEffect(() => {
    return subscribeTable<T>(table, filter, (payload) => {
      if (!onChange) {
        qc.invalidateQueries({ queryKey: keys });
        return;
      }
      qc.setQueryData<T[]>(keys, (prev) => onChange(prev, payload));
    });
    // keys array is stable when stringified; safe for this use-case
  }, [JSON.stringify(keys), table, filter, onChange, qc]);

  return query;
}

/** useOptimisticMutation: for instant UI updates, with typed context */
export function useOptimisticMutation<
  TItem,
  TVars,
  TResult = unknown
>({
  keys,
  mutationFn,
  insertShape,
}: {
  keys: (string | number)[];
  mutationFn: (vars: TVars) => Promise<TResult>;
  insertShape?: (vars: TVars) => TItem;
}) {
  const qc = useQueryClient();

  return useMutation<TResult, Error, TVars, { previous: TItem[] | undefined }>({
    mutationFn,
    onMutate: async (vars) => {
      await qc.cancelQueries({ queryKey: keys });

      const previous = qc.getQueryData<TItem[]>(keys);

      if (insertShape) {
        qc.setQueryData<TItem[]>(keys, (old) => [
          insertShape(vars),
          ...(old ?? []),
        ]);
      }

      // typed context (fixes “Property 'previous' does not exist on type '{}'”)
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) qc.setQueryData(keys, ctx.previous);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: keys });
    },
  });
}
