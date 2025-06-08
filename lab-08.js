const express = require('express');
const path = require('path');

const app = express();
const PORT = 8080;
const HOST = 'localhost';

// #3: TODO: Serve static files from public folder
app.use(express.static(path.join(process.cwd(), 'public')));

// #1: TODO: Return first 20 photos from JSONPlaceholder
app.get("/photos", (req, res) => {
  fetch('https://jsonplaceholder.typicode.com/photos')
    .then(response => response.json())
    .then(data => res.status(200).json(data.slice(0, 20)))
    .catch(error => res.status(500).json({ error: error.message }));
});

// #2: TODO: Return a single photo by ID
app.get("/photos/:id", (req, res) => {
  const id = req.params.id;
  fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
    .then(response => response.json())
    .then(photo => res.status(200).json(photo))
    .catch(error => res.status(500).json({ error: error.message }));
});

// Handle 404s
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
