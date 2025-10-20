const express = require('express');
const cors = require('cors');


const app = express();
app.use(cors());


const ITEMS = [
"The Matrix",
"The Godfather",
"Pulp Fiction",
"The Shawshank Redemption",
"Interstellar",
"Inception",
"The Dark Knight",
"Forrest Gump",
"Fight Club",
"The Lord of the Rings: The Fellowship of the Ring",
"The Lord of the Rings: The Two Towers",
"The Lord of the Rings: The Return of the King",
"Back to the Future",
"Gladiator",
"Whiplash",
"Parasite",
"The Prestige",
"Se7en",
"The Social Network",
"The Silence of the Lambs"
];


app.get('/search', (req, res) => {
const q = (req.query.q || '').toLowerCase().trim();
const delay = 200 + Math.floor(Math.random() * 700);


setTimeout(() => {
if (!q) return res.json({ results: [] });
const results = ITEMS.filter(title => title.toLowerCase().includes(q)).slice(0, 10);
res.json({ results });
}, delay);
});


const PORT = 4000;
app.listen(PORT, () => console.log(`✅ Mock server running at http://localhost:${PORT}`));