import Dexie, { Table } from "dexie";

export interface ClientRec {
  id: string | number;
  name: string;
  updatedAt?: string;
  synced?: boolean;
}

export interface AccountRec {
  id: string | number;
  clientId: string | number;
  amount: number;
  updatedAt?: string;
  synced?: boolean;
}

export interface LedgerRec {
  id: string | number;
  accountId: string | number;
  type: string;
  amount: number;
  date: string;
  synced?: boolean;
}

class TallyXpertDB extends Dexie {
  clients!: Table<ClientRec, string | number>;
  accounts!: Table<AccountRec, string | number>;
  ledger!: Table<LedgerRec, string | number>;

  constructor() {
    super("TallyXpertDB");
    this.version(1).stores({
      // indexes: primary key and indexed props
      clients: "id,name,updatedAt,synced",
      accounts: "id,clientId,amount,updatedAt,synced",
      ledger: "id,accountId,type,amount,date,synced",
    });
  }
}

const db = new TallyXpertDB();
export default db;
