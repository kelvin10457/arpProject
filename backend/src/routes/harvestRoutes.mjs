import { Router } from "express";
import { pool } from "../utils/db.mjs";

const router = Router();

//harvest
router.get('/api/harvest', async (request,response) => {
    let connection;
    try{
        connection = await pool.getConnection();
        const [rows] = await connection.query("SELECT * FROM HARVEST;");
        return response.status(200).json(rows);
    }
    catch(e){
        return response.status(500).json({error : e.message})
    }
    finally{
        if(connection) connection.release();
    }
});

router.post('/api/harvest', async (request,response) => {
    let connection;
    const { 
        nameHarvest, date, amountOfBags,pricePerBag,nameLand
    } = request.body;

    try{
        // validación mínima
        if(!nameHarvest || !date || !amountOfBags || !pricePerBag || !nameLand){
            return response.status(400).json({ error: 'nameHarvest, date, amountOfBags, pricePerBag and nameLand are required' });
        }

        connection = await pool.getConnection();
        const [rows] = await connection.query(
            'SELECT id_land FROM LAND WHERE name_land = ?;',
            [nameLand]
        );

        if (!rows || rows.length === 0) {
            return response.status(400).json({ error: 'Land not found' });
        }

        const idLand = rows[0].id_land;

        await connection.query(
            'INSERT INTO HARVEST(name_harvest, date, amountOfBags, pricePerBag, id_lote) VALUES(?,?,?,?,?)',
            [nameHarvest, date, amountOfBags, pricePerBag, idLand]
        );

        return response.status(201).json({message : 'harvest created properly'});
    }
    catch(e){
        return response.status(500).json({error : e.message})
    }
    finally{
        if(connection) connection.release();
    }
});

router.delete('/api/harvest/:id', async (request,response) => {
    let connection;
    try{
        const { id } = request.params;

        if(!id){
            return response.status(400).json({error : 'id is needed'});
        }

        connection = await pool.getConnection();
        const [result] = await connection.query(
            'DELETE FROM harvest WHERE id_harvest = ?;',
            [id]
        );


        if(result.affectedRows === 0){
            return response.status(404).json({error : 'harvest not found'});
        }

        return response.status(200).json({message : 'harvest deleted properly'});
    }
    catch(e){
        return response.status(500).json({error : e.message});
    }
    finally{
        if (connection) connection.release();
    }
});


export default router;