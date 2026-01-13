import { Router } from "express";
import { pool } from "../utils/db.mjs";

const router = Router();

// clasification
router.get('/api/clasification', async (request, response) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM CLASIFICATION;');
        return response.status(200).json(rows);
    }
    catch (e) {
        return response.status(500).json({ error: e.message });
    }
    finally {
        if (connection) connection.release();
    }
});

router.post('/api/clasification', async (request, response) => {
    let connection;
    const { nameClasification, min, max, nameHarvest } = request.body;

    try {
        // validación mínima
        if (!nameClasification || min == null || max == null || !nameHarvest) {
            return response.status(400).json({ error: 'nameClasification, min, max and nameHarvest are required' });
        }

        connection = await pool.getConnection();
        const [rows] = await connection.query(
            'SELECT id_harvest FROM HARVEST WHERE name_harvest = ?;',
            [nameHarvest]
        );

        if (!rows || rows.length === 0) {
            return response.status(400).json({ error: 'Harvest not found' });
        }

        const idHarvest = rows[0].id_harvest;

        await connection.query(
            'INSERT INTO CLASIFICATION(name_clasification, `min`, `max`, id_harvest) VALUES(?,?,?,?)',
            [nameClasification, min, max, idHarvest]
        );

        return response.status(201).json({ message: 'clasification created properly' });
    }
    catch (e) {
        return response.status(500).json({ error: e.message });
    }
    finally {
        if (connection) connection.release();
    }
});

router.delete('/api/clasification/:id', async (request, response) => {
    let connection;
    try {
        const { id } = request.params;

        if (!id) {
            return response.status(400).json({ error: 'id is needed' });
        }

        connection = await pool.getConnection();
        const [result] = await connection.query(
            'DELETE FROM CLASIFICATION WHERE id_clasification = ?;',
            [id]
        );

        if (result.affectedRows === 0) {
            return response.status(404).json({ error: 'clasification not found' });
        }

        return response.status(200).json({ message: 'clasification deleted properly' });
    }
    catch (e) {
        return response.status(500).json({ error: e.message });
    }
    finally {
        if (connection) connection.release();
    }
});

export default router;
