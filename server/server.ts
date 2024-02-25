import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3000;

// Habilitar CORS y parseo de JSON para las peticiones entrantes
app.use(cors());
app.use(express.json());

// Camino absoluto al archivo de reclamaciones, ajustar según la ubicación real
const claimsFilePath = path.resolve(__dirname, '../../assets/json/claims.json');

// Endpoint para obtener las reclamaciones
app.get('/claims', (req: Request, res: Response) => {
    fs.readFile(claimsFilePath, { encoding: 'utf-8' }, (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading claims file' });
        }
        res.json(JSON.parse(data));
    });
});

// Endpoint para publicar una nueva reclamación
app.post('/claims', (req: Request, res: Response) => {
    const newClaim = req.body;
    fs.readFile(claimsFilePath, { encoding: 'utf-8' }, (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading claims file' });
        }
        const claims = JSON.parse(data);
        claims.push(newClaim); // Asegúrate de que el objeto claims tiene una propiedad de tipo array
        fs.writeFile(claimsFilePath, JSON.stringify(claims, null, 2), err => {
            if (err) {
                return res.status(500).json({ message: 'Error writing to claims file' });
            }
            res.status(201).json({ message: 'Claim added successfully' });
        });
    });
});

//Endpoint para solicitar la informacion de los ciudadanos
app.get('/citizen', (req, res) => {
    const filePath = path.join(__dirname, 'src', 'assets', 'json', 'contributions.json'); // Asegúrate de que la ruta al archivo sea correcta

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error leyendo el archivo de usuarios:', err);
            return res.status(500).send('Error al leer el archivo de datos');
        }

        // Intenta parsear el JSON y enviarlo como respuesta
        try {
            const users = JSON.parse(data);
            res.json(users);
        } catch (parseError) {
            console.error('Error al parsear los datos de usuarios:', parseError);
            res.status(500).send('Error al procesar los datos de usuarios');
        }
    });
});

// Directorio donde se encuentran los archivos estáticos de Angular
const angularDistPath = path.resolve(__dirname, '../dist/blueprint-project/browser');

// Servir archivos estáticos de Angular
app.use(express.static(angularDistPath));

// Fallback para todas las rutas no API, reenviar a la aplicación Angular
app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(angularDistPath, 'index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
