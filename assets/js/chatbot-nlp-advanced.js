// ==================== SYSTÈME NLP ULTRA-PERFORMANT ====================
// Système de matching intelligent avec synonymes, fuzzy search et scoring

// ==================== DICTIONNAIRE DE SYNONYMES ====================
const INTENT_SYNONYMS = {
  projects: ['projet', 'projects', 'portfolio', 'realisation', 'travaux', 'work', 'application', 'app', 'systeme', 'plateforme', 'creation', 'developpement'],
  skills: ['competence', 'skill', 'technologie', 'tech', 'stack', 'outil', 'tool', 'framework', 'langage', 'programming', 'language', 'savoir'],
  experience: ['experience', 'travail', 'job', 'emploi', 'stage', 'poste', 'carriere', 'career', 'parcours', 'professionnel'],
  certifications: ['certification', 'diplome', 'certificate', 'formation', 'credential', 'badge', 'attestation', 'titre'],
  contact: ['contact', 'email', 'telephone', 'phone', 'appel', 'linkedin', 'joindre', 'reach', 'contacter', 'ecrire', 'github'],
  about: ['qui', 'presentation', 'profil', 'propos', 'about', 'bio', 'background', 'houssine', 'personne', 'identite'],
  ai: ['ia', 'intelligence artificielle', 'ai', 'machine learning', 'ml', 'deep learning', 'nlp', 'computer vision', 'neural', 'tensorflow'],
  mobile: ['mobile', 'android', 'flutter', 'application mobile', 'app mobile', 'smartphone', 'tablette', 'ios'],
  devops: ['devops', 'cicd', 'docker', 'jenkins', 'kubernetes', 'deploiement', 'infrastructure', 'pipeline', 'conteneur'],
  web: ['web', 'site', 'frontend', 'backend', 'fullstack', 'react', 'node', 'laravel', 'django', 'internet', 'web app']
};

// ==================== FONCTIONS UTILITAIRES ====================

/**
 * Normalise le texte (minuscules, sans accents, sans caractères spéciaux)
 */
function normalizeText(text) {
  return text.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Supprimer accents
    .replace(/[^a-z0-9\s]/g, " ") // Garder seulement lettres et chiffres
    .replace(/\s+/g, " ") // Normaliser espaces
    .trim();
}

/**
 * Tokenize le texte en mots significatifs
 */
function tokenize(text) {
  const stopWords = ['le', 'la', 'les', 'un', 'une', 'des', 'de', 'du', 'et', 'ou', 'est', 'sont', 'dans', 'sur', 'pour', 'avec', 'que', 'qui', 'quoi', 'comment', 'quelle', 'quel', 'quelles', 'quels', 'mon', 'ma', 'mes', 'ton', 'ta', 'tes', 'son', 'sa', 'ses'];
  return normalizeText(text)
    .split(' ')
    .filter(word => word.length > 2 && !stopWords.includes(word));
}

/**
 * Calcule la distance de Levenshtein entre deux chaînes (fuzzy matching)
 */
function levenshteinDistance(str1, str2) {
  const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
  
  for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
  
  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1, // insertion
        matrix[j - 1][i] + 1, // deletion
        matrix[j - 1][i - 1] + indicator // substitution
      );
    }
  }
  
  return matrix[str2.length][str1.length];
}

/**
 * Calcule le score de similarité entre tokens utilisateur et synonymes d'un intent
 */
function calculateIntentScore(userTokens, intentName) {
  const synonyms = INTENT_SYNONYMS[intentName] || [];
  let score = 0;
  let matchDetails = [];
  
  userTokens.forEach(token => {
    synonyms.forEach(synonym => {
      const normalizedSynonym = normalizeText(synonym);
      
      // Match exact: +10 points
      if (token === normalizedSynonym) {
        score += 10;
        matchDetails.push({ token, synonym, type: 'exact', points: 10 });
      }
      // Match substring: +7 points
      else if (token.includes(normalizedSynonym) || normalizedSynonym.includes(token)) {
        score += 7;
        matchDetails.push({ token, synonym, type: 'substring', points: 7 });
      }
      // Fuzzy match (distance <= 2): +5 à +1 points
      else {
        const distance = levenshteinDistance(token, normalizedSynonym);
        if (distance <= 2) {
          const points = Math.max(5 - distance, 1);
          score += points;
          matchDetails.push({ token, synonym, type: 'fuzzy', distance, points });
        }
      }
    });
  });
  
  return { score, matchDetails, intent: intentName };
}

/**
 * Détecte le meilleur intent à partir du message utilisateur
 */
function detectIntent(userMessage) {
  const tokens = tokenize(userMessage);
  
  if (tokens.length === 0) {
    return { intent: 'unknown', score: 0, confidence: 0 };
  }
  
  // Calculer scores pour tous les intents
  const scores = Object.keys(INTENT_SYNONYMS).map(intent => 
    calculateIntentScore(tokens, intent)
  ).sort((a, b) => b.score - a.score);
  
  const bestMatch = scores[0];
  const confidence = bestMatch.score > 0 ? Math.min(bestMatch.score / 10, 1) : 0;
  
  return { ...bestMatch, confidence };
}

// ==================== GÉNÉRATEURS DE RÉPONSES FORMATÉES ====================

function generateProjectsResponse(PORTFOLIO_DATA) {
  let response = `### 🚀 TOUS MES PROJETS (${PORTFOLIO_DATA.projects.length} réalisations)\n\n`;
  
  PORTFOLIO_DATA.projects.forEach((proj, i) => {
    response += `**${i+1}. ${proj.title}**\n`;
    response += `> ${proj.category}\n\n`;
    response += `${proj.description}\n\n`;
    
    response += `**💻 Technologies:**\n`;
    response += proj.technologies.map(tech => `- ${tech}`).join('\n') + '\n\n';
    
    if (proj.features && proj.features.length > 0) {
      response += `**✨ Fonctionnalités clés:**\n`;
      response += proj.features.slice(0, 4).map(f => `• ${f}`).join('\n') + '\n\n';
    }
    
    const links = [];
    if (proj.liveUrl) links.push(`[🔗 Démo Live](${proj.liveUrl})`);
    if (proj.githubUrl) links.push(`[📂 GitHub](${proj.githubUrl})`);
    if (proj.demoUrl) links.push(`[🎥 Vidéo](${proj.demoUrl})`);
    if (links.length > 0) response += links.join(' | ') + '\n\n';
    
    response += '---\n\n';
  });
  
  return response + "💡 *Besoin de détails sur un projet spécifique ? Demandez-moi !*";
}

function generateSkillsResponse(PORTFOLIO_DATA) {
  return `### 💻 COMPÉTENCES TECHNIQUES COMPLÈTES\n\n` +
         `**🎨 Frontend (${PORTFOLIO_DATA.skills.frontend.length})**\n` +
         PORTFOLIO_DATA.skills.frontend.map(s => `• ${s}`).join('\n') + '\n\n' +
         `**⚙️ Backend (${PORTFOLIO_DATA.skills.backend.length})**\n` +
         PORTFOLIO_DATA.skills.backend.map(s => `• ${s}`).join('\n') + '\n\n' +
         `**🗄️ Databases (${PORTFOLIO_DATA.skills.database.length})**\n` +
         PORTFOLIO_DATA.skills.database.map(s => `• ${s}`).join('\n') + '\n\n' +
         `**📱 Mobile (${PORTFOLIO_DATA.skills.mobile.length})**\n` +
         PORTFOLIO_DATA.skills.mobile.map(s => `• ${s}`).join('\n') + '\n\n' +
         `**🚀 DevOps & CI/CD (${PORTFOLIO_DATA.skills.devops.length})**\n` +
         PORTFOLIO_DATA.skills.devops.map(s => `• ${s}`).join('\n') + '\n\n' +
         `**🤖 Intelligence Artificielle (${PORTFOLIO_DATA.skills.ai.length})**\n` +
         PORTFOLIO_DATA.skills.ai.map(s => `• ${s}`).join('\n') + '\n\n' +
         `**🔌 IoT & Embedded (${PORTFOLIO_DATA.skills.iot.length})**\n` +
         PORTFOLIO_DATA.skills.iot.map(s => `• ${s}`).join('\n') + '\n\n' +
         `**🛠️ Tools & Technologies (${PORTFOLIO_DATA.skills.tools.length})**\n` +
         PORTFOLIO_DATA.skills.tools.map(s => `• ${s}`).join('\n') + '\n\n' +
         `---\n**📊 TOTAL: ${Object.values(PORTFOLIO_DATA.skills).flat().length}+ technologies maîtrisées !**`;
}

function generateExperienceResponse(PORTFOLIO_DATA) {
  let response = `### 💼 EXPÉRIENCES PROFESSIONNELLES (${PORTFOLIO_DATA.experiences.length} postes)\n\n`;
  
  PORTFOLIO_DATA.experiences.forEach((exp, i) => {
    response += `**${i+1}. ${exp.title}**\n`;
    response += `> ${exp.company} | ${exp.period}\n\n`;
    response += `${exp.description}\n\n`;
    response += `**🛠️ Technologies:** ${exp.technologies.join(', ')}\n\n`;
    
    if (exp.achievements && exp.achievements.length > 0) {
      response += `**🏆 Réalisations:**\n`;
      response += exp.achievements.map(a => `• ${a}`).join('\n') + '\n\n';
    }
    
    response += '---\n\n';
  });
  
  return response + "💡 *${PORTFOLIO_DATA.experiences.length} expériences enrichissantes dans le développement Full Stack, Mobile et DevOps*";
}

function generateCertificationsResponse(PORTFOLIO_DATA) {
  let response = `### 🎓 CERTIFICATIONS (${PORTFOLIO_DATA.certifications.length} obtenues)\n\n`;
  
  PORTFOLIO_DATA.certifications.forEach((cert, i) => {
    response += `**${i+1}. ${cert.title}**\n`;
    response += `🏢 ${cert.issuer} | 📅 ${cert.date}\n\n`;
    
    if (cert.skills && cert.skills.length > 0) {
      response += `**Compétences:** ${cert.skills.join(', ')}\n\n`;
    }
    
    if (cert.description) {
      response += `${cert.description}\n\n`;
    }
    
    response += `[🔗 Voir la certification](${cert.url})\n\n`;
    response += '---\n\n';
  });
  
  return response + "✅ *Ces certifications démontrent une expertise technique avancée !*";
}

function generateContactResponse(PORTFOLIO_DATA) {
  return `### 📧 ME CONTACTER\n\n` +
         `**📮 Email:** ${PORTFOLIO_DATA.profile.email}\n\n` +
         `**📱 Téléphone:** ${PORTFOLIO_DATA.profile.phone}\n\n` +
         `**💼 LinkedIn:** [Mon profil LinkedIn](${PORTFOLIO_DATA.profile.linkedin})\n\n` +
         `**🐙 GitHub:** [Houssine2001](${PORTFOLIO_DATA.profile.github})\n\n` +
         `---\n💡 *N'hésitez pas à me contacter pour toute opportunité professionnelle ou question technique !*`;
}

function generateAboutResponse(PORTFOLIO_DATA) {
  return `### 👨‍💻 HOUSSINE BEN AROUS\n` +
         `> ${PORTFOLIO_DATA.profile.title}\n\n` +
         `${PORTFOLIO_DATA.profile.description}\n\n` +
         `**🎓 Formation:** ${PORTFOLIO_DATA.profile.education}\n\n` +
         `### 📊 EN CHIFFRES\n\n` +
         `• 🚀 **${PORTFOLIO_DATA.projects.length} projets** réalisés (Full Stack, Mobile, AI, DevOps)\n` +
         `• 💼 **${PORTFOLIO_DATA.experiences.length} expériences** professionnelles\n` +
         `• 🎓 **${PORTFOLIO_DATA.certifications.length} certifications** obtenues\n` +
         `• 💻 **${Object.values(PORTFOLIO_DATA.skills).flat().length}+ technologies** maîtrisées\n\n` +
         `### 🌟 EXPERTISES CLÉS\n\n` +
         `• Full Stack Development (MERN, Laravel, Django, Symfony)\n` +
         `• Mobile Development (Java Android, Flutter)\n` +
         `• Intelligence Artificielle & Machine Learning\n` +
         `• DevOps & CI/CD (Docker, Jenkins, Kubernetes)\n` +
         `• IoT & Embedded Systems (Arduino, Raspberry Pi)`;
}

function generateAIResponse(PORTFOLIO_DATA) {
  return `### 🤖 EXPERTISE EN INTELLIGENCE ARTIFICIELLE\n\n` +
         `**Technologies maîtrisées:**\n` +
         PORTFOLIO_DATA.skills.ai.map(s => `• ${s}`).join('\n') + '\n\n' +
         `### 🚀 Projets IA réalisés\n\n` +
         `• **AI Educational Platform** (Transformers, NLP, Whisper)\n` +
         `• **Mental Health Platform** avec ML (détection émotions)\n` +
         `• **Stress Prediction** avec Python AI\n` +
         `• **Yoga Pose Analysis** avec OpenCV\n` +
         `• **Face Recognition System** (ML + OpenCV)\n\n` +
         `### 🎓 Certifications IA\n\n` +
         `• Google Vertex AI Search for Retail (Nov 2024)\n\n` +
         `---\n💡 *Je combine l'IA avec le développement Full Stack pour créer des solutions innovantes !*`;
}

function generateMobileResponse(PORTFOLIO_DATA) {
  return `### 📱 EXPERTISE EN DÉVELOPPEMENT MOBILE\n\n` +
         `**Technologies:**\n` +
         PORTFOLIO_DATA.skills.mobile.map(s => `• ${s}`).join('\n') + '\n\n' +
         `### 📲 Applications développées\n\n` +
         `• **FlexFlowGym Mobile** (FlutterFlow + Firebase)\n` +
         `• **Employee Access Control** avec Face Recognition (Flutter)\n` +
         `• **Smart Farm Mobile App** (Java Android)\n` +
         `• **Smart Irrigation Control** (Java + Firebase)\n\n` +
         `### ✨ Compétences\n\n` +
         `• Développement natif Android (Java, Android SDK)\n` +
         `• Cross-platform avec Flutter\n` +
         `• No-code/Low-code avec FlutterFlow\n` +
         `• Intégration Firebase (Auth, Firestore, Storage)\n` +
         `• APIs REST et WebSockets\n` +
         `• UI/UX mobile design`;
}

function generateDevOpsResponse(PORTFOLIO_DATA) {
  return `### 🚀 EXPERTISE DEVOPS & CI/CD\n\n` +
         `**Technologies:**\n` +
         PORTFOLIO_DATA.skills.devops.map(s => `• ${s}`).join('\n') + '\n\n' +
         `### 🔧 Projet principal: Pipeline DevOps Full Stack\n\n` +
         `• CI/CD automatisé avec Jenkins\n` +
         `• Conteneurisation Docker\n` +
         `• Analyse de code (SonarQube, JaCoCo)\n` +
         `• Monitoring (Prometheus, Grafana)\n` +
         `• Tests automatisés\n` +
         `• Déploiement automatisé\n\n` +
         `### 💼 Expérience\n\n` +
         `Intégration DevOps dans plusieurs projets (ParcTracker SOFRECOM, Educational Platform)`;
}

function generateWebResponse(PORTFOLIO_DATA) {
  return `### 🌐 EXPERTISE DÉVELOPPEMENT WEB\n\n` +
         `**Frontend:** ${PORTFOLIO_DATA.skills.frontend.join(', ')}\n\n` +
         `**Backend:** ${PORTFOLIO_DATA.skills.backend.join(', ')}\n\n` +
         `### 🚀 Projets Web réalisés\n\n` +
         `• **FlexFlowGym Desktop** (MERN Stack)\n` +
         `• **Smart Farm Platform** (MERN + PostgreSQL)\n` +
         `• **Mental Health Platform** (Laravel + MySQL)\n` +
         `• **AI Educational Platform** (Django + Python AI)\n` +
         `• **DevOps Pipeline** (Full Stack + Jenkins)\n\n` +
         `💡 *Expertise Full Stack du frontend au backend avec intégration continue*`;
}

// ==================== FONCTION PRINCIPALE NLP ====================

/**
 * Génère une réponse intelligente basée sur le message utilisateur
 * @param {string} userMessage - Le message de l'utilisateur
 * @param {object} PORTFOLIO_DATA - Les données du portfolio
 * @returns {string} - La réponse formatée
 */
function generateAdvancedNLPResponse(userMessage, PORTFOLIO_DATA) {
  const normalized = normalizeText(userMessage);
  
  // Cas spécial: Salutation
  if (normalized.match(/^(bonjour|salut|hello|hi|hey|bonsoir|coucou)/)) {
    return `### 👋 Bonjour !\n\n` +
           `Je suis l'assistant virtuel de **Houssine Ben Arous**, ${PORTFOLIO_DATA.profile.title}.\n\n` +
           `Je peux vous renseigner sur :\n` +
           `• 🚀 Ses **${PORTFOLIO_DATA.projects.length} projets**\n` +
           `• 💻 Ses **${Object.values(PORTFOLIO_DATA.skills).flat().length}+ compétences techniques**\n` +
           `• 💼 Ses **${PORTFOLIO_DATA.experiences.length} expériences professionnelles**\n` +
           `• 🎓 Ses **${PORTFOLIO_DATA.certifications.length} certifications**\n\n` +
           `💡 *Posez-moi des questions précises pour des réponses détaillées !*`;
  }
  
  // Détection d'intent
  const intentResult = detectIntent(userMessage);
  
  console.log('🎯 Intent détecté:', intentResult.intent, '| Score:', intentResult.score, '| Confiance:', (intentResult.confidence * 100).toFixed(0) + '%');
  
  // Générer la réponse selon l'intent
  switch (intentResult.intent) {
    case 'projects':
      return generateProjectsResponse(PORTFOLIO_DATA);
    
    case 'skills':
      return generateSkillsResponse(PORTFOLIO_DATA);
    
    case 'experience':
      return generateExperienceResponse(PORTFOLIO_DATA);
    
    case 'certifications':
      return generateCertificationsResponse(PORTFOLIO_DATA);
    
    case 'contact':
      return generateContactResponse(PORTFOLIO_DATA);
    
    case 'about':
      return generateAboutResponse(PORTFOLIO_DATA);
    
    case 'ai':
      return generateAIResponse(PORTFOLIO_DATA);
    
    case 'mobile':
      return generateMobileResponse(PORTFOLIO_DATA);
    
    case 'devops':
      return generateDevOpsResponse(PORTFOLIO_DATA);
    
    case 'web':
      return generateWebResponse(PORTFOLIO_DATA);
    
    default:
      // Réponse par défaut avec suggestions
      return `### 🤔 Je peux vous aider avec :\n\n` +
             `• 🚀 **Les ${PORTFOLIO_DATA.projects.length} projets** de Houssine (Full Stack, Mobile, AI, DevOps)\n` +
             `• 💻 **Ses ${Object.values(PORTFOLIO_DATA.skills).flat().length}+ compétences** techniques détaillées\n` +
             `• 💼 **Ses ${PORTFOLIO_DATA.experiences.length} expériences** professionnelles complètes\n` +
             `• 🎓 **Ses ${PORTFOLIO_DATA.certifications.length} certifications** (Google, AWS, Cisco, Hashgraph)\n` +
             `• 📧 **Ses coordonnées** pour le contacter\n` +
             `• 👨‍💻 **Son profil** et expertise\n\n` +
             `### 💡 Exemples de questions :\n\n` +
             `• "Quels sont tous les projets ?"\n` +
             `• "Quelles compétences techniques ?"\n` +
             `• "Parle-moi de son expérience"\n` +
             `• "Ses certifications ?"\n` +
             `• "Comment le contacter ?"\n\n` +
             `*Que souhaitez-vous savoir ?*`;
  }
}
