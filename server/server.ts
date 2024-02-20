import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;
const claimsFilePath = path.join(__dirname, 'src/assets/json/claims.json');

// Rutas de la API
app.get('/claims', (req: Request, res: Response) => {
    fs.readFile(claimsFilePath, { encoding: 'utf-8' }, (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading claims file' });
        }
        res.json(JSON.parse(data));
    });
});

app.post('/claims', (req: Request, res: Response) => {
    const newClaim = req.body;
    fs.readFile(claimsFilePath, { encoding: 'utf-8' }, (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading claims file' });
        }
        const claims = JSON.parse(data);
        claims.claims.push(newClaim);
        fs.writeFile(claimsFilePath, JSON.stringify(claims, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error writing to claims file' });
            }
            res.status(201).json({ message: 'Claim added successfully' });
        });
    });
});

// Servir archivos estáticos de Angular
const angularDistPath = path.join(__dirname, '../dist/mi-app-angular');
app.use(express.static(angularDistPath));

// Fallback para SPA
app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(angularDistPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
