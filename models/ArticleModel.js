const db = require('../db');


class Article {
  constructor(data) {
    this.data = data;
  }

  async save() {
    const sql = `
      INSERT INTO articles
      (heading, read_time, description, thumbnail_image, featured_image, verified, newest, trending)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      this.data.heading,
      this.data.readTime,
      this.data.description,
      this.data.thumbnailImage,
      this.data.featuredImage,
      this.data.verified,
      this.data.newest,
      this.data.trending,
    ];
    const { insertId } = await db.query(sql, values);
    const categoriesSql = `
      INSERT INTO article_categories
      (article_id, category)
      VALUES (?, ?)
    `;
    const categoryValues = this.data.categories.map(category => [insertId, category]);
    await db.query(categoriesSql, categoryValues);
    }
    

    static async getAll() {
        const sql = `
          SELECT * FROM articles
        `;
        const [rows] = await connection.query(sql);
        return rows;
    }
    

    static async getByCategory(categoryId) {
        const sql = `
          SELECT * FROM articles
          WHERE categories LIKE '%${categoryId}%'
        `;
        const [rows] = await db.query(sql);
        return rows;
      }

    
    async update(id, newData) {
        const sql = `
          UPDATE articles SET
          heading = ?,
          read_time = ?,
          description = ?,
          thumbnail_image = ?,
          featured_image = ?,
          verified = ?,
          newest = ?,
          trending = ?
          WHERE id = ?
        `;
        const values = [
            newData.heading,
            newData.readTime,
            newData.description,
            newData.thumbnailImage,
            newData.featuredImage,
            newData.verified,
            newData.newest,
            newData.trending,
            id
        ];
        await db.query(sql, values);
    }

    static async remove(id) {
        const sql = `
          DELETE FROM articles
          WHERE id = ?
        `;
        await db.query(sql, [id]);
    }
}

module.exports = Article;
