const express = require('express');
const router = express.Router();
const db = require('./db/connection');

// GET all departments
router.get('/departments', (req, res) => {
    db.query('SELECT * FROM departments', (err, results) => {
        if (err) {
            console.error('Error fetching departments: ' + err.message);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});

// POST a new department
router.post('/departments', (req, res) => {
    const { name } = req.body;
    db.query('INSERT INTO departments (name) VALUES (?)', [name], (err, result) => {
        if (err) {
            console.error('Error adding department: ' + err.message);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json({ message: 'Department added successfully', id: result.insertId });
    });
});

// Add more routes for roles, employees, etc.

module.exports = router;
