import { Router } from "express";
import { pool } from "../utils/db.mjs";
const router = Router();

//lands

router.get('/api/lands', async (request,response) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query("SELECT * FROM LAND;");
        return response.status(200).json(rows);
    }
    catch(e){
        return response.status(500).json({ error : e.message});
    }
    finally{
        if (connection) connection.release();
    }
});

router.post('/api/lands', async (request,response) => {
    let connection;
    try{
        console.log(request.body);
        const { nameLand, description } = request.body;

        if(!nameLand || !description){
            return response.status(400).json({error : 'nameLand and description are needed'});
        }

        connection = await pool.getConnection();
        await connection.query(
            'INSERT INTO LAND(name_land,description) VALUES(?,?);',
            [nameLand,description]
        );
        return response.status(201).json({message : 'land created properly'});
    }
    catch(e){
        return response.status(500).json({error : e.message});
    }
    finally{
        if(connection) connection.release();
    }
    
});

router.delete('/api/lands/:id', async (request,response) => {
    let connection;
    try{
        const { id } = request.params;

        if(!id){
            return response.status(400).json({error : 'id is needed'});
        }

        connection = await pool.getConnection();
        const [result] = await connection.query(
            'DELETE FROM LAND WHERE id_land = ?;',
            [id]
        );


        if(result.affectedRows === 0){
            return response.status(404).json({error : 'Land not found'});
        }

        return response.status(200).json({message : 'Land deleted properly'});
    }
    catch(e){
        return response.status(500).json({error : e.message});
    }
    finally{
        if (connection) connection.release();
    }
});

/* IF THERE IS TIME I WOULD DO POSSIBLE TO UPDATE ALL THE RECORD
router.put('/api/lands/:id', async (request,response) => {
    try{
        const { id } = request.params;
        const { nameLand, description } = request.body;

        if(!id){
            return response.status(400).json({error : 'id is needed'});
        }

        if(!nameLand || !description){
            return response.status(400).json({error : 'nameLand and description are needed'});
        }

        const connection = await pool.getConnection();
        const [result] = await connection.query(
            'UPDATE LAND SET name_land = ?, description = ? WHERE id_land = ?;',
            [nameLand, description, id]
        );

        connection.release();

        if(result.affectedRows === 0){
            return response.status(404).json({error : 'Land not found'});
        }

        return response.status(200).json({message : 'Land updated properly'});
    }
    catch(e){
        return response.status(500).json({error : e.message});
    }
});

*/

export default router;