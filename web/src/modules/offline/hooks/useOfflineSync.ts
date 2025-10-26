import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { setSyncInProgress, setSyncProgress } from "../../../store/components/app/app";
import { syncManager } from "../syncManager";

export type ApiConfig = Record<string, string>; // tableName -> apiUrl

export const useOfflineSync = (enabled: boolean, apiConfig: ApiConfig) => {
  const [progress, setProgress] = useState(0);
  const [syncing, setSyncing] = useState(false);
  const dispatch = useAppDispatch();

  const startSync = useCallback(async () => {
    if (!enabled || syncing) return;
    setSyncing(true);
    setProgress(0);
    dispatch(setSyncInProgress(true));
    dispatch(setSyncProgress(0));

    const entries = Object.entries(apiConfig) as Array<[
      "clients" | "accounts" | "ledger" | string,
      string
    ]>;
    const perTableWeight = entries.length ? Math.floor(100 / entries.length) : 100;
    let acc = 0;

    for (const [table, apiUrl] of entries) {
      await syncManager.syncTable(table as any, apiUrl, (p) => {
        const tablePct = Math.min(100, Math.max(0, p));
        const overall = Math.min(100, acc + Math.floor((perTableWeight * tablePct) / 100));
        setProgress(overall);
        dispatch(setSyncProgress(overall));
      });
      acc += perTableWeight;
      setProgress(acc);
      dispatch(setSyncProgress(acc));
    }

    setSyncing(false);
    dispatch(setSyncInProgress(false));
    dispatch(setSyncProgress(100));
  }, [enabled, apiConfig, dispatch, syncing]);

  // Background sync every minute when enabled
  useEffect(() => {
    if (!enabled) return;
    const id = setInterval(() => {
      void startSync();
    }, 60_000);
    return () => clearInterval(id);
  }, [enabled, startSync]);

  // Auto-sync when coming back online
  useEffect(() => {
    if (!enabled) return;
    const onOnline = () => void startSync();
    window.addEventListener("online", onOnline);
    return () => window.removeEventListener("online", onOnline);
  }, [enabled, startSync]);

  return { syncing, progress, startSync };
};

export default useOfflineSync;
