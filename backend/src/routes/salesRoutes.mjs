import { Router } from "express";
import { pool } from "../utils/db.mjs";

const router = Router();

// Clients
router.get('/api/clients', async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM CLIENT;');
        return res.status(200).json(rows);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    } finally {
        if (connection) connection.release();
    }
});

router.post('/api/clients', async (req, res) => {
    let connection;
    const { name, idNumber, phoneNumber } = req.body;
    try {
        if (!name || !idNumber) {
            return res.status(400).json({ error: 'name and idNumber are required' });
        }

        connection = await pool.getConnection();

        // check if client exists by idNumber
        const [rows] = await connection.query('SELECT id_client FROM CLIENT WHERE idNumber = ?;', [idNumber]);
        if (rows && rows.length > 0) {
            return res.status(200).json({ message: 'client already exists', id_client: rows[0].id_client });
        }

        const [result] = await connection.query(
            'INSERT INTO CLIENT(name, idNumber, phoneNumber) VALUES(?,?,?)',
            [name, idNumber, phoneNumber || null]
        );

        return res.status(201).json({ message: 'client created properly', id_client: result.insertId });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    } finally {
        if (connection) connection.release();
    }
});

router.delete('/api/clients/:id', async (req, res) => {
    let connection;
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: 'id is needed' });

        connection = await pool.getConnection();
        const [result] = await connection.query('DELETE FROM CLIENT WHERE id_client = ?;', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'client not found' });
        return res.status(200).json({ message: 'client deleted properly' });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    } finally {
        if (connection) connection.release();
    }
});

// Sales
router.get('/api/sales', async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM SALE;');
        return res.status(200).json(rows);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    } finally {
        if (connection) connection.release();
    }
});


// POST /api/sales expects a single form with client + sale data. Example body:
// { name, idNumber, phoneNumber, date, amountOfBags, pricePerBag, nameHarvest }
router.post('/api/sales', async (req, res) => {
    let connection;
    const { name, idNumber, phoneNumber, date, amountOfBags, pricePerBag, nameHarvest } = req.body;
    try {
        // basic validation
        if (!idNumber || !date || amountOfBags == null || pricePerBag == null || !nameHarvest) {
            return res.status(400).json({ error: 'idNumber, date, amountOfBags, pricePerBag and nameHarvest are required' });
        }

        const amount = Number(amountOfBags);
        const price = Number(pricePerBag);
        if (!Number.isInteger(amount) || amount <= 0) return res.status(400).json({ error: 'amountOfBags must be a positive integer' });
        if (Number.isNaN(price) || price < 0) return res.status(400).json({ error: 'pricePerBag must be a non-negative number' });

        connection = await pool.getConnection();
        await connection.beginTransaction();

        // find or create client (within transaction)
        const [clientRows] = await connection.query('SELECT id_client FROM CLIENT WHERE idNumber = ?;', [idNumber]);
        let idClient;
        if (clientRows && clientRows.length > 0) {
            idClient = clientRows[0].id_client;
        } else {
            const [insertClient] = await connection.query(
                'INSERT INTO CLIENT(name, idNumber, phoneNumber) VALUES(?,?,?)',
                [name || null, idNumber, phoneNumber || null]
            );
            idClient = insertClient.insertId;
        }

        // find harvest by name_harvest and lock row for update to avoid race conditions
        const [harvestRows] = await connection.query(
            'SELECT id_harvest, amountOfBags FROM HARVEST WHERE name_harvest = ? FOR UPDATE;',
            [nameHarvest]
        );
        if (!harvestRows || harvestRows.length === 0) {
            await connection.rollback();
            return res.status(400).json({ error: 'Harvest not found' });
        }
        const idHarvest = harvestRows[0].id_harvest;
        const amountOfBagsOnHarvest = Number(harvestRows[0].amountOfBags || 0);
        if (amountOfBagsOnHarvest < amount) {
            await connection.rollback();
            return res.status(400).json({ error: 'No hay suficientes sacos' });
        }

        // insert sale
        await connection.query(
            'INSERT INTO SALE(`date`, amountOfBags, pricePerBag, id_client, id_harvest) VALUES(?,?,?,?,?)',
            [date, amount, price, idClient, idHarvest]
        );

        // decrement harvest inventory
        await connection.query(
            'UPDATE HARVEST SET amountOfBags = amountOfBags - ? WHERE id_harvest = ?',
            [amount, idHarvest]
        );

        await connection.commit();
        return res.status(201).json({ message: 'sale created properly' });
    } catch (e) {
        if (connection) {
            try { await connection.rollback(); } catch (err) { /* ignore rollback error */ }
        }
        return res.status(500).json({ error: e.message });
    } finally {
        if (connection) connection.release();
    }
});

router.delete('/api/sales/:id', async (req, res) => {
    let connection;
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: 'id is needed' });

        connection = await pool.getConnection();
        const [result] = await connection.query('DELETE FROM SALE WHERE id_sale = ?;', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'sale not found' });
        return res.status(200).json({ message: 'sale deleted properly' });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    } finally {
        if (connection) connection.release();
    }
});

// Joined view: sales with client info
router.get('/api/salesAndClients', async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(
            `SELECT s.id_sale, s.date AS sale_date, s.amountOfBags, s.pricePerBag,
                    c.id_client, c.name AS client_name, c.idNumber AS client_idNumber, c.phoneNumber
             FROM SALE s
             JOIN CLIENT c ON s.id_client = c.id_client
             ORDER BY s.date DESC;`
        );

        return res.status(200).json(rows);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    } finally {
        if (connection) connection.release();
    }
});


export default router;
