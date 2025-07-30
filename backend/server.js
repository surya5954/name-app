import express from 'express';
import cors from 'cors';
import NameAnalyzer from './nameAnalyzer.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Middleware to track request timing
app.use((req, res, next) => {
    req.startTime = Date.now();
    next();
});

// Initialize the name analyzer
const analyzer = new NameAnalyzer();

// Routes
app.get('/', (req, res) => {
    res.json({ 
        message: 'Name Sound Analyzer API',
        version: '1.0.0',
        endpoints: {
            'POST /api/analyze': 'Analyze a name',
            'POST /api/analyze/batch': 'Analyze multiple names'
        }
    });
});

// Single name analysis
app.post('/api/analyze', (req, res) => {
    try {
        const { name } = req.body;
        
        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            return res.status(400).json({
                error: 'Name is required and must be a non-empty string'
            });
        }

        const result = analyzer.analyze(name.trim());
        
        // Add additional metadata
        const response = {
            ...result,
            timestamp: new Date().toISOString(),
            processingTime: Date.now() - req.startTime
        };

        res.json(response);
    } catch (error) {
        console.error('Error analyzing name:', error);
        res.status(500).json({
            error: 'Internal server error while analyzing name'
        });
    }
});

// Batch analysis
app.post('/api/analyze/batch', (req, res) => {
    try {
        const { names } = req.body;
        
        if (!Array.isArray(names)) {
            return res.status(400).json({
                error: 'Names must be an array'
            });
        }

        if (names.length === 0) {
            return res.status(400).json({
                error: 'At least one name is required'
            });
        }

        if (names.length > 50) {
            return res.status(400).json({
                error: 'Maximum 50 names allowed per batch request'
            });
        }

        const results = names.map(name => {
            if (typeof name !== 'string' || name.trim().length === 0) {
                return {
                    error: 'Invalid name',
                    name: name
                };
            }
            
            try {
                return analyzer.analyze(name.trim());
            } catch (error) {
                return {
                    error: 'Analysis failed',
                    name: name
                };
            }
        });

        const response = {
            results,
            count: results.length,
            timestamp: new Date().toISOString(),
            processingTime: Date.now() - req.startTime
        };

        res.json(response);
    } catch (error) {
        console.error('Error in batch analysis:', error);
        res.status(500).json({
            error: 'Internal server error while analyzing names'
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found',
        availableRoutes: [
            'GET /',
            'POST /api/analyze',
            'POST /api/analyze/batch',
            'GET /health'
        ]
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Name Sound Analyzer API server running on port ${PORT}`);
    console.log(`📍 Health check: http://localhost:${PORT}/health`);
    console.log(`📊 API Documentation: http://localhost:${PORT}/`);
});
