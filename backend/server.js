const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser'); // Middleware to parse JSON bodies
const cors = require('cors'); // Middleware for CORS

const app = express();
const PORT = 4000;

// MySQL connection setup
const db = mysql.createConnection({
    host: 'sql12.freesqldatabase.com',
    user: 'sql12738931',
    password: 'PYI521jmcE',
    database: 'sql12738931',
    port: 3306
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
        return;
    }
    console.log('Connected to the MySQL database.');

    // Create the Registration table if it doesn't exist
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS Registration (
            ID INT AUTO_INCREMENT PRIMARY KEY,
            Name VARCHAR(100) NOT NULL,
            Email VARCHAR(100) NOT NULL UNIQUE,
            Password VARCHAR(255) NOT NULL,
            DateOfBirth DATE NOT NULL,
            PhoneNumber VARCHAR(15),
            Address TEXT
        )
    `;

    db.query(createTableQuery, (err, result) => {
        if (err) {
            console.error('Error creating table:', err.message);
        } else {
            console.log('Registration table created or already exists.');
        }
    });
});

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Enable CORS for requests from port 5173
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
}));

// Sample API endpoint to check server status
app.get('/', (req, res) => {
    res.send('Server is running and connected to the database!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


// Signup endpoint
app.post('/signup', async (req, res) => {
    try {
        const { name, email, password, dateOfBirth, phoneNumber, address } = req.body;

        const insertQuery = `
            INSERT INTO Registration (Name, Email, Password, DateOfBirth, PhoneNumber, Address)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        // Use a promise-based approach
        const [result] = await db.promise().query(insertQuery, [
            name,
            email,
            password, // Remember to hash the password in production!
            dateOfBirth,
            phoneNumber,
            address,
        ]);

        console.log('User registered:', result);
        res.status(200).send('User registered successfully');
    } catch (err) {
        console.error('Error registering user:', err);

        // Handle unique constraint error (e.g., email already exists)
        if (err.code === 'ER_DUP_ENTRY') {
            res.status(400).send('Email already exists');
        } else {
            res.status(500).send('Internal server error');
        }
    }
});

// Login endpoint
app.post('/userLogin', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Use parameterized queries to prevent SQL injection
        const selectQuery = `
            SELECT * FROM Registration WHERE Email = ? AND Password = ?
        `;

        const [rows] = await db.promise().query(selectQuery, [email, password]);

        if (rows.length > 0) {
            console.log('User logged in:', rows[0]);
            res.status(200).send('Login successful');
        } else {
            res.status(401).send('Invalid email or password');
        }
        console.log(rows)
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).send('Server error');
    }
});



app.get('/allUsers' , async (req,res) =>{
    try{

        const selectQuery=` SELECT * FROM Registration `
        const [rows] = await db.promise().query(selectQuery);
        res.send(rows)
        console.log(rows)
    }
    catch(err)
    {
        console.log(err)  
        res.send('internal server error')
      }
})

app.delete('/deleteUser/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteQuery = `DELETE FROM Registration WHERE id = ?`;
        const [result] = await db.promise().query(deleteQuery, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});


