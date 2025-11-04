// ==================== PORTFOLIO CHATBOT AVEC DEEPSEEK-V3 ====================// ==================== PORTFOLIO CHATBOT COMPLET ====================import { chat, getSuggestedQuestions } from './chatbot-service.js';

// Chatbot intelligent avec GitHub Models API + Fallback NLP automatique

// Par Houssine Ben Arous// Chatbot IA avec DeepSeek-V3 via GitHub Models + Fallback NLP



(function() {// Par Houssine Ben Arousclass PortfolioChatbot {

  'use strict';

  constructor() {

  // ==================== CONFIGURATION API ====================

  const GITHUB_TOKEN = "GITHUB_TOKEN_REMOVED";(function() {    this.conversationHistory = [];

  const API_ENDPOINT = "https://models.inference.ai.azure.com/chat/completions";

  const MODEL_NAME = "gpt-4o-mini";  'use strict';    this.isOpen = false;



  // ==================== DONNÉES DU PORTFOLIO ====================    this.isTyping = false;

  const PORTFOLIO_DATA = {

    profile: {  // ==================== CONFIGURATION API ====================    this.init();

      name: "Houssine Ben Arous",

      title: "Full Stack Developer & Mobile Developer",    }

      education: "Software Engineering Student at ESPRIT",

      email: "houssine.benarous@esprit.tn",  const GITHUB_TOKEN = "GITHUB_TOKEN_REMOVED";

      phone: "+216 21 422 422",

      linkedin: "https://www.linkedin.com/in/houssine-ben-arous/",  const API_ENDPOINT = "https://models.inference.ai.azure.com/chat/completions";  init() {

      github: "https://github.com/Houssine2001",

      description: "Passionné par la création d'applications innovantes avec expertise en mobile et web"  const MODEL_NAME = "gpt-4o-mini";    this.createChatbotUI();

    },

        this.attachEventListeners();

    skills: {

      frontend: ["React.js", "Next.js", "Angular", "HTML", "CSS", "JavaScript", "TypeScript"],  // ==================== DONNÉES DU PORTFOLIO ====================    this.showWelcomeMessage();

      backend: ["Node.js", "Express.js", "Laravel", "Django", "Python", "PHP", "Spring Boot"],

      database: ["MySQL", "MongoDB", "PostgreSQL"],    }

      mobile: ["Java", "Flutter", "FlutterFlow"],

      devops: ["Docker", "Jenkins", "Nexus", "SonarQube", "Grafana", "Prometheus"],  const PORTFOLIO_DATA = {

      ai: ["Machine Learning", "Computer Vision", "NLP", "Generative AI", "Prompt Engineering"]

    },    profile: {  createChatbotUI() {

    

    experiences: [      name: "Houssine Ben Arous",    const chatbotHTML = `

      {

        title: "Web Developer Intern",      title: "Full Stack Developer & Mobile Developer",      <!-- Chatbot Toggle Button -->

        company: "SOFRECOM",

        period: "Jul 2025 - Aug 2025",      education: "Software Engineering Student at ESPRIT",      <div class="chatbot-toggle" id="chatbotToggle">

        description: "Développement de ParcTracker, une application de gestion de parc automobile complète avec architecture MERN",

        technologies: ["MongoDB", "Express.js", "React.js", "Node.js", "Docker", "Jenkins"]      email: "houssine.benarous@esprit.tn",        <i class="uil uil-comments-alt"></i>

      },

      {      phone: "+216 21 422 422",        <span class="chatbot-badge">💬</span>

        title: "Full Stack Developer Freelance",

        company: "SMART FARM",      linkedin: "https://www.linkedin.com/in/houssine-ben-arous/",      </div>

        period: "Nov 2024 - Present",

        description: "Développement d'applications agricoles intelligentes avec stack MERN et PostgreSQL",      github: "https://github.com/Houssine2001",

        technologies: ["MongoDB", "PostgreSQL", "Express.js", "React.js", "Node.js"]

      },      description: "Passionné par la création d'applications innovantes"      <!-- Chatbot Container -->

      {

        title: "Mobile Developer Freelance",    },      <div class="chatbot-container" id="chatbotContainer">

        company: "SMART FARM",

        period: "Oct 2024 - Nov 2024",        <div class="chatbot-header">

        description: "Création d'applications mobiles Android natives pour l'agriculture",

        technologies: ["Java", "Android SDK", "SQLite", "REST API"]    skills: {          <div class="chatbot-header-info">

      },

      {      frontend: ["React.js", "Next.js", "Angular", "HTML", "CSS", "JavaScript", "TypeScript"],            <div class="chatbot-avatar">

        title: "Full Stack Developer Intern",

        company: "OACA (Tunis)",      backend: ["Node.js", "Express.js", "Laravel", "Django", "Python", "PHP", "Spring Boot"],              <i class="uil uil-robot"></i>

        period: "Jun 2024 - Aug 2024",

        description: "Développement de systèmes de gestion complets avec Laravel et Angular",      database: ["MySQL", "MongoDB", "PostgreSQL"],            </div>

        technologies: ["Angular", "Laravel", "MySQL", "Bootstrap"]

      }      mobile: ["Java", "Flutter", "FlutterFlow"],            <div class="chatbot-title">

    ],

          devops: ["Docker", "Jenkins", "Nexus", "SonarQube", "Grafana", "Prometheus"],              <h3>Assistant Houssine</h3>

    certifications: [

      {      ai: ["Machine Learning", "Computer Vision", "NLP", "Generative AI", "Prompt Engineering"]              <span class="chatbot-status">

        title: "Google Vertex AI Search for Retail",

        issuer: "Google Cloud",    },                <span class="status-dot"></span>

        date: "November 2024",

        skills: ["Vertex AI", "Machine Learning", "Retail AI"],                En ligne

        url: "https://www.cloudskillsboost.google/public_profiles/d0a53da2-f8c8-41ac-b7c0-0ad72d9da6e0/badges/11661730"

      },    experiences: [              </span>

      {

        title: "Introduction to IoT",      {            </div>

        issuer: "Cisco Networking Academy",

        date: "January 2023",        title: "Web Developer Intern",          </div>

        skills: ["IoT", "Networking", "Embedded Systems"],

        url: "https://www.credly.com/badges/c1a06106-eb2e-4f08-9db9-ecc9b364ca57"        company: "SOFRECOM",          <div class="chatbot-actions">

      },

      {        period: "Jul 2025 - Aug 2025",            <button class="chatbot-action-btn" id="clearChat" title="Effacer la conversation">

        title: "AWS Cloud Technical Essentials",

        issuer: "Amazon Web Services (AWS)",        description: "Développement de ParcTracker (MERN stack)",              <i class="uil uil-trash-alt"></i>

        date: "October 2024",

        skills: ["AWS", "Cloud Computing", "EC2", "S3"],        technologies: ["MongoDB", "Express.js", "React.js", "Node.js", "Docker", "Jenkins"]            </button>

        url: "https://www.credly.com/badges/437a1dad-1390-44ff-b10b-8f139cf051a5"

      },      },            <button class="chatbot-action-btn" id="closeChatbot" title="Fermer">

      {

        title: "Hashgraph Developer",      {              <i class="uil uil-times"></i>

        issuer: "Hedera",

        date: "October 2025",        title: "Full Stack Developer Freelance",            </button>

        skills: ["Blockchain", "Distributed Ledger", "Smart Contracts"],

        url: "https://www.credly.com/badges/e5c8d9f7-9f3b-4c5d-8e6a-7f8b9c0d1e2f"        company: "SMART FARM",          </div>

      }

    ],        period: "Nov 2024 - Present",        </div>

    

    projects: [        description: "Développement d'applications agricoles (MERN)",

      {

        title: "Educational Platform with AI",        technologies: ["MongoDB", "PostgreSQL", "Express.js", "React.js", "Node.js"]        <div class="chatbot-messages" id="chatbotMessages">

        category: "Full Stack Web",

        description: "Plateforme éducative avec système d'examen intelligent, génération de questions par IA, reconnaissance vocale et correction automatique",      },          <!-- Messages will be added here dynamically -->

        technologies: ["Python", "Django", "MongoDB", "AI/NLP", "Transformers", "Whisper", "scikit-learn"],

        features: ["IA générative", "Speech-to-Text", "Analyse sémantique", "Dashboard analytics"],      {        </div>

        githubUrl: "https://github.com/Houssine2001",

        videoUrl: "assets/videos/eduPlatform.mp4"        title: "Web Developer Intern",

      },

      {        company: "SMART FARM",        <div class="chatbot-suggestions" id="chatbotSuggestions">

        title: "Desktop Gym Management",

        category: "Desktop Application",        period: "Jun 2024 - Aug 2024",          <!-- Quick suggestions -->

        description: "Application de bureau complète pour la gestion de salle de sport avec Java",

        technologies: ["Java", "JavaFX", "MySQL", "JasperReports"],        description: "Optimisation UX/UI et debugging",        </div>

        features: ["Gestion des membres", "Planning des cours", "Facturation", "Rapports"],

        githubUrl: "https://github.com/Houssine2001/Application-de-Bureau-pour-Gestion-de-Gym",        technologies: ["React.js", "Express.js", "PostgreSQL"]

        demoUrl: "https://youtube.com/shorts/I4mQcdPc6qA"

      },      },        <div class="chatbot-input-container">

      {

        title: "Mobile Gym Management",      {          <div class="chatbot-input-wrapper">

        category: "Mobile Application",

        description: "Application mobile pour membres de gym avec suivi d'entraînement",        title: "Final Year Project Intern",            <textarea 

        technologies: ["Java", "Android", "Firebase", "Material Design"],

        features: ["Suivi des séances", "Planning personnel", "Notifications", "Profil utilisateur"],        company: "OACA",              id="chatbotInput" 

        githubUrl: "https://github.com/Houssine2001/gym_app",

        demoUrl: "https://youtube.com/shorts/dzpI9qUM8e4"        period: "Feb 2023 - May 2023",              class="chatbot-input" 

      },

      {        description: "Système de contrôle d'accès avec reconnaissance faciale",              placeholder="Posez votre question..."

        title: "Pipeline DevOps Full Stack",

        category: "DevOps",        technologies: ["PHP", "MySQL", "Flutter", "Raspberry Pi", "ML"]              rows="1"

        description: "Pipeline CI/CD complet avec Jenkins, Docker, SonarQube et monitoring",

        technologies: ["Jenkins", "Docker", "SonarQube", "JaCoCo", "Prometheus", "Grafana"],      }            ></textarea>

        features: ["Intégration continue", "Tests automatisés", "Analyse de code", "Monitoring temps réel"],

        githubUrl: "https://github.com/Houssine2001/devops-pipeline"    ],            <button class="chatbot-send-btn" id="chatbotSend">

      },

      {              <i class="uil uil-message"></i>

        title: "Mental Health Support Platform",

        category: "Full Stack Web",    certifications: [            </button>

        description: "Plateforme innovante de support mental pour étudiants avec IA",

        technologies: ["React", "Node.js", "MongoDB", "Machine Learning", "Jenkins", "Docker"],      {          </div>

        features: ["Chatbot IA", "Détection d'émotions", "Recommandations personnalisées", "Tableau de bord"],

        liveUrl: "https://fluffy-ganache-bbac91.netlify.app/login",        title: "Prompt Design in Vertex AI",        </div>

        githubUrl: "https://github.com/Houssine2001/SmartHealth_frontend"

      },        issuer: "Google Cloud",      </div>

      {

        title: "SmartHealth Laravel Backend",        date: "October 2024",    `;

        category: "Full Stack Web",

        description: "Backend robuste pour plateforme de santé mentale avec Laravel",        skills: ["AI/ML", "Google Cloud", "Prompt Engineering", "Generative AI"],

        technologies: ["Laravel", "MySQL", "RESTful API", "JWT", "PHPUnit"],

        features: ["API REST", "Authentification JWT", "Gestion des données", "Tests unitaires"],        url: "https://www.credly.com/badges/437a1dad-1390-44ff-b10b-8f139cf051a5"    document.body.insertAdjacentHTML('beforeend', chatbotHTML);

        githubUrl: "https://github.com/Houssine2001/SmartHealth_Laravel"

      },      },  }

      {

        title: "Access Control System",      {

        category: "Embedded Systems",

        description: "Système de contrôle d'accès avec Arduino et RFID",        title: "Introduction to IoT",  attachEventListeners() {

        technologies: ["Arduino", "C++", "RFID", "LCD Display", "Buzzer"],

        features: ["Authentification RFID", "Logs d'accès", "Alarme sonore", "Interface LCD"],        issuer: "Cisco Networking Academy",    const toggle = document.getElementById('chatbotToggle');

        githubUrl: "https://github.com/Houssine2001/access-control-arduino"

      }        date: "January 2023",    const close = document.getElementById('closeChatbot');

    ]

  };        skills: ["IoT", "Networking", "Embedded Systems"],    const send = document.getElementById('chatbotSend');



  // ==================== FONCTION: CONSTRUCTION DU CONTEXTE ====================        url: "https://www.credly.com/badges/c1a06106-eb2e-4f08-9db9-ecc9b364ca57"    const input = document.getElementById('chatbotInput');

  function buildSystemContext() {

    return `Tu es l'assistant virtuel de ${PORTFOLIO_DATA.profile.name}, ${PORTFOLIO_DATA.profile.title}.      },    const clear = document.getElementById('clearChat');



INFORMATIONS IMPORTANTES:      {

- Toujours répondre en FRANÇAIS

- Être concis mais informatif (3-5 phrases maximum)        title: "AWS Certified Cloud Practitioner",    toggle.addEventListener('click', () => this.toggleChat());

- Utiliser des émojis pertinents

- Fournir des liens vers projets/certifications quand pertinent        issuer: "Amazon Web Services",    close.addEventListener('click', () => this.closeChat());

- Montrer l'expertise technique avec précision

        date: "October 2024",    send.addEventListener('click', () => this.sendMessage());

PROFIL:

${PORTFOLIO_DATA.profile.description}        skills: ["Cloud Computing", "AWS Services", "Security"],    clear.addEventListener('click', () => this.clearConversation());

Formation: ${PORTFOLIO_DATA.profile.education}

Email: ${PORTFOLIO_DATA.profile.email}        url: "https://lnkd.in/e4AaH9hz"



COMPÉTENCES TECHNIQUES:      },    // Send on Enter (Shift+Enter for new line)

- Frontend: ${PORTFOLIO_DATA.skills.frontend.join(', ')}

- Backend: ${PORTFOLIO_DATA.skills.backend.join(', ')}      {    input.addEventListener('keydown', (e) => {

- Mobile: ${PORTFOLIO_DATA.skills.mobile.join(', ')}

- DevOps: ${PORTFOLIO_DATA.skills.devops.join(', ')}        title: "Hashgraph Developer",      if (e.key === 'Enter' && !e.shiftKey) {

- IA/ML: ${PORTFOLIO_DATA.skills.ai.join(', ')}

        issuer: "The Hashgraph Association",        e.preventDefault();

EXPÉRIENCES (${PORTFOLIO_DATA.experiences.length} postes):

${PORTFOLIO_DATA.experiences.map(exp =>         date: "October 2025",        this.sendMessage();

  `- ${exp.title} chez ${exp.company} (${exp.period}): ${exp.description}`

).join('\n')}        skills: ["Blockchain", "Distributed Ledger", "Smart Contracts"],      }



CERTIFICATIONS (${PORTFOLIO_DATA.certifications.length} certifications):        url: "https://www.credly.com/badges/09f115fa-c8e3-4203-a9ba-aba564f1b8f3"    });

${PORTFOLIO_DATA.certifications.map(cert => 

  `- ${cert.title} (${cert.issuer}, ${cert.date})`      }

).join('\n')}

    ],    // Auto-resize textarea

PROJETS PRINCIPAUX (${PORTFOLIO_DATA.projects.length} projets):

${PORTFOLIO_DATA.projects.map(proj =>     input.addEventListener('input', () => {

  `- ${proj.title}: ${proj.description} [${proj.technologies.slice(0,3).join(', ')}]`

).join('\n')}    projects: [      input.style.height = 'auto';



Réponds de manière professionnelle mais amicale, en mettant en valeur les compétences techniques de Houssine.`;      {      input.style.height = Math.min(input.scrollHeight, 120) + 'px';

  }

        title: "Educational Platform with AI",    });

  // ==================== FONCTION: APPEL API GITHUB MODELS ====================

  async function callGitHubModelsAPI(userMessage, conversationHistory) {        category: "Full Stack Web",  }

    try {

      const messages = [        description: "Plateforme éducative avec IA: Recommandations intelligentes, chatbot NLP, analytics, gestion de cours multi-formats",

        { role: "system", content: buildSystemContext() },

        ...conversationHistory,        technologies: ["Python", "Django", "MongoDB", "AI/NLP", "Transformers", "Whisper", "scikit-learn"],  toggleChat() {

        { role: "user", content: userMessage }

      ];        liveUrl: "https://educationia-django-7mub.onrender.com/accounts/login/",    this.isOpen = !this.isOpen;



      const response = await fetch(API_ENDPOINT, {        githubUrl: "https://github.com/Houssine2001"    const container = document.getElementById('chatbotContainer');

        method: 'POST',

        headers: {      },    const toggle = document.getElementById('chatbotToggle');

          'Content-Type': 'application/json',

          'Authorization': `Bearer ${GITHUB_TOKEN}`      {

        },

        body: JSON.stringify({        title: "Desktop Gym Management",    if (this.isOpen) {

          messages: messages,

          model: MODEL_NAME,        category: "Desktop Application",      container.classList.add('active');

          temperature: 0.7,

          max_tokens: 800,        description: "Application de gestion complète pour salle de sport",      toggle.classList.add('hidden');

          top_p: 0.95

        })        technologies: ["Java", "JavaFX", "MySQL"],      document.getElementById('chatbotInput').focus();

      });

        githubUrl: "https://github.com/Houssine2001/Application-de-Bureau-pour-Gestion-de-Gym",    } else {

      if (!response.ok) {

        console.warn(`⚠️ API GitHub Models error: ${response.status}`);        demoUrl: "https://youtube.com/shorts/I4mQcdPc6qA"      container.classList.remove('active');

        return { success: false };

      }      },      toggle.classList.remove('hidden');



      const data = await response.json();      {    }

      const botResponse = data.choices[0].message.content;

              title: "Mobile Gym Management",  }

      return { success: true, response: botResponse };

              category: "Mobile Development",

    } catch (error) {

      console.warn('⚠️ API GitHub Models indisponible:', error.message);        description: "Application mobile pour membres de gym",  closeChat() {

      return { success: false };

    }        technologies: ["Java", "Android", "MySQL"],    this.isOpen = false;

  }

        githubUrl: "https://github.com/Houssine2001/Application-Mobile-Gym",    document.getElementById('chatbotContainer').classList.remove('active');

  // ==================== FONCTION: RÉPONSE NLP (FALLBACK) ====================

  function generateNLPResponse(userMessage) {        demoUrl: "https://youtube.com/shorts/dzpI9qUM8e4"    document.getElementById('chatbotToggle').classList.remove('hidden');

    const msg = userMessage.toLowerCase();

          },  }

    // Intent: Salutation

    if (msg.match(/^(bonjour|salut|hello|hi|hey|bonsoir)/i)) {      {

      return `👋 Bonjour ! Je suis l'assistant virtuel de **Houssine Ben Arous**, ${PORTFOLIO_DATA.profile.title}.\n\nJe peux vous renseigner sur ses **projets**, **compétences**, **expériences** et **certifications**.\n\nQue souhaitez-vous savoir ?`;

    }        title: "Pipeline DevOps Full Stack",  showWelcomeMessage() {

    

    // Intent: Projets        category: "DevOps",    const welcomeMsg = `👋 Bonjour ! Je suis l'assistant virtuel de Houssine Ben Arous.\n\nJe peux vous renseigner sur ses projets, compétences, expériences et certifications. Comment puis-je vous aider ?`;

    if (msg.includes('projet') || msg.includes('portfolio') || msg.includes('réalisation')) {

      const featuredProjects = PORTFOLIO_DATA.projects.slice(0, 3);        description: "Pipeline CI/CD complet avec Jenkins, Docker, SonarQube, Prometheus et Grafana",    

      let response = `🚀 **Projets principaux de Houssine** (${PORTFOLIO_DATA.projects.length} projets au total):\n\n`;

              technologies: ["Jenkins", "Docker", "SonarQube", "JaCoCo", "Prometheus", "Grafana"]    this.addMessage(welcomeMsg, 'bot');

      featuredProjects.forEach((proj, i) => {

        response += `**${i+1}. ${proj.title}**\n`;      },    this.showSuggestions();

        response += `${proj.description}\n`;

        response += `💻 Tech: ${proj.technologies.slice(0, 4).join(', ')}\n`;      {  }

        if (proj.liveUrl) response += `🔗 [Demo live](${proj.liveUrl})\n`;

        if (proj.githubUrl) response += `📂 [GitHub](${proj.githubUrl})\n`;        title: "UniMindCare - Mental Health Platform",

        response += '\n';

      });        category: "Full Stack Web",  showSuggestions() {

      

      return response + "💡 Demandez-moi plus de détails sur un projet spécifique !";        description: "Plateforme innovante de support mental pour étudiants avec IA",    const suggestionsContainer = document.getElementById('chatbotSuggestions');

    }

            technologies: ["React", "Node.js", "MongoDB", "Machine Learning", "Jenkins", "Docker"],    const suggestions = getSuggestedQuestions();

    // Intent: Compétences

    if (msg.includes('compétence') || msg.includes('technologie') || msg.includes('stack') || msg.includes('outil')) {        githubUrl: "https://github.com/Taha-Yassine-Hadded/UniMindCare-PI",

      return `💻 **Compétences techniques de Houssine**:\n\n` +

             `🎨 **Frontend**: ${PORTFOLIO_DATA.skills.frontend.join(', ')}\n\n` +        liveUrl: "https://fluffy-ganache-bbac91.netlify.app/login",    suggestionsContainer.innerHTML = suggestions

             `⚙️ **Backend**: ${PORTFOLIO_DATA.skills.backend.join(', ')}\n\n` +

             `📱 **Mobile**: ${PORTFOLIO_DATA.skills.mobile.join(', ')}\n\n` +        demoUrl: "https://www.youtube.com/watch?v=INXtK6vuf2c"      .map(q => `<button class="suggestion-btn">${q}</button>`)

             `🚀 **DevOps**: ${PORTFOLIO_DATA.skills.devops.join(', ')}\n\n` +

             `🤖 **IA/ML**: ${PORTFOLIO_DATA.skills.ai.join(', ')}`;      },      .join('');

    }

          {

    // Intent: Expériences

    if (msg.includes('expérience') || msg.includes('travail') || msg.includes('stage') || msg.includes('emploi')) {        title: "AI Student Well-being Platform",    // Add click handlers

      let response = `💼 **Expériences professionnelles** (${PORTFOLIO_DATA.experiences.length} postes):\n\n`;

              category: "Full Stack Web",    suggestionsContainer.querySelectorAll('.suggestion-btn').forEach(btn => {

      PORTFOLIO_DATA.experiences.forEach((exp, i) => {

        response += `**${i+1}. ${exp.title}** - ${exp.company}\n`;        description: "Plateforme Laravel avec prédiction de stress IA, analyse de postures yoga (Computer Vision), nutrition personnalisée",      btn.addEventListener('click', () => {

        response += `📅 ${exp.period}\n`;

        response += `${exp.description}\n`;        technologies: ["Laravel", "Python AI", "OpenCV", "MySQL"],        document.getElementById('chatbotInput').value = btn.textContent;

        response += `🛠️ ${exp.technologies.join(', ')}\n\n`;

      });        githubUrl: "https://github.com/Houssine2001/SmartHealth_Laravel"        this.sendMessage();

      

      return response;      },      });

    }

          {    });

    // Intent: Certifications

    if (msg.includes('certification') || msg.includes('diplôme') || msg.includes('formation')) {        title: "Access Control with Facial Recognition",  }

      let response = `🎓 **Certifications de Houssine** (${PORTFOLIO_DATA.certifications.length} certifications):\n\n`;

              category: "IoT & ML",

      PORTFOLIO_DATA.certifications.forEach((cert, i) => {

        response += `**${i+1}. ${cert.title}**\n`;        description: "Système de contrôle d'accès avec reconnaissance faciale (Raspberry Pi)",  hideSuggestions() {

        response += `🏢 ${cert.issuer} - ${cert.date}\n`;

        response += `🔗 [Voir la certification](${cert.url})\n\n`;        technologies: ["PHP", "MySQL", "Flutter", "Raspberry Pi", "Machine Learning"],    document.getElementById('chatbotSuggestions').innerHTML = '';

      });

              githubUrl: "https://github.com/Houssine2001/ContrleAccess",  }

      return response;

    }        demoUrl: "https://www.youtube.com/watch?v=3Epe2dSKn4c"

    

    // Intent: Contact      }  async sendMessage() {

    if (msg.includes('contact') || msg.includes('email') || msg.includes('téléphone') || msg.includes('linkedin')) {

      return `📧 **Contactez Houssine**:\n\n` +    ]    const input = document.getElementById('chatbotInput');

             `📮 Email: ${PORTFOLIO_DATA.profile.email}\n` +

             `📱 Téléphone: ${PORTFOLIO_DATA.profile.phone}\n` +  };    const message = input.value.trim();

             `💼 LinkedIn: [Profil LinkedIn](${PORTFOLIO_DATA.profile.linkedin})\n` +

             `🐙 GitHub: [Houssine2001](${PORTFOLIO_DATA.profile.github})\n\n` +

             `N'hésitez pas à le contacter pour toute opportunité ou question !`;

    }  // ==================== SERVICE IA ====================    if (!message || this.isTyping) return;

    

    // Intent: À propos

    if (msg.includes('qui es') || msg.includes('présent') || msg.includes('à propos') || msg.includes('profil')) {

      return `👨‍💻 **Houssine Ben Arous** - ${PORTFOLIO_DATA.profile.title}\n\n` +  function buildSystemContext() {    // Add user message

             `${PORTFOLIO_DATA.profile.description}\n\n` +

             `🎓 Formation: ${PORTFOLIO_DATA.profile.education}\n\n` +    const { profile, skills, experiences, certifications, projects } = PORTFOLIO_DATA;    this.addMessage(message, 'user');

             `📊 **En chiffres**:\n` +

             `• ${PORTFOLIO_DATA.projects.length} projets réalisés\n` +    this.conversationHistory.push({ role: 'user', content: message });

             `• ${PORTFOLIO_DATA.experiences.length} expériences professionnelles\n` +

             `• ${PORTFOLIO_DATA.certifications.length} certifications obtenues\n` +    return `Tu es l'assistant virtuel de ${profile.name}, ${profile.title}.

             `• ${Object.values(PORTFOLIO_DATA.skills).flat().length}+ technologies maîtrisées`;

    }    // Clear input

    

    // Réponse par défautPROFIL:    input.value = '';

    return `🤔 Je peux vous aider avec des informations sur:\n\n` +

           `• 📁 Les **projets** de Houssine\n` +${profile.name} - ${profile.title}    input.style.height = 'auto';

           `• 💻 Ses **compétences** techniques\n` +

           `• 💼 Son **expérience** professionnelle\n` +Formation: ${profile.education}

           `• 🎓 Ses **certifications**\n` +

           `• 📧 Ses **coordonnées**\n\n` +Email: ${profile.email}    // Hide suggestions after first message

           `Que souhaitez-vous savoir ?`;

  }    this.hideSuggestions();



  // ==================== FONCTION PRINCIPALE: CHAT ====================COMPÉTENCES:

  async function chat(userMessage, conversationHistory = []) {

    // Tentative 1: API GitHub Models (DeepSeek-V3)Frontend: ${skills.frontend.join(', ')}    // Show typing indicator

    const apiResult = await callGitHubModelsAPI(userMessage, conversationHistory);

    Backend: ${skills.backend.join(', ')}    this.showTypingIndicator();

    if (apiResult.success) {

      return apiResult.response;Mobile: ${skills.mobile.join(', ')}

    }

    DevOps: ${skills.devops.join(', ')}    try {

    // Fallback automatique: NLP local

    console.log('🔄 Utilisation du fallback NLP');IA/ML: ${skills.ai.join(', ')}      // Get AI response

    return generateNLPResponse(userMessage);

  }      const response = await chat(message, this.conversationHistory);



  // ==================== CLASSE: PORTFOLIO CHATBOT UI ====================EXPÉRIENCES (${experiences.length}):      

  class PortfolioChatbot {

    constructor() {${experiences.map(exp => `• ${exp.title} chez ${exp.company} (${exp.period})`).join('\n')}      // Remove typing indicator

      this.conversationHistory = [];

      this.isOpen = false;      this.hideTypingIndicator();

      this.isTyping = false;

      this.init();CERTIFICATIONS (${certifications.length}):

    }

${certifications.map(cert => `• ${cert.title} (${cert.issuer})`).join('\n')}      // Add bot response

    init() {

      this.createChatbotUI();      this.addMessage(response, 'bot');

      this.attachEventListeners();

      this.showWelcomeMessage();PROJETS (${projects.length}):      this.conversationHistory.push({ role: 'assistant', content: response });

    }

${projects.map(proj => `• ${proj.title} - ${proj.technologies.slice(0, 3).join(', ')}`).join('\n')}

    createChatbotUI() {

      const chatbotHTML = `    } catch (error) {

        <!-- Chatbot Toggle Button -->

        <div class="chatbot-toggle" id="chatbotToggle">INSTRUCTIONS:      console.error('Error:', error);

          <i class="uil uil-comments-alt"></i>

          <span class="chatbot-badge">💬</span>- Réponds en français, amical et professionnel      this.hideTypingIndicator();

        </div>

- Utilise UNIQUEMENT ces données      this.addMessage('Désolé, une erreur est survenue. Veuillez réessayer.', 'bot');

        <!-- Chatbot Container -->

        <div class="chatbot-container" id="chatbotContainer">- Sois concis (2-4 phrases) sauf si détails demandés    }

          <div class="chatbot-header">

            <div class="chatbot-header-info">- Utilise des emojis  }

              <div class="chatbot-avatar">

                <i class="uil uil-robot"></i>- Si info non disponible, suggère de contacter Houssine`;

              </div>

              <div class="chatbot-title">  }  addMessage(text, sender) {

                <h3>Assistant Houssine</h3>

                <span class="chatbot-status">    const messagesContainer = document.getElementById('chatbotMessages');

                  <span class="status-dot"></span>

                  En ligne  async function callGitHubModelsAPI(userMessage, conversationHistory) {    const messageDiv = document.createElement('div');

                </span>

              </div>    try {    messageDiv.className = `chatbot-message ${sender}-message`;

            </div>

            <div class="chatbot-actions">      const messages = [

              <button class="chatbot-action-btn" id="clearChat" title="Effacer la conversation">

                <i class="uil uil-trash-alt"></i>        { role: "system", content: buildSystemContext() },    const avatar = sender === 'bot' 

              </button>

              <button class="chatbot-action-btn" id="closeChatbot" title="Fermer">        ...conversationHistory.slice(-6),      ? '<div class="message-avatar"><i class="uil uil-robot"></i></div>'

                <i class="uil uil-times"></i>

              </button>        { role: "user", content: userMessage }      : '<div class="message-avatar"><i class="uil uil-user"></i></div>';

            </div>

          </div>      ];



          <div class="chatbot-messages" id="chatbotMessages">    const formattedText = this.formatMessage(text);

            <!-- Messages will be inserted here -->

          </div>      console.log("🤖 Appel GitHub Models API...");



          <div class="chatbot-suggestions" id="chatbotSuggestions">    messageDiv.innerHTML = `

            <!-- Suggestions will be inserted here -->

          </div>      const response = await fetch(API_ENDPOINT, {      ${avatar}



          <div class="chatbot-input-container">        method: "POST",      <div class="message-content">

            <textarea 

              id="chatbotInput"         headers: {        <div class="message-bubble">${formattedText}</div>

              class="chatbot-input" 

              placeholder="Posez votre question..."           "Content-Type": "application/json",        <span class="message-time">${this.getCurrentTime()}</span>

              rows="1"

            ></textarea>          "Authorization": `Bearer ${GITHUB_TOKEN}`      </div>

            <button class="chatbot-send" id="chatbotSend">

              <i class="uil uil-message"></i>        },    `;

            </button>

          </div>        body: JSON.stringify({

        </div>

      `;          messages: messages,    messagesContainer.appendChild(messageDiv);



      document.body.insertAdjacentHTML('beforeend', chatbotHTML);          model: MODEL_NAME,    

    }

          temperature: 0.7,    // Scroll to bottom with animation

    attachEventListeners() {

      const toggle = document.getElementById('chatbotToggle');          max_tokens: 600,    setTimeout(() => {

      const close = document.getElementById('closeChatbot');

      const send = document.getElementById('chatbotSend');          top_p: 0.95      messagesContainer.scrollTo({

      const input = document.getElementById('chatbotInput');

      const clear = document.getElementById('clearChat');        })        top: messagesContainer.scrollHeight,



      toggle.addEventListener('click', () => this.toggleChat());      });        behavior: 'smooth'

      close.addEventListener('click', () => this.closeChat());

      send.addEventListener('click', () => this.sendMessage());      });

      clear.addEventListener('click', () => this.clearConversation());

      if (!response.ok) {    }, 100);

      // Send on Enter (Shift+Enter for new line)

      input.addEventListener('keydown', (e) => {        throw new Error(`API Error: ${response.status}`);  }

        if (e.key === 'Enter' && !e.shiftKey) {

          e.preventDefault();      }

          this.sendMessage();

        }  formatMessage(text) {

      });

      const data = await response.json();    // Convert URLs to links

      // Auto-resize textarea

      input.addEventListener('input', () => {      console.log("✅ Réponse API reçue");    text = text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');

        input.style.height = 'auto';

        input.style.height = Math.min(input.scrollHeight, 120) + 'px';      return { success: true, response: data.choices[0].message.content };    

      });

    }    // Convert line breaks



    toggleChat() {    } catch (error) {    text = text.replace(/\n/g, '<br>');

      const container = document.getElementById('chatbotContainer');

      const toggle = document.getElementById('chatbotToggle');      console.error("❌ Erreur API:", error.message);    



      if (this.isOpen) {      return { success: false };    // Bold text between **

        container.classList.remove('active');

        toggle.classList.remove('hidden');    }    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        this.isOpen = false;

      } else {  }    

        container.classList.add('active');

        toggle.classList.add('hidden');    // Italic text between *

        this.isOpen = true;

        document.getElementById('chatbotInput').focus();  function generateNLPResponse(message) {    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');

      }

    }    const msg = message.toLowerCase();



    closeChat() {    const { profile, skills, experiences, certifications, projects } = PORTFOLIO_DATA;    return text;

      document.getElementById('chatbotContainer').classList.remove('active');

      document.getElementById('chatbotToggle').classList.remove('hidden');  }

      this.isOpen = false;

    }    // Salutations



    showWelcomeMessage() {    if (/^(bonjour|salut|hello|hi|hey)/.test(msg)) {  showTypingIndicator() {

      const welcomeMsg = `👋 Bonjour ! Je suis l'assistant virtuel de **Houssine Ben Arous**.\n\nJe peux vous renseigner sur ses projets, compétences, expériences et certifications.\n\n💡 _Propulsé par l'IA (DeepSeek-V3 via GitHub Models)_`;

            return `👋 Bonjour ! Je suis l'assistant de **${profile.name}**.\n\nJe peux vous renseigner sur ses projets, compétences, expériences et certifications. Que voulez-vous savoir ?`;    this.isTyping = true;

      this.addMessage(welcomeMsg, 'bot');

      this.showSuggestions();    }    const messagesContainer = document.getElementById('chatbotMessages');

    }

    const typingDiv = document.createElement('div');

    showSuggestions() {

      const suggestionsContainer = document.getElementById('chatbotSuggestions');    // Projets    typingDiv.className = 'chatbot-message bot-message typing-indicator';

      const suggestions = [

        "Quels sont les projets de Houssine ?",    if (/projet|réalisation|application/.test(msg)) {    typingDiv.id = 'typingIndicator';

        "Quelles sont ses compétences techniques ?",

        "Parle-moi de son expérience professionnelle",      if (msg.includes('django') || msg.includes('educational')) {    typingDiv.innerHTML = `

        "Comment le contacter ?"

      ];        const proj = projects[0];      <div class="message-avatar"><i class="uil uil-robot"></i></div>



      suggestionsContainer.innerHTML = suggestions        return `🎓 **${proj.title}**\n\n${proj.description}\n\n**Stack**: ${proj.technologies.slice(0, 4).join(', ')}\n\n🔗 [Demo](${proj.liveUrl})`;      <div class="message-content">

        .map(s => `<button class="suggestion-btn">${s}</button>`)

        .join('');      }        <div class="message-bubble">



      suggestionsContainer.querySelectorAll('.suggestion-btn').forEach(btn => {      if (msg.includes('gym')) {          <div class="typing-dots">

        btn.addEventListener('click', () => {

          document.getElementById('chatbotInput').value = btn.textContent;        return `💪 **Applications Gym** (Desktop + Mobile)\n\nSystème complet en Java pour gestion de salle de sport.\n\n📹 [Voir démo](https://youtube.com/shorts/I4mQcdPc6qA)`;            <span></span>

          this.sendMessage();

        });      }            <span></span>

      });

    }      return `🚀 **${projects.length} Projets Majeurs**\n\n${projects.slice(0, 4).map((p, i) => `${i+1}. **${p.title}**\n   ${p.category} - ${p.technologies.slice(0, 2).join(', ')}`).join('\n\n')}`;            <span></span>



    async sendMessage() {    }          </div>

      const input = document.getElementById('chatbotInput');

      const message = input.value.trim();        </div>



      if (!message || this.isTyping) return;    // Compétences      </div>



      // Add user message    if (/compétence|technologie|stack|maîtrise/.test(msg)) {    `;

      this.addMessage(message, 'user');

      this.conversationHistory.push({ role: 'user', content: message });      if (msg.includes('frontend')) {    messagesContainer.appendChild(typingDiv);



      // Clear input and suggestions        return `🎨 **Frontend**: ${skills.frontend.join(' • ')}`;    messagesContainer.scrollTo({

      input.value = '';

      input.style.height = 'auto';      }      top: messagesContainer.scrollHeight,

      document.getElementById('chatbotSuggestions').innerHTML = '';

      if (msg.includes('backend')) {      behavior: 'smooth'

      // Show typing indicator

      this.showTypingIndicator();        return `⚙️ **Backend**: ${skills.backend.join(' • ')}`;    });

      this.isTyping = true;

      }  }

      // Get bot response

      try {      if (msg.includes('devops')) {

        const response = await chat(message, this.conversationHistory);

                return `🚀 **DevOps**: ${skills.devops.join(' • ')}`;  hideTypingIndicator() {

        this.hideTypingIndicator();

        this.addMessage(response, 'bot');      }    this.isTyping = false;

        this.conversationHistory.push({ role: 'assistant', content: response });

        this.isTyping = false;      return `💻 **Stack Technique**\n\n**Frontend**: ${skills.frontend.slice(0, 3).join(', ')}\n**Backend**: ${skills.backend.slice(0, 3).join(', ')}\n**Mobile**: ${skills.mobile.join(', ')}\n**DevOps**: ${skills.devops.slice(0, 3).join(', ')}\n**IA/ML**: ${skills.ai.slice(0, 2).join(', ')}`;    const typingIndicator = document.getElementById('typingIndicator');

      } catch (error) {

        this.hideTypingIndicator();    }    if (typingIndicator) {

        this.addMessage("❌ Désolé, une erreur est survenue. Veuillez réessayer.", 'bot');

        this.isTyping = false;      typingIndicator.remove();

      }

    }    // Expérience    }



    addMessage(text, sender) {    if (/expérience|travail|stage/.test(msg)) {  }

      const messagesContainer = document.getElementById('chatbotMessages');

      const messageDiv = document.createElement('div');      if (msg.includes('sofrecom')) {

      messageDiv.className = `chatbot-message ${sender}-message`;

              const exp = experiences[0];  getCurrentTime() {

      const formattedText = this.formatMessage(text);

      messageDiv.innerHTML = formattedText;        return `🏢 **${exp.title}** chez **SOFRECOM**\n📅 ${exp.period}\n\n${exp.description}\n\n**Stack**: ${exp.technologies.join(', ')}`;    const now = new Date();

      

      messagesContainer.appendChild(messageDiv);      }    return now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

      messagesContainer.scrollTop = messagesContainer.scrollHeight;

    }      return `💼 **${experiences.length} Expériences**\n\n${experiences.slice(0, 3).map((e, i) => `**${i+1}. ${e.title}**\n   ${e.company} • ${e.period}`).join('\n\n')}`;  }



    formatMessage(text) {    }

      // Convert markdown-style formatting

      return text  clearConversation() {

        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

        .replace(/\*(.*?)\*/g, '<em>$1</em>')    // Certifications    if (confirm('Voulez-vous vraiment effacer la conversation ?')) {

        .replace(/\n/g, '<br>')

        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');    if (/certification|diplôme|certificat/.test(msg)) {      this.conversationHistory = [];

    }

      if (msg.includes('google') || msg.includes('vertex')) {      document.getElementById('chatbotMessages').innerHTML = '';

    showTypingIndicator() {

      const messagesContainer = document.getElementById('chatbotMessages');        const cert = certifications[0];      this.showWelcomeMessage();

      const typingDiv = document.createElement('div');

      typingDiv.className = 'chatbot-message bot-message typing-indicator';        return `🎓 **${cert.title}**\n${cert.issuer} • ${cert.date}\n\n**Compétences**: ${cert.skills.join(' • ')}\n\n🔗 [Badge](${cert.url})`;    }

      typingDiv.id = 'typingIndicator';

      typingDiv.innerHTML = `      }  }

        <div class="typing-dots">

          <span></span>      if (msg.includes('aws') || msg.includes('cloud')) {}

          <span></span>

          <span></span>        const cert = certifications[2];

        </div>

      `;        return `☁️ **${cert.title}**\n${cert.issuer} • ${cert.date}\n\n**Compétences**: ${cert.skills.join(' • ')}`;// Initialize chatbot when DOM is ready

      messagesContainer.appendChild(typingDiv);

      messagesContainer.scrollTop = messagesContainer.scrollHeight;      }if (document.readyState === 'loading') {

    }

      return `🏆 **${certifications.length} Certifications**\n\n${certifications.map((c, i) => `${i+1}. **${c.title}**\n   ${c.issuer} • ${c.date}`).join('\n\n')}`;  document.addEventListener('DOMContentLoaded', () => {

    hideTypingIndicator() {

      const indicator = document.getElementById('typingIndicator');    }    new PortfolioChatbot();

      if (indicator) indicator.remove();

    }  });



    clearConversation() {    // Contact} else {

      document.getElementById('chatbotMessages').innerHTML = '';

      this.conversationHistory = [];    if (/contact|email|joindre|linkedin/.test(msg)) {  new PortfolioChatbot();

      this.showWelcomeMessage();

    }      return `📧 **Contacter ${profile.name}**\n\n**Email**: ${profile.email}\n**LinkedIn**: [Profil](${profile.linkedin})\n**GitHub**: [Repositories](${profile.github})\n**Tél**: ${profile.phone}`;}

  }

    }

  // ==================== INITIALISATION ====================

  window.PortfolioChatbot = new PortfolioChatbot();export default PortfolioChatbot;



})();    // À propos

    if (/qui|présent|à propos|profil/.test(msg)) {
      return `👨‍💻 **${profile.name}**\n\n${profile.description}\n\n**Formation**: ${profile.education}\n\n📊 **Chiffres**:\n• ${experiences.length} expériences\n• ${certifications.length} certifications\n• ${projects.length} projets`;
    }

    // Défaut
    return `🤔 Je peux vous aider avec:\n\n• 🚀 Projets de Houssine\n• 💻 Compétences techniques\n• 💼 Expérience professionnelle\n• 🎓 Certifications\n• 📧 Contact\n\nPosez votre question !`;
  }

  async function chat(userMessage, conversationHistory) {
    if (!userMessage || !userMessage.trim()) {
      return generateNLPResponse('bonjour');
    }

    console.log("💬 Question:", userMessage);

    // Essayer l'API d'abord
    const apiResult = await callGitHubModelsAPI(userMessage, conversationHistory);
    
    if (apiResult.success) {
      console.log("✅ Utilisation: GitHub Models API");
      return apiResult.response;
    }

    // Fallback NLP automatique
    console.log("🔄 Fallback: NLP");
    return generateNLPResponse(userMessage);
  }

  // ==================== CHATBOT UI ====================

  class PortfolioChatbot {
    constructor() {
      this.conversationHistory = [];
      this.isOpen = false;
      this.isTyping = false;
      this.init();
    }

    init() {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.setup());
      } else {
        this.setup();
      }
    }

    setup() {
      this.createChatbotUI();
      this.attachEventListeners();
      setTimeout(() => this.showWelcomeMessage(), 500);
      console.log("✅ Chatbot initialisé");
    }

    createChatbotUI() {
      const chatbotHTML = `
        <div class="chatbot-toggle" id="chatbotToggle">
          <i class="uil uil-comments-alt"></i>
          <span class="chatbot-badge">💬</span>
        </div>

        <div class="chatbot-container" id="chatbotContainer">
          <div class="chatbot-header">
            <div class="chatbot-header-info">
              <div class="chatbot-avatar">
                <i class="uil uil-robot"></i>
              </div>
              <div class="chatbot-title">
                <h3>Assistant Houssine</h3>
                <span class="chatbot-status">
                  <span class="status-dot"></span>
                  En ligne
                </span>
              </div>
            </div>
            <div class="chatbot-actions">
              <button class="chatbot-action-btn" id="clearChat" title="Effacer">
                <i class="uil uil-trash-alt"></i>
              </button>
              <button class="chatbot-action-btn" id="closeChatbot" title="Fermer">
                <i class="uil uil-times"></i>
              </button>
            </div>
          </div>

          <div class="chatbot-messages" id="chatbotMessages"></div>

          <div class="chatbot-suggestions" id="chatbotSuggestions"></div>

          <div class="chatbot-input-container">
            <div class="chatbot-input-wrapper">
              <textarea 
                id="chatbotInput" 
                class="chatbot-input" 
                placeholder="Posez votre question..."
                rows="1"
              ></textarea>
              <button class="chatbot-send-btn" id="chatbotSend">
                <i class="uil uil-message"></i>
              </button>
            </div>
          </div>
        </div>
      `;

      document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    attachEventListeners() {
      const toggle = document.getElementById('chatbotToggle');
      const close = document.getElementById('closeChatbot');
      const send = document.getElementById('chatbotSend');
      const input = document.getElementById('chatbotInput');
      const clear = document.getElementById('clearChat');

      if (toggle) toggle.addEventListener('click', () => this.toggleChat());
      if (close) close.addEventListener('click', () => this.closeChat());
      if (send) send.addEventListener('click', () => this.sendMessage());
      if (clear) clear.addEventListener('click', () => this.clearConversation());

      if (input) {
        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            this.sendMessage();
          }
        });

        input.addEventListener('input', () => {
          input.style.height = 'auto';
          input.style.height = Math.min(input.scrollHeight, 120) + 'px';
        });
      }
    }

    toggleChat() {
      this.isOpen = !this.isOpen;
      const container = document.getElementById('chatbotContainer');
      const toggle = document.getElementById('chatbotToggle');

      if (this.isOpen) {
        container.classList.add('active');
        toggle.classList.add('hidden');
        const input = document.getElementById('chatbotInput');
        if (input) input.focus();
      } else {
        container.classList.remove('active');
        toggle.classList.remove('hidden');
      }
    }

    closeChat() {
      this.isOpen = false;
      const container = document.getElementById('chatbotContainer');
      const toggle = document.getElementById('chatbotToggle');
      if (container) container.classList.remove('active');
      if (toggle) toggle.classList.remove('hidden');
    }

    showWelcomeMessage() {
      const welcomeMsg = `👋 Bonjour ! Je suis l'assistant IA de **Houssine Ben Arous**.\n\nJe peux vous renseigner sur ses projets, compétences, expériences et certifications.\n\n💡 **Système**: DeepSeek-V3/GPT-4o-mini + NLP intelligent.`;
      
      this.addMessage(welcomeMsg, 'bot');
      this.showSuggestions();
    }

    showSuggestions() {
      const suggestionsContainer = document.getElementById('chatbotSuggestions');
      if (!suggestionsContainer) return;

      const suggestions = [
        "Quels sont tes projets ?",
        "Tes compétences techniques ?",
        "Ton expérience professionnelle ?",
        "Tes certifications ?",
        "Comment te contacter ?"
      ];

      suggestionsContainer.innerHTML = suggestions
        .map(q => `<button class="suggestion-btn">${q}</button>`)
        .join('');

      suggestionsContainer.querySelectorAll('.suggestion-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const input = document.getElementById('chatbotInput');
          if (input) {
            input.value = btn.textContent;
            this.sendMessage();
          }
        });
      });
    }

    hideSuggestions() {
      const container = document.getElementById('chatbotSuggestions');
      if (container) container.innerHTML = '';
    }

    async sendMessage() {
      const input = document.getElementById('chatbotInput');
      if (!input) return;

      const message = input.value.trim();
      if (!message || this.isTyping) return;

      this.addMessage(message, 'user');
      this.conversationHistory.push({ role: 'user', content: message });

      input.value = '';
      input.style.height = 'auto';

      this.hideSuggestions();
      this.showTypingIndicator();

      try {
        const response = await chat(message, this.conversationHistory);
        
        this.hideTypingIndicator();
        this.addMessage(response, 'bot');
        this.conversationHistory.push({ role: 'assistant', content: response });

      } catch (error) {
        console.error('Erreur:', error);
        this.hideTypingIndicator();
        this.addMessage('Désolé, erreur. Réessayez !', 'bot');
      }
    }

    addMessage(text, sender) {
      const messagesContainer = document.getElementById('chatbotMessages');
      if (!messagesContainer) return;

      const messageDiv = document.createElement('div');
      messageDiv.className = `chatbot-message ${sender}-message`;

      const avatar = sender === 'bot' 
        ? '<div class="message-avatar"><i class="uil uil-robot"></i></div>'
        : '<div class="message-avatar"><i class="uil uil-user"></i></div>';

      const formattedText = this.formatMessage(text);

      messageDiv.innerHTML = `
        ${avatar}
        <div class="message-content">
          <div class="message-bubble">${formattedText}</div>
          <span class="message-time">${this.getCurrentTime()}</span>
        </div>
      `;

      messagesContainer.appendChild(messageDiv);
      
      setTimeout(() => {
        messagesContainer.scrollTo({
          top: messagesContainer.scrollHeight,
          behavior: 'smooth'
        });
      }, 100);
    }

    formatMessage(text) {
      text = text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
      text = text.replace(/\n/g, '<br>');
      text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
      return text;
    }

    showTypingIndicator() {
      this.isTyping = true;
      const messagesContainer = document.getElementById('chatbotMessages');
      if (!messagesContainer) return;

      const typingDiv = document.createElement('div');
      typingDiv.className = 'chatbot-message bot-message typing-indicator';
      typingDiv.id = 'typingIndicator';
      typingDiv.innerHTML = `
        <div class="message-avatar"><i class="uil uil-robot"></i></div>
        <div class="message-content">
          <div class="message-bubble">
            <div class="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      `;
      messagesContainer.appendChild(typingDiv);
      messagesContainer.scrollTo({
        top: messagesContainer.scrollHeight,
        behavior: 'smooth'
      });
    }

    hideTypingIndicator() {
      this.isTyping = false;
      const typingIndicator = document.getElementById('typingIndicator');
      if (typingIndicator) typingIndicator.remove();
    }

    getCurrentTime() {
      const now = new Date();
      return now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    }

    clearConversation() {
      if (confirm('Effacer la conversation ?')) {
        this.conversationHistory = [];
        const messagesContainer = document.getElementById('chatbotMessages');
        if (messagesContainer) messagesContainer.innerHTML = '';
        this.showWelcomeMessage();
      }
    }
  }

  // Initialiser le chatbot
  window.portfolioChatbot = new PortfolioChatbot();

})();
