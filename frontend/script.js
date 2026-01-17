const button = document.getElementById('funFactBtn');
const loadingDiv = document.getElementById('loading');
const factBox = document.getElementById('factBox');
const errorBox = document.getElementById('errorBox');

// Check server health on page load
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:5000/health');
        if (!response.ok) {
            throw new Error('Server not responding');
        }
    } catch (error) {
        console.warn('Backend server is not running. Start it with: node server.js');
    }
});

button.addEventListener('click', getFunFact);

async function getFunFact() {
    loadingDiv.classList.remove('show');
    factBox.classList.remove('show');
    errorBox.classList.remove('show');
    
    button.disabled = true;
    loadingDiv.classList.add('show');
    
    try {
        const response = await fetch('http://localhost:5000/fun-fact', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }
        
        const data = await response.json();
        
        loadingDiv.classList.remove('show');
        
        if (data.fact) {
            document.getElementById('factText').textContent = data.fact;
            document.getElementById('factTime').textContent = new Date().toLocaleTimeString();
            factBox.classList.add('show');
            errorBox.classList.remove('show');
        } else {
            throw new Error('No fact received from server');
        }
    } catch (error) {
        console.error('Error:', error);
        loadingDiv.classList.remove('show');
        errorBox.textContent = `Error: ${error.message}. Make sure the server is running on port 5000.`;
        errorBox.classList.add('show');
        factBox.classList.remove('show');
    } finally {
        button.disabled = false;
    }
}
