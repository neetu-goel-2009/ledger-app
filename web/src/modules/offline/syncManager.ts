import db from "./db";
import axios from "axios";

export type ProgressCb = (pct: number) => void;

export const syncManager = {
  async syncTable(tableName: "clients" | "accounts" | "ledger", apiUrl: string, onProgress?: ProgressCb) {
    // @ts-ignore
    const unsyncedRecords = await (db as any)[tableName].where("synced").equals(false).toArray();
    const total = unsyncedRecords.length || 1;
    let completed = 0;

    for (const record of unsyncedRecords) {
      try {
        await axios.post(apiUrl, record);
        // @ts-ignore
        await (db as any)[tableName].update(record.id, { synced: true });
      } catch (err) {
        // Leave record as unsynced, move on
        console.error(`[sync] Failed to sync ${tableName} id=${record?.id}`, err);
      }
      completed++;
      onProgress?.(Math.round((completed / total) * 100));
    }
  },
};

export default syncManager;
