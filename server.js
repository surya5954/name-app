import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { NameAnalyzer } from './analyzer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the root directory
app.use(express.static(__dirname));
app.use(express.json());
const analyzer = new NameAnalyzer();

// API endpoint for name analysis
app.post('/analyze', (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }
        const analysis = analyzer.performAnalysis(name);
        res.json(analysis);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
