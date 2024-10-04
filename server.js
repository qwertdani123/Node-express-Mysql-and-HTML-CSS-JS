import pool from './db.js';
import express from 'express';
import cors from 'cors';

const app = express();


app.use(cors());

// Middleware para manejar JSON
app.use(express.json());

// Escucha en el puerto 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

// Ruta para obtener todas las propiedades
app.get('http://localhost:3000/propiedades', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM properties');
        //res.json({ message: 'CORS habilitado!' });
         res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
   

});

// Ruta para obtener una propiedad específica por su ID
app.get('/propiedades/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM properties WHERE id = ?', [id]);
        if (result.length > 0) {
            res.json(result[0]);
        } else {
            res.status(404).json({ message: 'Propiedad no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/propiedades', async (req, res) => {
    const { title, description, price } = req.body;

    // Validación simple
    if (!title || !description || price == null || price < 0) {
        return res.status(400).json({ message: 'Datos inválidos' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO properties (title, description, price) VALUES (?, ?, ?)',
            [title, description, price]
        );
        res.status(201).json({ message: 'Propiedad creada correctamente', id: result.insertId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Ruta para actualizar una propiedad existente
app.put('/propiedades/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, price } = req.body;
    try {
        const result = await pool.query('UPDATE properties SET title = ?, description = ?, price = ? WHERE id = ?', [title, description, price, id]);
        
        if (result.affectedRows > 0) {
            res.json({ message: 'Propiedad actualizada correctamente' });
        } else {
            res.status(404).json({ message: 'Propiedad no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para eliminar una propiedad
app.delete('/propiedades/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM properties WHERE id = ?', [id]);
        if (result.affectedRows > 0) {
            res.json({ message: 'Propiedad eliminada correctamente' });
        } else {
            res.status(404).json({ message: 'Propiedad no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
