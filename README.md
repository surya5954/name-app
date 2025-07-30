# Name Harmony Analyzer

A sophisticated name analysis tool that evaluates names based on their phonetic, musical, and linguistic characteristics. This application provides detailed insights into various aspects of names, helping users understand their sonic and structural qualities.

## Features

- **Syllable Structure Analysis**: Evaluates the complexity and distribution of syllables
- **Phonetic Texture**: Analyzes consonant clusters and sound patterns
- **Rhythm Flow**: Measures the rhythmic qualities and transitions in the name
- **Musicality**: Assesses vowel harmony and consonant sonority
- **Spectral Features**: Analyzes letter frequencies and patterns
- **Distinctiveness**: Evaluates the uniqueness of the name's phonetic structure

## Technical Stack

- **Frontend**: HTML, CSS, JavaScript (ES Modules)
- **Backend**: Node.js with Express
- **NLP Libraries**:
  - `natural` - For phonetic analysis (Soundex, Metaphone)
  - `compromise` - For text processing and analysis
  - `syllable` - For syllable counting

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/surya5954/name-app.git
# Name App

## Structure

- `backend/` - All backend logic and API endpoints
- `frontend/` - All frontend code and UI logic

## Usage

1. Install dependencies in both `backend` and `frontend` folders:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
2. Start the backend server:
   ```bash
   cd backend && npm start
   ```
3. Start the frontend app:
   ```bash
   cd frontend && npm start
   ```

## Notes
- All main logic is now in the `backend` and `frontend` folders.
- Root-level files (`analyzer.js`, `app.js`, `index.html`, `server.js`, `style.css`, `ui.js`) have been removed.

## Analysis Components

### Syllable Structure Analysis
Evaluates the complexity and balance of syllables in the name. Considers:
- Syllable count and distribution
- Letter-to-syllable ratio
- Vowel patterns

### Phonetic Texture
Analyzes the sound qualities using:
- Consonant cluster analysis
- Soundex and Metaphone algorithms
- Vowel-consonant pattern evaluation

### Rhythm Flow
Measures the name's rhythmic qualities:
- Syllable transitions
- Stress patterns
- Letter flow characteristics

### Musicality
Assesses the musical qualities:
- Vowel harmony
- Consonant sonority
- Syllabic rhythm

### Spectral Features
Analyzes structural patterns:
- Letter frequency distribution
- Consonant-vowel ratios
- Pattern diversity

### Distinctiveness
Evaluates uniqueness through:
- Phonetic code analysis
- Letter rarity scoring
- Pattern uniqueness

## Architecture

The application follows a modular architecture:

- `analyzer.js` - Core analysis engine
- `server.js` - Express server setup
- `app.js` - Main application entry point
- `ui.js` - User interface logic

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Author

Surya Prakash - [GitHub Profile](https://github.com/surya5954)
