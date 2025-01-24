const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "https://movie-task-react.vercel.app",
  user: "root",
  password: "root123", // Your MySQL password
  database: "movieDB", // Your database name
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to the database!");
    }
});

// Endpoint to fetch all movies
app.get("/movies", (req, res) => {
    const query = "SELECT * FROM movieslist";
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

// Endpoint to fetch a single movie by ID
app.get("/movies/:id", (req, res) => {
    const id = req.params.id;
    const query = "SELECT * FROM movieslist WHERE id = ?";
    
    db.query(query, [id], (err, results) => {
        if (err || results.length === 0) {
            res.status(404).send("Movie not found.");
        } else {
            res.json(results[0]);
        }
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
