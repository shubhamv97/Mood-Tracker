// Global variables
let moodEntries = [];
let selectedMood = null;

// Mood data configuration
const moodConfig = {
    'excellent': { icon: '😍', value: 10, name: 'Excellent' },
    'great': { icon: '😊', value: 9, name: 'Great' },
    'good': { icon: '🙂', value: 8, name: 'Good' },
    'okay': { icon: '😐', value: 7, name: 'Okay' },
    'meh': { icon: '😑', value: 6, name: 'Meh' },
    'not_great': { icon: '😔', value: 5, name: 'Not Great' },
    'bad': { icon: '😞', value: 4, name: 'Bad' },
    'terrible': { icon: '😢', value: 3, name: 'Terrible' }
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setTodayDate();
    initializeSliders();
    initializeMoodSelector();
    loadStoredEntries();
    updateReports();
}

function setTodayDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').value = today;
}

function initializeSliders() {
    const sliders = ['sleep', 'stress', 'symptoms', 'engagement'];
    
    sliders.forEach(sliderId => {
        const slider = document.getElementById(sliderId);
        const valueDisplay = document.getElementById(sliderId + '-value');
        
        slider.addEventListener('input', function() {
            valueDisplay.textContent = this.value;
        });
    });
}

function initializeMoodSelector() {
    const moodCards = document.querySelectorAll('.mood-card');
    
    moodCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove previous selection
            moodCards.forEach(c => c.classList.remove('selected'));
            
            // Select current mood
            this.classList.add('selected');
            selectedMood = {
                type: this.dataset.mood,
                value: parseInt(this.dataset.value),
                icon: moodConfig[this.dataset.mood].icon,
                name: moodConfig[this.dataset.mood].name
            };
        });
    });
}

// Tab navigation
function showTab(tabName) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    const navTabs = document.querySelectorAll('.nav-tab');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    navTabs.forEach(tab => tab.classList.remove('active'));
    
    // Show selected tab
    document.getElementById(tabName + '-tab').classList.add('active');
    event.target.classList.add('active');
    
    // Update reports if reports tab is selected
    if (tabName === 'reports') {
        updateReports();
    }
}

// Form submission
document.getElementById('mood-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!selectedMood) {
        alert('Please select a mood before submitting.');
        return;
    }
    
    const formData = new FormData(this);
    const entry = {
        id: Date.now(),
        date: formData.get('date'),
        mood: selectedMood,
        sleep: parseInt(formData.get('sleep')),
        stress: parseInt(formData.get('stress')),
        symptoms: parseInt(formData.get('symptoms')),
        engagement: parseInt(formData.get('engagement')),
        medications: formData.get('medications') || '',
        notes: formData.get('notes') || ''
    };
    
    // Check if entry for this date already exists
    const existingIndex = moodEntries.findIndex(e => e.date === entry.date);
    
    if (existingIndex >= 0) {
        if (confirm('An entry for this date already exists. Do you want to update it?')) {
            moodEntries[existingIndex] = entry;
        } else {
            return;
        }
    } else {
        moodEntries.push(entry);
    }
    
    // Sort entries by date (newest first)
    moodEntries.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    saveEntries();
    displayHistory();
    updateReports();
    
    // Reset form
    resetForm();
    
    alert('Mood entry saved successfully!');
});

function resetForm() {
    document.getElementById('mood-form').reset();
    setTodayDate();
    
    // Reset sliders
    const sliders = ['sleep', 'stress', 'symptoms', 'engagement'];
    sliders.forEach(sliderId => {
        const slider = document.getElementById(sliderId);
        const valueDisplay = document.getElementById(sliderId + '-value');
        slider.value = sliderId === 'symptoms' ? '1' : '5';
        valueDisplay.textContent = slider.value;
    });
    
    // Reset mood selection
    selectedMood = null;
    document.querySelectorAll('.mood-card').forEach(card => {
        card.classList.remove('selected');
    });
}

function saveEntries() {
    // In a real application, this would save to a database
    // For demo purposes, we're keeping data in memory
    console.log('Entries saved:', moodEntries.length);
}

function loadStoredEntries() {
    // In a real application, this would load from a database
    // For demo purposes, starting with empty array
    displayHistory();
}

function displayHistory() {
    const container = document.getElementById('entries-container');
    
    if (moodEntries.length === 0) {
        container.innerHTML = '<p class="no-entries">No entries yet. Start by logging your first mood!</p>';
        return;
    }
    
    container.innerHTML = moodEntries.map(entry => createEntryHTML(entry)).join('');
}

function createEntryHTML(entry) {
    return `
        <div class="entry-card">
            <div class="entry-header">
                <div class="entry-date">${formatDate(entry.date)}</div>
                <div class="entry-mood">
                    <span>${entry.mood.icon}</span>
                    <span>${entry.mood.name}</span>
                </div>
                <button class="delete-btn" onclick="deleteEntry(${entry.id})">Delete</button>
            </div>
            
            <div class="entry-details">
                <div class="entry-detail">
                    <div class="entry-detail-label">Sleep</div>
                    <div class="entry-detail-value">${entry.sleep}/10</div>
                </div>
                <div class="entry-detail">
                    <div class="entry-detail-label">Stress</div>
                    <div class="entry-detail-value">${entry.stress}/10</div>
                </div>
                <div class="entry-detail">
                    <div class="entry-detail-label">Symptoms</div>
                    <div class="entry-detail-value">${entry.symptoms}/10</div>
                </div>
                <div class="entry-detail">
                    <div class="entry-detail-label">Engagement</div>
                    <div class="entry-detail-value">${entry.engagement}/10</div>
                </div>
            </div>
            
            ${entry.medications ? `<div class="entry-medications"><strong>Medications:</strong> ${entry.medications}</div>` : ''}
            ${entry.notes ? `<div class="entry-notes">${entry.notes}</div>` : ''}
        </div>
    `;
}

function deleteEntry(id) {
    if (confirm('Are you sure you want to delete this entry?')) {
        moodEntries = moodEntries.filter(entry => entry.id !== id);
        displayHistory();
        updateReports();
    }
}

function clearAllEntries() {
    if (confirm('Are you sure you want to delete all entries? This cannot be undone.')) {
        moodEntries = [];
        displayHistory();
        updateReports();
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
}

function updateReports() {
    updateStatistics();
    updateMoodChart();
    updateMoodDistribution();
}

function updateStatistics() {
    const totalCount = moodEntries.length;
    document.getElementById('total-count').textContent = totalCount;
    
    if (totalCount === 0) {
        document.getElementById('avg-mood').textContent = '-';
        document.getElementById('best-day').textContent = '-';
        document.getElementById('avg-sleep').textContent = '-';
        return;
    }
    
    // Calculate averages
    const avgMoodValue = moodEntries.reduce((sum, entry) => sum + entry.mood.value, 0) / totalCount;
    const avgSleep = moodEntries.reduce((sum, entry) => sum + entry.sleep, 0) / totalCount;
    
    // Find best day
    const bestEntry = moodEntries.reduce((best, current) => 
        current.mood.value > best.mood.value ? current : best
    );
    
    // Find most common mood
    const moodCounts = {};
    moodEntries.forEach(entry => {
        const moodType = entry.mood.type;
        moodCounts[moodType] = (moodCounts[moodType] || 0) + 1;
    });
    
    const mostCommonMoodType = Object.keys(moodCounts).reduce((a, b) => 
        moodCounts[a] > moodCounts[b] ? a : b, Object.keys(moodCounts)[0]
    );
    
    const mostCommonMood = moodConfig[mostCommonMoodType];
    
    document.getElementById('avg-mood').textContent = mostCommonMood ? mostCommonMood.name : '-';
    document.getElementById('best-day').textContent = formatShortDate(bestEntry.date);
    document.getElementById('avg-sleep').textContent = avgSleep.toFixed(1);
}

function updateMoodChart() {
    const chartContainer = document.getElementById('mood-chart');
    
    if (moodEntries.length === 0) {
        chartContainer.innerHTML = '<p class="no-data">Add entries to see your mood trends</p>';
        return;
    }
    
    // Get last 14 days of entries
    const last14Days = moodEntries
        .slice(0, 14)
        .reverse(); // Show oldest to newest for chart
    
    if (last14Days.length === 0) {
        chartContainer.innerHTML = '<p class="no-data">Add entries to see your mood trends</p>';
        return;
    }
    
    const maxValue = Math.max(...last14Days.map(entry => entry.mood.value));
    
    chartContainer.innerHTML = last14Days.map(entry => {
        const height = (entry.mood.value / maxValue) * 100;
        return `
            <div class="chart-bar" 
                 style="height: ${height}%"
                 title="${formatShortDate(entry.date)}: ${entry.mood.name} (${entry.mood.value}/10)">
            </div>
        `;
    }).join('');
}

function updateMoodDistribution() {
    const distributionContainer = document.getElementById('mood-distribution');
    
    if (moodEntries.length === 0) {
        distributionContainer.innerHTML = '<p class="no-data">Track moods to see distribution</p>';
        return;
    }
    
    // Count mood occurrences
    const moodCounts = {};
    moodEntries.forEach(entry => {
        const moodType = entry.mood.type;
        moodCounts[moodType] = (moodCounts[moodType] || 0) + 1;
    });
    
    // Create distribution grid
    distributionContainer.innerHTML = Object.keys(moodConfig)
        .filter(moodType => moodCounts[moodType] > 0)
        .map(moodType => {
            const mood = moodConfig[moodType];
            const count = moodCounts[moodType];
            const percentage = ((count / moodEntries.length) * 100).toFixed(1);
            
            return `
                <div class="mood-stat">
                    <div class="mood-stat-icon">${mood.icon}</div>
                    <div class="mood-stat-count">${count}</div>
                    <div class="mood-stat-label">${mood.name}</div>
                    <div class="mood-stat-label">${percentage}%</div>
                </div>
            `;
        }).join('');
}

function formatShortDate(dateString) {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}