class Database {
  private static _instance: Database
  private _dbType: string

  private constructor() {
    this._dbType = 'MYSQL'
  }

  static getInstance(): Database {
    if (!Database._instance) {
      Database._instance = new Database()
    }
    return Database._instance
  }

  query(sql: string) {
    console.log(`Querying '${sql}' in ${this._dbType} database;`)
  }
}

export { Database }