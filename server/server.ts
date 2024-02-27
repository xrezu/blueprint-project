import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
//import session from 'express-session';
import path from 'path';

const app = express();
const PORT = 3000;

// Habilitar CORS y parseo de JSON para las peticiones entrantes
app.use(cors());
app.use(express.json());

// Ruta absoluta del archivo de usuarios
const usersFileJSON = 'server/src/assets/json/users.json';

// Ruta absoluta del archivo de reclamaciones, ajustar según la ubicación real
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

// Ruta para manejar el inicio de sesión
app.post('/api/login', (req: Request, res: Response) => {
    const { username, password } = req.body;
    // Leemos el archivo users.json
    fs.readFile(usersFileJSON, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo users.json:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        try {
            const users = JSON.parse(data);
            // Verificamos si el nombre de usuario y la contraseña se encuentran en el JSON de usuarios
            const user = users.find((user: any) => user.username === username && user.password === password);
            if (user) { // Usuario autenticado correctamente
            // Almacenar el rol del usuario en el almacenamiento de sesión
            //req.session.role = user.role;
                // Enviar una respuesta con el nombre de usuario y el rol
                res.json({ username: user.username, role: user.role });
            } else {
            // Credenciales incorrectas
            res.status(401).json({ error: 'Credenciales incorrectas' });
            }
        } catch (error) {
            console.error('Error al analizar el archivo JSON:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
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

