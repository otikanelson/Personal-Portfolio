// ═══════════════════════════════════════════════════════════════
// PROJECT DATA & INTERACTIONS
// ═══════════════════════════════════════════════════════════════

// Project data
const PROJECTS = {
    frebfit: {
        name: 'FREBFIT',
        subtitle: 'Fitness Application — FREBSON FITNESS',
        description: 'During my NIIT internship, I met trainers struggling to connect with clients beyond the gym. They had expertise but no platform. FREBFIT became my answer—a mobile fitness app that bridges that gap. Built with Java and Android Studio, it helps people find trainers, select workouts, and track progress. It was my first real dive into native Android, and it taught me that code isn\'t just logic—it\'s about solving real human problems.',
        rating: '5.0', downloads: '12', category: 'Health & Fitness',
        tags: ['Java', 'Android Studio', 'Material Design', 'UI/UX'],
        github: 'https://github.com/otikanelson',
        apk: null,
        icon: 'images/Frebfit Logo.png',
        screenshots: ['images/Frebfit_1.png', 'images/Frebfit_2.png', 'images/Frebfit_3.png', 'images/Frebfit_4.png']
    },
    duorecall: {
        name: 'DUO Recall',
        subtitle: 'Flashcard Learning — Spaced Repetition',
        description: 'I\'ve always been terrible at memorizing things—dates, formulas, vocabulary. Traditional study methods felt like punishment. DUO Recall was born from frustration: what if learning could be playful instead of painful? I built a flashcard app that makes studying feel like a game. Create custom decks, import from CSV, flip cards, track progress—all stored locally so your data stays yours. React Native made it cross-platform, but the real win was making something I actually wanted to use every day.',
        rating: '5.0', downloads: '12', category: 'Education',
        tags: ['React Native', 'Expo', 'AsyncStorage', 'TypeScript'],
        github: 'https://github.com/otikanelson',
        apk: 'https://drive.google.com/file/d/1C0Bod4CrO2ppkKc9EBZsSmCKYLP_mFHp/view?usp=sharing',
        icon: 'images/Recall Logo.png',
        screenshots: ['images/DuoRecall_1.jpeg', 'images/DuoRecall_2.jpeg', 'images/DuoRecall_3.jpeg', 'images/DuoRecall_4.jpeg', 'images/DuoRecall_5.jpeg', 'images/DuoRecall_6.jpeg', 'images/DuoRecall_7.jpeg']
    },
    ajosave: {
        name: 'AjoSave',
        subtitle: 'Cooperative Savings — Mobile App',
        description: 'In Nigeria, people have been saving together for generations—Ajo, Esusu, Adashe. It\'s communal, it\'s trusted, but it\'s all pen and paper. AjoSave brings that tradition into the digital age without losing its soul. Automated cycles, transparent ledgers, smart payouts—all designed for traders, artisans, and students who need financial tools that understand their reality. Built for Codefest Africa 2025, this mobile app proves that the best innovation doesn\'t replace culture—it honors it.',
        rating: '5.0', downloads: '12', category: 'Finance',
        tags: ['React Native', 'Expo', 'TypeScript', 'Fintech'],
        github: 'https://github.com/otikanelson',
        apk: 'https://drive.google.com/uc?export=download&id=1xSTyMBNdsgYiPUzAmjxscyUS477lXJ5o',
        icon: 'images/Ajosave Logo.png',
        screenshots: ['images/AjoMobile_1.jpeg', 'images/AjoMobile_2.jpeg', 'images/AjoMobile_3.jpeg', 'images/AjoMobile_4.jpeg', 'images/AjoMobile_5.jpeg', 'images/AjoMobile_6.jpeg', 'images/AjoMobile_7.jpeg']
    },
    insightory: {
        name: 'INSIGHTORY',
        subtitle: 'Predictive Inventory Management',
        description: 'Small businesses lose money not because they\'re careless, but because inventory management is impossibly hard. Stock too much, you waste capital. Stock too little, you lose customers. I watched my uncle\'s shop struggle with this, and INSIGHTORY was my attempt to level the playing field. Using TensorFlow and LSTM models, it predicts demand before it happens. Real-time analytics, smart forecasting—all in a mobile app small businesses can actually afford and understand. Machine learning isn\'t just for tech giants anymore.',
        rating: '5.0', downloads: '12', category: 'Business',
        tags: ['React Native', 'TensorFlow', 'Node.js', 'ML'],
        github: 'https://github.com/otikanelson/Insightory',
        apk: 'https://play.google.com/store/apps/details?id=com.son_the_nel.Inventory',
        icon: 'images/Insightory Logo.png',
        screenshots: ['images/Insightory_1.jpeg', 'images/Insightory_2.jpeg', 'images/Insightory_3.jpeg', 'images/Insightory_4.jpeg', 'images/Insightory_5.jpeg', 'images/Insightory_6.jpeg']
    },
    CFCFreight: {
        name: 'CFC Freight',
        subtitle: 'A freight and logistics management mobile application',
        description: 'CFC Freight is an app that connects shippers, carriers, and forwarders in real time. Automate quotes, track shipments, upload documents, monitor fleets. I was given the source code of the application and was paid to redesign it\'s entire frontend.',
        rating: '5.0', downloads: '12', category: 'Utility',
        tags: ['React Native', 'Typescript'],
        github: 'https://github.com/otikanelson/CFC freight',
        icon: 'images/CFC Freight Logo.jpeg',
        screenshots: ['images/CFC Freight_1.jpeg', 'images/CFC Freight_2.jpeg', 'images/CFC Freight_3.jpeg', 'images/CFC Freight_4.jpeg']
    },
    afrochinatrade: {
        name: 'AFROCHINATRADE',
        subtitle: 'International Trade Platform',
        description: 'Africa and China trade billions annually, but small businesses are locked out—too much red tape, too many middlemen. AfroChinaTrade was built to open those doors. A multi-tenant SaaS platform connecting African businesses directly to Chinese suppliers. Supplier listings, marketplace interactions, secure authentication, procurement workflows—all powered by Node.js and React Native. It\'s not just a platform; it\'s an equalizer. When small businesses can compete globally, everyone wins. Published on Google Play, 800+ downloads and counting.',
        rating: '5.0', downloads: '12', category: 'Business',
        tags: ['React Native', 'Node.js', 'Express', 'SaaS'],
        github: 'https://github.com/otikanelson/AfroChinaTrade',
        apk: 'https://play.google.com/store/apps/details?id=com.afrochinatrade_mobile.act_mobile',
        icon: 'images/AfroChinaTrade Logo.png',
        screenshots: ['images/AfroChinaTrade_1.jpeg', 'images/AfroChinaTrade_2.jpeg', 'images/AfroChinaTrade_3.jpeg', 'images/AfroChinaTrade_4.jpeg', 'images/AfroChinaTrade_5.jpeg', 'images/AfroChinaTrade_6.jpeg', 'images/AfroChinaTrade_7.jpeg', 'images/AfroChinaTrade_8.jpeg']
    },
    cfcwallet: {
        name: 'CFC Wallet',
        subtitle: 'Fintech Mobile Application',
        description: 'CFC Wallet is a fintech app for airtime, data, and utility payments in Nigeria. I was given the source code and was paid to redesign its entire frontend.',
        rating: '5.0', downloads: '12', category: 'Finance',
        tags: ['React Native', 'Expo', 'Payment Gateway', 'Fintech'],
        github: 'https://github.com/otikanelson/Wallet-App',
        apk: 'https://play.google.com/store/apps/details?id=com.cfc.walletapp',
        icon: 'images/CFC Logo.jpeg',
        screenshots: ['images/CFC wallet_1.jpeg', 'images/CFC wallet_2.jpeg', 'images/CFC wallet_3.jpeg', 'images/CFC wallet_4.jpeg', 'images/CFC wallet_5.jpeg', 'images/CFC wallet_6.jpeg']
    }
};

// Make PROJECTS available globally
window.PROJECTS = PROJECTS;

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PROJECTS };
}
