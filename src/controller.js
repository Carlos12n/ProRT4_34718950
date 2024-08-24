import { pool } from "./database.js";

class LibrosController{
    //consulta de libros
    async getAll(req, res) {
        const [result] = await pool.query('SELECT * FROM libros');
        res.json(result);
    }

    //creacion de libro
    async add(req, res) {
        const libro = req.body;
        const [result] = await pool.query(`INSERT INTO Libros(nombre, autor, categoria, aniopublicacion, ISBN) VALUES (?,?,?,?,?)`,[libro.nombre, libro.autor, libro.categoria, libro.aniopublicacion, libro.ISBN]);
        res.json({"Id insertado": result.insertId});
        
    }
}

export const libro = new LibrosController();