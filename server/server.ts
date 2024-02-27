import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3000;

// Habilitar CORS y parseo de JSON para las peticiones entrantes
app.use(cors());
app.use(express.json());

//Declaramos las rutas de los archivos JSON
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

