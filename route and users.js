const express = require('express');
const router = express.Router();
const { sql, pool, poolConnect } = require('../db');

router.get('/', async (req, res) => {
    try {
        await poolConnect;
        const result = await pool.request().query('SELECT * FROM [User]');
        res.status(200).json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        await poolConnect;
        const result = await pool.request()
            .input('id', sql.Int, req.params.id)
            .query('SELECT * FROM [User] WHERE user_id = @id');

        if (result.recordset.length === 0)
            return res.status(404).json({ message: 'User not found' });

        res.status(200).json(result.recordset[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role)
        return res.status(400).json({ message: 'All fields are required' });

    try {
        await poolConnect;
        await pool.request()
            .input('name', sql.VarChar, name)
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, password)
            .input('role', sql.VarChar, role)
            .query(`
                INSERT INTO [User] (name, email, password, role)
                VALUES (@name, @email, @password, @role)
            `);

        res.status(201).json({ message: 'User created' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await poolConnect;
        const result = await pool.request()
            .input('id', sql.Int, req.params.id)
            .query('DELETE FROM [User] WHERE user_id = @id');

        if (result.rowsAffected[0] === 0)
            return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
