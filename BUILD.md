# Mood Tracker - Build Instructions

## Project Overview
A simple web-based mood tracking application that allows users to log daily moods, track patterns, and view analytics over time.

## Prerequisites
- Web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code, Notepad++, etc.)
- Local web server (optional but recommended)

## Technologies Used
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Storage**: In-memory (client-side)
- **No external dependencies or frameworks**

## Project Structure
```
mood-tracker/
├── index.html          # Main HTML file
├── styles.css          # Stylesheet
├── script.js           # JavaScript functionality
└── BUILD.md           # This file
```

## Build Instructions

### Step 1: Setup
1. Create a new directory called `mood-tracker`
2. Place all files (index.html, styles.css, script.js) in this directory

### Step 2: Local Development
**Option A: Direct File Access**
- Simply open `index.html` in your web browser
- File path should look like: `file:///path/to/mood-tracker/index.html`

**Option B: Local Web Server (Recommended)**
- Navigate to the project directory in terminal/command prompt
- Run one of the following commands:

**Using Python 3:**
```bash
python -m http.server 8000
```

**Using Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

**Using Node.js (if installed):**
```bash
npx http-server -p 8000
```

**Using PHP (if installed):**
```bash
php -S localhost:8000
```

### Step 3: Access Application
- Open your web browser
- Navigate to `http://localhost:8000`
- The mood tracker application should load

## Build Commands

### Development
```bash
# No build process required - static files only
# Simply serve files from local directory
```

### Testing
```bash
# Manual testing in browser
# Test on different browsers and screen sizes
# Verify all form submissions and data persistence
```

### Deployment
```bash
# Copy all files to web server directory
# No compilation or build process needed
```

## Features
- Daily mood logging with emoji selection
- Sleep quality, stress level, and engagement tracking
- Notes and medication tracking
- Historical mood entries view
- Analytics dashboard with trends and statistics
- Responsive design for mobile and desktop

## Browser Compatibility
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Development Notes
- Uses modern JavaScript (ES6+) features
- CSS Grid and Flexbox for layouts
- No external libraries or frameworks
- Data stored in memory (resets on page refresh)
- Fully client-side application

## Troubleshooting
- If styles don't load, ensure all files are in the same directory
- If JavaScript doesn't work, check browser console for errors
- For best experience, use a local web server rather than file:// protocol
- Ensure JavaScript is enabled in browser settings