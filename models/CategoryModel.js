const db = require('../db');

class Category {
  constructor(data) {
    this.data = data;
  }

  async save() {
    const sql = `
      INSERT INTO categories
      (name)
      VALUES (?)
    `;
    const values = [
      this.data.name,
    ];
    const { insertId } = await db.query(sql, values);
    return insertId;
  }

  static async getAll() {
    const sql = `
      SELECT * FROM categories
    `;
    const [rows] = await db.query(sql);
    return rows;
    }

}

module.exports = Category;
