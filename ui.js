import { NameAnalyzer } from './analyzer.js';

class NameAnalyzerUI {
    constructor() {
        this.analyzer = new NameAnalyzer();
        this.analysisData = [];
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadSampleData();
        this.updateDisplay();
    }

    bindEvents() {
        const analyzeBtn = document.getElementById('analyzeBtn');
        const clearBtn = document.getElementById('clearBtn');
        const nameInput = document.getElementById('nameInput');
        const sortSelect = document.getElementById('sortSelect');
        const searchInput = document.getElementById('searchInput');

        analyzeBtn.addEventListener('click', () => this.analyzeName());
        clearBtn.addEventListener('click', () => this.clearAllData());
        nameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.analyzeName();
        });
        sortSelect.addEventListener('change', () => this.sortTable());
        searchInput.addEventListener('input', () => this.filterTable());
    }

    loadSampleData() {
        const sampleNames = ['Luna', 'Alexander', 'Sophia', 'Gabriel', 'Isabella'];
        this.analysisData = sampleNames.map(name => this.analyzer.analyze(name));
    }

    analyzeName() {
        const nameInput = document.getElementById('nameInput');
        const name = nameInput.value.trim();
        
        if (!name) {
            alert('Please enter a name to analyze');
            return;
        }

        // Check if name already exists
        if (this.analysisData.find(item => item.name.toLowerCase() === name.toLowerCase())) {
            alert('This name has already been analyzed');
            return;
        }

        const analyzeBtn = document.getElementById('analyzeBtn');
        analyzeBtn.classList.add('loading');
        analyzeBtn.textContent = 'Analyzing...';

        // Simulate processing time
        setTimeout(() => {
            const analysis = this.analyzer.analyze(name);
            this.analysisData.unshift(analysis);
            this.updateDisplay();
            this.showCurrentAnalysis(analysis);
            
            nameInput.value = '';
            analyzeBtn.classList.remove('loading');
            analyzeBtn.textContent = 'Analyze';
        }, 800);
    }

    showCurrentAnalysis(analysis) {
        const currentAnalysis = document.getElementById('currentAnalysis');
        currentAnalysis.innerHTML = `
            <h3>Analysis for "${analysis.name}"</h3>
            <div class="analysis-details">
                <div class="score-item ${this.getScoreClass(analysis.syllable_structure)}">
                    <span class="score-label">Syllable Structure:</span>
                    <span class="score-value">${analysis.syllable_structure}</span>
                </div>
                <div class="score-item ${this.getScoreClass(analysis.phonetic_texture)}">
                    <span class="score-label">Phonetic Texture:</span>
                    <span class="score-value">${analysis.phonetic_texture}</span>
                </div>
                <div class="score-item ${this.getScoreClass(analysis.rhythm_flow)}">
                    <span class="score-label">Rhythm Flow:</span>
                    <span class="score-value">${analysis.rhythm_flow}</span>
                </div>
                <div class="score-item ${this.getScoreClass(analysis.musicality)}">
                    <span class="score-label">Musicality:</span>
                    <span class="score-value">${analysis.musicality}</span>
                </div>
                <div class="score-item ${this.getScoreClass(analysis.spectral_features)}">
                    <span class="score-label">Spectral Features:</span>
                    <span class="score-value">${analysis.spectral_features}</span>
                </div>
                <div class="score-item ${this.getScoreClass(analysis.distinctiveness)}">
                    <span class="score-label">Distinctiveness:</span>
                    <span class="score-value">${analysis.distinctiveness}</span>
                </div>
                <div class="score-item ${this.getScoreClass(this.calculateAverage(analysis))}">
                    <span class="score-label">Overall Score:</span>
                    <span class="score-value">${this.calculateAverage(analysis)}</span>
                </div>
            </div>
        `;
    }

    updateDisplay() {
        this.updateTable();
        this.updateEmptyState();
    }

    updateTable() {
        const tableBody = document.getElementById('analysisTableBody');
        tableBody.innerHTML = this.analysisData.map((analysis, index) => `
            <tr>
                <td>${analysis.name}</td>
                <td class="${this.getScoreClass(analysis.syllable_structure)}">${analysis.syllable_structure}</td>
                <td class="${this.getScoreClass(analysis.phonetic_texture)}">${analysis.phonetic_texture}</td>
                <td class="${this.getScoreClass(analysis.rhythm_flow)}">${analysis.rhythm_flow}</td>
                <td class="${this.getScoreClass(analysis.musicality)}">${analysis.musicality}</td>
                <td class="${this.getScoreClass(analysis.spectral_features)}">${analysis.spectral_features}</td>
                <td class="${this.getScoreClass(analysis.distinctiveness)}">${analysis.distinctiveness}</td>
                <td class="${this.getScoreClass(this.calculateAverage(analysis))}">${this.calculateAverage(analysis)}</td>
                <td>
                    <button onclick="nameAnalyzerUI.deleteAnalysis(${index})" class="delete-btn">×</button>
                </td>
            </tr>
        `).join('');
    }

    updateEmptyState() {
        const emptyState = document.getElementById('emptyState');
        const tableContainer = document.getElementById('tableContainer');
        
        if (this.analysisData.length === 0) {
            emptyState.style.display = 'block';
            tableContainer.style.display = 'none';
        } else {
            emptyState.style.display = 'none';
            tableContainer.style.display = 'block';
        }
    }

    calculateAverage(analysis) {
        const scores = [
            analysis.syllable_structure,
            analysis.phonetic_texture,
            analysis.rhythm_flow,
            analysis.musicality,
            analysis.spectral_features,
            analysis.distinctiveness
        ];
        return Math.round(scores.reduce((a, b) => a + b) / scores.length);
    }

    getScoreClass(score) {
        if (score >= 80) return 'excellent';
        if (score >= 60) return 'good';
        if (score >= 40) return 'average';
        return 'poor';
    }

    deleteAnalysis(index) {
        this.analysisData.splice(index, 1);
        this.updateDisplay();
        
        if (this.analysisData.length > 0) {
            this.showCurrentAnalysis(this.analysisData[0]);
        } else {
            document.getElementById('currentAnalysis').innerHTML = '';
        }
    }

    clearAllData() {
        this.analysisData = [];
        this.updateDisplay();
        document.getElementById('currentAnalysis').innerHTML = '';
    }

    sortTable() {
        const sortSelect = document.getElementById('sortSelect');
        const sortBy = sortSelect.value;
        
        this.analysisData.sort((a, b) => {
            if (sortBy === 'name') {
                return a.name.localeCompare(b.name);
            }
            if (sortBy === 'score') {
                return this.calculateAverage(b) - this.calculateAverage(a);
            }
            return b[sortBy] - a[sortBy];
        });
        
        this.updateDisplay();
    }

    filterTable() {
        const searchInput = document.getElementById('searchInput');
        const filter = searchInput.value.toLowerCase();
        const rows = document.querySelectorAll('#analysisTableBody tr');
        
        rows.forEach(row => {
            const name = row.firstElementChild.textContent.toLowerCase();
            row.style.display = name.includes(filter) ? '' : 'none';
        });
    }
}

// Initialize the UI when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.nameAnalyzerUI = new NameAnalyzerUI();
});
