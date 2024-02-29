import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
//import fileUpload from 'express-fileupload';
import { User } from '../src/app/models/user.model';
//import session from 'express-session';
import path from 'path';
import { UploadedFile } from 'express-fileupload';

const app = express();
const PORT = 3000;

// Habilitar CORS y parseo de JSON para las peticiones entrantes
app.use(cors());
app.use(express.json());
//app.use(fileUpload());

// Ruta absoluta del archivo de usuarios
const usersFileJSON = path.resolve(__dirname, 'src/assets/json/users.json');
// Ruta absoluta del archivo de reclamaciones, ajustar según la ubicación real
const claimsFilePath = path.resolve(__dirname, 'src/assets/json/claims.json');
const faqFilePath = path.resolve(__dirname, 'src/assets/json/faq.json');
const contributionsFilePath = path.resolve(__dirname, 'src/assets/json/contributions.json');

// Ruta para manejar el inicio de sesión
app.post('/api/login', (req: Request, res: Response) => {
    const { username, password } = req.body;

    fs.readFile(usersFileJSON, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo users.json:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        try {
            const parsedData = JSON.parse(data);
            // Accede a la propiedad 'users' dentro del objeto JSON
            const users = parsedData.users;
            const user = users.find((user: User) => user.username === username && user.password === password);
            if (user) {
                // Usuario encontrado
                res.json({ id: user.id, username: user.username, role: user.role });
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

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error leyendo el archivo de usuarios:', err);
            return res.status(500).send('Error al leer el archivo de datos');
        }

        // Intenta parsear el JSON y enviarlo como respuesta
        try {
            const contributions = JSON.parse(data);
            res.json(contributions);
        } catch (parseError) {
            console.error('Error al parsear los datos de usuarios:', parseError);
            res.status(500).send('Error al procesar los datos de usuarios');
        }
    });
});

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
        if (err) {
            console.error('Error leyendo el archivo de usuarios:', err);
            return res.status(500).send('Error al leer el archivo de datos');
        }

        // Intenta parsear el JSON y enviarlo como respuesta
        try {
            const FEntity = JSON.parse(data);
            res.json(FEntity);
        } catch (parseError) {
            console.error('Error al parsear los datos de usuarios:', parseError);
            res.status(500).send('Error al procesar los datos de usuarios');
        }
    });
});

// Endpoint para consultar preguntas al chatbot
app.post('/faq', (req: Request, res: Response) => {
    const preguntaUsuario = req.body.pregunta;

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


async function readAndParseJSON(filePath: string): Promise<any> {
    const data = await fs.promises.readFile(filePath, 'utf8');
    return JSON.parse(data);
}

  function isValidContribution(contribution: any, users: any[], promoters: any[], financialEntities: any[]) {
    // Verifica la existencia de userId
    const userExists = users.some(user => user.id === contribution.userId);
  
    // Verifica la existencia de cada promoterId y financialEntityId en las contribuciones
    const validContributions = contribution.contributions.every((c: any) => {
      const promoterExists = promoters.some(p => p.id === c.promoterId);
      const financialEntityExists = financialEntities.some(fe => fe.financialEntityId === c.financialEntityId);
      return promoterExists && financialEntityExists;
    });
  
    return userExists && validContributions;
  }

  // Endpoint modificado para cargar contribuciones
  /*app.post('/upload-contributions', async (req: Request, res: Response) => {
    if (!req.files || !req.files.file) {
        return res.status(400).send('No file was uploaded.');
    }

    const uploadedFile = req.files.file as UploadedFile;
    const newContributions = JSON.parse(uploadedFile.data.toString());

    try {
        // Cargar y esperar los datos existentes de manera asíncrona
        const [users, promoters, financialEntities, existingContributions] = await Promise.all([
            readAndParseJSON(usersFileJSON),
            readAndParseJSON(path.resolve(__dirname, 'src/assets/json/promoters.json')),
            readAndParseJSON(path.resolve(__dirname, 'src/assets/json/financialEntities.json')),
            readAndParseJSON(contributionsFilePath)
        ]);

        // Implementa aquí la lógica para validar y combinar las contribuciones
        // Asegúrate de manejar la validación y combinación de manera correcta

        // Para escribir el archivo actualizado, asegúrate de esperar la operación de escritura
        await fs.promises.writeFile(contributionsFilePath, JSON.stringify(existingContributions, null, 2), 'utf8');
        res.send('Contributions updated successfully.');
    } catch (error) {
        console.error('Error processing contributions:', error);
        res.status(500).send('Error processing contributions.');
    }
});*/

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
