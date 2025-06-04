const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares globaux
app.use(cors());
app.use(express.json());

// Import des routes
const articleRoutes = require('./routes/articleRoutes');
app.use('/api/articles', articleRoutes);

// Route de test
app.get('/', (req, res) => {
    res.send('✅ API LVLUP opérationnelle !');
});

// Connexion MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connecté à MongoDB'))
    .catch((err) => console.error('❌ Erreur MongoDB :', err.message));

// Lancement serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur en ligne sur http://localhost:${PORT}`);
});