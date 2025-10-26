import db from "./db";

type TableName = keyof typeof db & "clients" | "accounts" | "ledger";

export const offlineService = {
  async add(table: TableName, data: any) {
    const record = {
      ...data,
      synced: false,
      updatedAt: new Date().toISOString(),
    };
    // @ts-ignore dynamic table access
    return (db as any)[table].add(record);
  },
  async update(table: TableName, id: string | number, changes: any) {
    const patch = {
      ...changes,
      synced: false,
      updatedAt: new Date().toISOString(),
    };
    // @ts-ignore dynamic table access
    return (db as any)[table].update(id, patch);
  },
  async delete(table: TableName, id: string | number) {
    // @ts-ignore dynamic table access
    return (db as any)[table].delete(id);
  },
  async getAll<T = any>(table: TableName): Promise<T[]> {
    // @ts-ignore dynamic table access
    return (db as any)[table].toArray();
  },
};

export default offlineService;
