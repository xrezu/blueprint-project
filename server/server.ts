import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import { User } from '../src/app/models/user.model';
//import session from 'express-session';
import path from 'path';

const app = express();
const PORT = 3000;

// Habilitar CORS y parseo de JSON para las peticiones entrantes
app.use(cors());
app.use(express.json());

// Ruta absoluta del archivo de usuarios
const usersFileJSON = path.resolve(__dirname, 'src/assets/json/users.json');
// Ruta absoluta del archivo de reclamaciones, ajustar según la ubicación real
const claimsFilePath = path.resolve(__dirname, 'src/assets/json/claims.json');
const faqFilePath = path.resolve(__dirname, 'src/assets/json/faq.json');

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
    fs.readFile(claimsFilePath, { encoding: 'utf-8' }, (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading claims file' });
        }
        const fileContent = JSON.parse(data);
        if (!fileContent.claims) {
            fileContent.claims = [];
        }

        // Añadir la fecha actual a la nueva reclamación
        const newClaimWithDate = {
            ...req.body,
            date: new Date().toISOString().split('T')[0] // Esto añade la fecha actual en formato 'YYYY-MM-DD'
        };

        fileContent.claims.push(newClaimWithDate);

        fs.writeFile(claimsFilePath, JSON.stringify(fileContent, null, 2), err => {
            if (err) {
                return res.status(500).json({ message: 'Error writing to claims file' });
            }
            res.status(201).json({ message: 'Claim added successfully', newClaim: newClaimWithDate });
        });
    });
});


// Endpoint para obtener la información de los usuarios
app.get('/users', (req, res) => {
    const filePath = path.join(__dirname, 'src', 'assets', 'json', 'users.json'); // Asegúrate de que la ruta al archivo sea correct

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error leyendo el archivo de usuarios:', err);
            return res.status(500).send('Error al leer el archivo de datos');
        }

        // Intenta parsear el JSON y enviarlo como respuesta
        try {
            const users = JSON.parse(data);
            res.json(users.users);
        } catch (parseError) {
            console.error('Error al parsear los datos de usuarios:', parseError);
            res.status(500).send('Error al procesar los datos de usuarios');
        }
    });
});


//Endpoint para solicitar la informacion de las contribuciones
app.get('/contributions', (req, res) => {
    const filePath = path.join(__dirname, 'src', 'assets', 'json', 'contributions.json'); // Asegúrate de que la ruta al archivo sea correcta


// Ruta para manejar el inicio de sesión
app.post('/api/login', (req: Request, res: Response) => {
    const { username, password } = req.body;


    fs.readFile(usersFileJSON, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo users.json:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        try {

            const contributions = JSON.parse(data);
            res.json(contributions);
        } catch (parseError) {
            console.error('Error al parsear los datos de usuarios:', parseError);
            res.status(500).send('Error al procesar los datos de usuarios');

            const parsedData = JSON.parse(data);
            // Accede a la propiedad 'users' dentro del objeto JSON
            const users = parsedData.users;
            const user = users.find((user: User) => user.username === username && user.password === password);
            if (user) {
                // Usuario encontrado
                res.json({ username: user.username, role: user.role });
            } else {
                // Usuario no encontrado
                res.status(401).json({ error: 'Credenciales incorrectas' });
            }
        } catch (error) {
            console.error('Error al analizar el archivo JSON:', error);
            res.status(500).json({ error: 'Error interno del servidor' });

        }
    });
});

// Endpoint para consultar preguntas al chatbot
app.post('/faq', (req: Request, res: Response) => {
    const preguntaUsuario = req.body.pregunta;


app.get('/promoter', (req, res) => {
    const filePath = path.join(__dirname, 'src', 'assets', 'json', 'promoters.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error leyendo el archivo:', err);
            return res.status(500).send('Error al leer el archivo de datos');
        }

        try {
            const result = JSON.parse(data);
            res.json(result.promoters); // Solo devuelve el array
        } catch (parseError) {
            console.error('Error al parsear los datos:', parseError);
            res.status(500).send('Error al procesar los datos');
        }
    });
});


app.get('/FEntity', (req, res) => {
    const filePath = path.join(__dirname, 'src', 'assets', 'json', 'financialEntities.json'); // Asegúrate de que la ruta al archivo sea correcta

    fs.readFile(filePath, 'utf8', (err, data) => {

    fs.readFile(faqFilePath, { encoding: 'utf-8' }, (err, data) => {

        if (err) {
            return res.status(500).json({ message: 'Error reading FAQ file' });
        }
        
        const faqs = JSON.parse(data);
        const respuesta = faqs.find((faq: any) => faq.pregunta.toLowerCase() === preguntaUsuario.toLowerCase());

        if (respuesta) {
            res.json({ pregunta: preguntaUsuario, respuesta: respuesta.respuesta });
        } else {
            res.json({ pregunta: preguntaUsuario, respuesta: "Lo siento, no tengo una respuesta para eso." });
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

