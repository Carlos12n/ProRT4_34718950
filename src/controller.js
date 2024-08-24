import { pool } from "./database.js";

class LibrosController{
    async getAll(req, res) {
        const resultado = await pool.query('SELECT * FROM libro');
        res.json(result);
    }
}

export const libro = new LibrosController();