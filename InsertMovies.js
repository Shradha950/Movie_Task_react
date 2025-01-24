const fs = require('fs');
const mysql = require('mysql2');

// Read the db.json file
const jsonData = JSON.parse(fs.readFileSync('db.json', 'utf-8')).movieData;

// Create MySQL connection
const db = mysql.createConnection({
  host: "https://movie-task-react.vercel.app",
  user: "root",
  password: "root123", // Your MySQL password
  database: "movieDB", // Your database name
});
// Insert movie data into the movies table
jsonData.forEach(movie => {
  const title = movie.title;
  const genre = movie.genre.join(', '); // Combine genres into a single string
  const release_year = movie.year;
  const rating = parseFloat(movie.rating); // Convert rating to a number
  const description = movie.description;
  const poster = movie.image;
  const query = `INSERT INTO movieslist (title, genre, release_year, rating, description, poster) VALUES (?, ?, ?, ?, ?, ?)`;
  connection.execute(query, [title, genre, release_year, rating, description, poster], (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
    } else {
      console.log('Data inserted successfully:', results.insertId);
    }
  });
});

// Close the connection
connection.end();
