import { DataAccess } from './DataAccess.ts';

export class Repository<T extends { id?: number }> {
  private dataAccess: DataAccess;
  private tableName: string;

  constructor(dataAccess: DataAccess, tableName: string) {
    this.dataAccess = dataAccess;
    this.tableName = tableName;
  }

  async getById(id: number) {
    const query = `SELECT * FROM ${this.tableName} WHERE id = $1`;
    const values = [id];
    const res = await this.dataAccess.query<T>(query, values);
    return res.rows[0];
  }

  async getAll() {
    const query = `SELECT * FROM ${this.tableName}`;
    const res = await this.dataAccess.query<T>(query);
    return res.rows;
  }

  async insert(item: Omit<T, 'id'>) {
    const columns = Object.keys(item).join(', ');
    const values = Object.values(item);
    const query = `INSERT INTO ${this.tableName} (${columns}) VALUES ($1, $2) RETURNING *`;
    const res = await this.dataAccess.query<T>(query, values);
    return res.rows[0];
  }
}
