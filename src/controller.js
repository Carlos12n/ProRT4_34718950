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

    //borrar libro
    async detele(req, res) {
        const libro = req.body;
        const [result] = await pool.query(`DELETE FROM Libros WHERE id=(?)`,[libro.id]);
        res.json({"Registros eliminados": result.affectedRows});
        
    }

    //update libro
    async update(req, res) {
        try {
            const libro = req.body;
            const [result] = await pool.query(
               `UPDATE Libros SET nombre = ?, autor = ?, categoria = ?, aniopublicacion = ?, ISBN = ? WHERE id = ?`,
               [libro.nombre, libro.autor, libro.categoria, libro.aniopublicacion, libro.ISBN, libro.id]
        );
        
            res.json({"Registros actualizados": result.changedRows});
      }   catch (err) {
            res.status(500).json({ error: err.message });
      }
    }

    // Obtener un libro por su ID
  async getOne(req, res) {
    const { id } = req.params;
    try {
      const [result] = await pool.query("SELECT * FROM libros WHERE id = ?", [
        id,
      ]);

      if (result.length === 0) {
        // Si no se encuentra el libro, devolver un error 404
        res.status(404).json({ message: "Libro no encontrado" });
      } else {
        res.json(result[0]);
      }
    } catch (error) {
      // Manejar cualquier error que ocurra durante la consulta
      res.status(500).json({ message: "Error al obtener el libro", error });
    }
  }


}

export const libro = new LibrosController();