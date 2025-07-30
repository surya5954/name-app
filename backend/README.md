# Name Sound Analyzer Backend API

A Node.js Express API that provides comprehensive phonetic and linguistic analysis of names using advanced computational linguistics libraries.

## Features

- **Syllable Structure Analysis**: Evaluates syllable count, patterns, and rhythmic complexity
- **Phonetic Texture Analysis**: Examines consonant clusters, vowel patterns, and articulation features
- **Rhythm & Flow Analysis**: Assesses syllable transitions and stress patterns
- **Musicality Analysis**: Measures melodic and harmonic qualities
- **Spectral Features Analysis**: Analyzes brightness, softness, and tonal characteristics
- **Distinctiveness Analysis**: Evaluates uniqueness and memorability

## Libraries Used

- **natural**: Advanced natural language processing and phonetic algorithms
- **compromise**: Lightweight NLP for text analysis and linguistic processing
- **syllable**: Accurate syllable counting algorithm
- **express**: Web framework for Node.js
- **cors**: Cross-Origin Resource Sharing support

## Installation

```bash
# Install dependencies
npm install

# Start development server with auto-reload
npm run dev

# Start production server
npm start
```

## API Endpoints

### GET /
Returns API information and available endpoints.

### POST /api/analyze
Analyzes a single name.

**Request Body:**
```json
{
  "name": "Alexander"
}
```

**Response:**
```json
{
  "name": "Alexander",
  "syllable_structure": 75,
  "phonetic_texture": 68,
  "rhythm_flow": 82,
  "musicality": 71,
  "spectral_features": 79,
  "distinctiveness": 73,
  "timestamp": "2025-07-30T06:22:25.123Z",
  "processingTime": 45
}
```

### POST /api/analyze/batch
Analyzes multiple names in a single request (max 50 names).

**Request Body:**
```json
{
  "names": ["Alexander", "Sophia", "Gabriel"]
}
```

**Response:**
```json
{
  "results": [
    {
      "name": "Alexander",
      "syllable_structure": 75,
      "phonetic_texture": 68,
      "rhythm_flow": 82,
      "musicality": 71,
      "spectral_features": 79,
      "distinctiveness": 73
    },
    // ... more results
  ],
  "count": 3,
  "timestamp": "2025-07-30T06:22:25.123Z",
  "processingTime": 125
}
```

### GET /health
Health check endpoint.

## Analysis Metrics

Each name is scored from 0-100 on six different dimensions:

1. **Syllable Structure** (0-100): Complexity and rhythm of syllable patterns
2. **Phonetic Texture** (0-100): Consonant clusters and vowel distribution
3. **Rhythm & Flow** (0-100): Syllable transitions and stress patterns
4. **Musicality** (0-100): Melodiousness and harmonic qualities
5. **Spectral Features** (0-100): Brightness and tonal characteristics
6. **Distinctiveness** (0-100): Uniqueness and memorability

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `400 Bad Request`: Invalid input data
- `404 Not Found`: Route not found
- `500 Internal Server Error`: Server processing errors

## CORS Support

The API includes CORS support to allow requests from different domains, making it suitable for frontend applications.

## Environment Variables

- `PORT`: Server port (default: 5000)

## Development

```bash
# Start development server with auto-reload
npm run dev
```

## Production Deployment

```bash
# Start production server
npm start
```

The server will start on the specified port (default: 5000) and provide detailed console output about available endpoints.
