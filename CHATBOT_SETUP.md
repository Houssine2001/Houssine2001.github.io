# 🤖 Chatbot IA - Configuration Sécurisée

## ⚠️ Sécurité

Le chatbot actuel utilise un **système NLP intelligent** basé sur des règles et analyse de mots-clés. **Aucun token API n'est exposé côté client**.

## 🚀 Version Actuelle (Sécurisée)

### ✅ Avantages
- ✅ **Pas de token exposé** - Aucun risque de sécurité
- ✅ **Gratuit** - Pas de coûts d'API
- ✅ **Rapide** - Réponses instantanées
- ✅ **Intelligent** - Détection d'intention et réponses contextuelles
- ✅ **Personnalisé** - 100% basé sur vos données portfolio

### 🎯 Fonctionnalités
- Détection d'intention (projets, compétences, expérience, etc.)
- Analyse de mots-clés avancée
- Réponses contextuelles personnalisées
- Recherche intelligente dans les données
- Support multilingue (FR/EN)

## 🔧 Ajouter une Vraie API IA (Optionnel)

Si vous voulez utiliser une vraie API IA (GPT, Claude, Gemini), voici comment faire **de manière sécurisée**.

### Option 1 : Backend avec Netlify Functions (Recommandé)

#### 1. Créer une Netlify Function

```javascript
// netlify/functions/chat.js
const fetch = require('node-fetch');

exports.handler = async (event) => {
  // Récupérer le token depuis les variables d'environnement
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { message, history } = JSON.parse(event.body);

    const response = await fetch('https://models.inference.ai.azure.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GITHUB_TOKEN}`
      },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: 'Tu es l\'assistant de Houssine...' },
          ...history,
          { role: 'user', content: message }
        ],
        model: 'gpt-4o-mini',
        temperature: 0.7,
        max_tokens: 500
      })
    });

    const data = await response.json();
    
    return {
      statusCode: 200,
      body: JSON.stringify({ response: data.choices[0].message.content })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
```

#### 2. Modifier `chatbot-service.js`

```javascript
async function callAI(userMessage, conversationHistory = []) {
  try {
    const response = await fetch('/.netlify/functions/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userMessage,
        history: conversationHistory
      })
    });

    const data = await response.json();
    return data.response;
  } catch (error) {
    // Fallback vers le système NLP
    return intelligentResponse(userMessage);
  }
}
```

#### 3. Configuration Netlify

Ajouter dans les variables d'environnement Netlify :
```
GITHUB_TOKEN=votre_token_secret
```

### Option 2 : Backend avec Vercel Functions

#### 1. Créer `/api/chat.js`

```javascript
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const { message, history } = req.body;

  try {
    const response = await fetch('https://models.inference.ai.azure.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GITHUB_TOKEN}`
      },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: 'Assistant...' },
          ...history,
          { role: 'user', content: message }
        ],
        model: 'gpt-4o-mini'
      })
    });

    const data = await response.json();
    res.status(200).json({ response: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

#### 2. Modifier l'appel dans `chatbot-service.js`

```javascript
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: userMessage, history: conversationHistory })
});
```

### Option 3 : Backend Node.js/Express

Créer un serveur séparé :

```javascript
// server.js
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());
app.use(express.json());

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;
  
  try {
    const response = await fetch('https://models.inference.ai.azure.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GITHUB_TOKEN}`
      },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: 'Assistant portfolio...' },
          ...history,
          { role: 'user', content: message }
        ],
        model: 'gpt-4o-mini'
      })
    });

    const data = await response.json();
    res.json({ response: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

## 🔒 Bonnes Pratiques de Sécurité

### ❌ NE JAMAIS FAIRE
- ❌ Mettre un token API dans le code JavaScript côté client
- ❌ Commiter des tokens dans Git
- ❌ Exposer des clés API dans les fichiers publics

### ✅ TOUJOURS FAIRE
- ✅ Utiliser des variables d'environnement
- ✅ Créer un backend/proxy pour les appels API
- ✅ Valider et limiter les requêtes (rate limiting)
- ✅ Utiliser HTTPS uniquement
- ✅ Ajouter `.env` dans `.gitignore`

## 📊 Comparaison

| Aspect | NLP Actuel | API IA Backend |
|--------|-----------|----------------|
| **Sécurité** | ✅ Maximum | ✅ Sécurisé |
| **Coût** | ✅ Gratuit | ⚠️ Payant |
| **Rapidité** | ✅ Instantané | ⚠️ 1-3s |
| **Précision** | ⭐⭐⭐⭐ (très bon) | ⭐⭐⭐⭐⭐ (excellent) |
| **Complexité** | ✅ Simple | ⚠️ Backend requis |
| **Maintenance** | ✅ Facile | ⚠️ Gestion API |

## 💡 Recommandation

Pour un portfolio personnel, le **système NLP actuel est parfait** :
- Réponses intelligentes et pertinentes
- Aucun coût
- Aucun problème de sécurité
- Performances excellentes

N'ajoutez une API IA que si vous avez besoin de :
- Conversations très complexes
- Génération de contenu créatif
- Support multilingue avancé
- Apprentissage des conversations

## 🔗 Ressources

- [Netlify Functions](https://www.netlify.com/products/functions/)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [GitHub Models](https://github.com/marketplace/models)
- [OpenAI API](https://platform.openai.com/docs/api-reference)
- [Anthropic Claude](https://www.anthropic.com/api)

## 📝 Notes

Le système actuel utilise :
- **Détection d'intention** avec regex patterns
- **Analyse de mots-clés** pour recherche contextuelle
- **Réponses dynamiques** basées sur `PORTFOLIO_DATA`
- **Fallback intelligent** pour questions non comprises

Résultat : un chatbot **rapide, intelligent et 100% sécurisé** ! 🚀
