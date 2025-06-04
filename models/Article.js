const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
    {
        title: {
        type: String,
        required: [true, 'Le titre est requis'],
        trim: true,
        },
        content: {
        type: String,
        required: [true, 'Le contenu est requis'],
        },
        imageUrl: {
        type: String,
        default: '',
        },
        redirectUrl: {
        type: String,
        default: '',
        },
    },
    {
        timestamps: true,
    }
);

const Article = mongoose.model('Article', articleSchema);
module.exports = Article;