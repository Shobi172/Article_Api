const mysql = require('mysql');
const config = require('./config');

const connection = mysql.createConnection(config.db);

connection.connect((err) => {
  if (err) {
    console.error('Error in connecting to database:', err);
  } else {
    console.log('Connected to database');
    createTable();
  }
});

function createTable() {
    const sql1 = `
      CREATE TABLE IF NOT EXISTS articles (
        id INT PRIMARY KEY AUTO_INCREMENT,
        heading VARCHAR(255) NOT NULL,
        read_time INT NOT NULL,
        description TEXT NOT NULL,
        thumbnail_image VARCHAR(255) NOT NULL,
        featured_image VARCHAR(255) NOT NULL,
        verified BOOLEAN DEFAULT false,
        newest BOOLEAN DEFAULT false,
        trending BOOLEAN DEFAULT false
      )
    `;
  
    const sql2 = `
      CREATE TABLE IF NOT EXISTS categories (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL
      )
    `;
  
    connection.query(sql1, (err, result) => {
      if (err) {
        console.error('Error creating articles table:', err);
      } else {
        console.log('Articles table created successfully');
        connection.query(sql2, (err, result) => {
          if (err) {
            console.error('Error creating categories table:', err);
          } else {
            console.log('Categories table created successfully');
            insertData();
          }
        });
      }
    });
  }
  


function insertData() {
    const sql = `
    INSERT INTO articles
    (heading, read_time, description, thumbnail_image, featured_image, verified, newest, trending)
    VALUES('Article 1', 5, 'Description of Article 1', 'thumbnail1.jpg', 'featured1.jpg', true, false, true),
        ('Article 2', 10, 'Description of Article 2', 'thumbnail2.jpg', 'featured2.jpg', false, true, false),
        ('Article 3', 7, 'Description of Article 3', 'thumbnail3.jpg', 'featured3.jpg', true, false, false),
        ('Article 4', 3, 'Description of Article 4', 'thumbnail4.jpg', 'featured4.jpg', false, false, true),
        ('Article 5', 8, 'Description of Article 5', 'thumbnail5.jpg', 'featured5.jpg', true, false, true),
        ('Article 6', 12, 'Description of Article 6', 'thumbnail6.jpg', 'featured6.jpg', true, true, false)`;

    connection.query(sql, (err, result) => {
    if (err) {
    console.error('Error inserting data:', err);
    } else {
    console.log('Data inserted successfully');
    insertCategories();
    }
    });
}

function insertCategories() {
    const sql = `
    INSERT INTO categories
    (name)
    VALUES('Technology'),
        ('Entertainment'),
        ('Sports'),
        ('Politics')`;

    connection.query(sql, (err, result) => {
    if (err) {
    console.error('Error inserting data:', err);
    } else {
    console.log('Categories inserted successfully');
    selectData();
    }
    });
}

function selectData() {
    const sql = 'SELECT * FROM articles';
    
    connection.query(sql, (err, results) => {
    if (err) {
    console.error('Error selecting data:', err);
    } else {
    console.log('Data selected successfully');
    console.log(results);
    }
    connection.end();
    });
}
