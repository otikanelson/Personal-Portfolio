// ═══════════════════════════════════════════════════════════════
// PROJECT DATA & INTERACTIONS
// ═══════════════════════════════════════════════════════════════

// Project data
const PROJECTS = {
    frebfit: {
        name: 'FREBFIT',
        subtitle: 'Fitness Application — FREBSON FITNESS',
        description: 'Mobile fitness app built with Java and Android Studio featuring workout selection, trainer search, and survey features. Developed during NIIT internship to establish familiarity with Android development.',
        rating: '4.8', downloads: '500+', category: 'Health & Fitness',
        tags: ['Java', 'Android Studio', 'Material Design', 'UI/UX'],
        github: 'https://github.com/otikanelson',
        apk: null,
        icon: 'images/Frebfit Logo.png',
        screenshots: ['images/Frebfit_1.png', 'images/Frebfit_2.png', 'images/Frebfit_3.png', 'images/Frebfit_4.png']
    },
    volair: {
        name: 'VOLAIR',
        subtitle: 'Private Jet Booking — React Native',
        description: 'Cross-platform private jet booking app built with React Native, TypeScript, and Expo. Collaborated with senior developers on feature implementation, testing, and clean architecture design.',
        rating: '4.9', downloads: '1K+', category: 'Travel',
        tags: ['React Native', 'TypeScript', 'Expo', 'Clean Architecture'],
        github: 'https://github.com/otikanelson',
        apk: null,
        icon: 'images/Volair Logo.png',
        screenshots: ['images/Volair_1.png', 'images/Volair_2.png', 'images/Volair_3.png', 'images/Volair_4.png', 'images/Volair_5.png', 'images/Volair_6.png', 'images/Volair_7.png']
    },
    duorecall: {
        name: 'DUO Recall',
        subtitle: 'Flashcard Learning — Spaced Repetition',
        description: 'Mobile flashcard app for studying and memorizing content. Features custom deck creation, CSV import, interactive flip-card quiz mode, and progress tracking. Built with React Native and Expo with local data persistence.',
        rating: '4.7', downloads: '300+', category: 'Education',
        tags: ['React Native', 'Expo', 'AsyncStorage', 'TypeScript'],
        github: 'https://github.com/otikanelson',
        apk: 'https://drive.google.com/file/d/1C0Bod4CrO2ppkKc9EBZsSmCKYLP_mFHp/view?usp=sharing',
        icon: 'images/Recall Logo.png',
        screenshots: ['images/DuoRecall_1.jpeg', 'images/DuoRecall_2.jpeg', 'images/DuoRecall_3.jpeg', 'images/DuoRecall_4.jpeg', 'images/DuoRecall_5.jpeg', 'images/DuoRecall_6.jpeg', 'images/DuoRecall_7.jpeg']
    },
    trainbooking: {
        name: 'GRIM',
        subtitle: 'Train Booking UI — Travel Planning',
        description: 'Android UI project built during NIIT internship. Demonstrates native Android layout skills with search flows and booking confirmation screens using Java and Material Design.',
        rating: '4.5', downloads: '200+', category: 'Travel',
        tags: ['Java', 'Android Studio', 'XML Layouts', 'Material Design'],
        github: 'https://github.com/otikanelson',
        apk: null,
        icon: 'images/Grim Logo.png',
        screenshots: ['images/Grim_1.jpg', 'images/Grim_2.jpg', 'images/Grim_3.jpg', 'images/Grim_4.jpg']
    },
    ajosave: {
        name: 'AjoSave',
        subtitle: 'Cooperative Savings — Mobile App',
        description: 'Mobile version of the cooperative savings platform inspired by Africa\'s traditional thrift system. Features automated contribution cycles, transparent ledgers, and smart payout scheduling. Built with React Native and Expo for cross-platform experience.',
        rating: '4.6', downloads: '400+', category: 'Finance',
        tags: ['React Native', 'Expo', 'TypeScript', 'Fintech'],
        github: 'https://github.com/otikanelson',
        apk: 'https://drive.google.com/uc?export=download&id=1xSTyMBNdsgYiPUzAmjxscyUS477lXJ5o',
        icon: 'images/Ajosave Logo.png',
        screenshots: ['images/AjoMobile_1.jpeg', 'images/AjoMobile_2.jpeg', 'images/AjoMobile_3.jpeg', 'images/AjoMobile_4.jpeg', 'images/AjoMobile_5.jpeg', 'images/AjoMobile_6.jpeg', 'images/AjoMobile_7.jpeg']
    },
    insightory: {
        name: 'INSIGHTORY',
        subtitle: 'Predictive Inventory Management',
        description: 'Mobile app for predictive inventory management helping SMBs monitor stock levels and forecast demand. Features TensorFlow-based LSTM forecasting model, real-time analytics, and demand predictions. Built with React Native integrating machine learning for inventory optimization.',
        rating: '4.7', downloads: '600+', category: 'Business',
        tags: ['React Native', 'TensorFlow', 'Node.js', 'ML'],
        github: 'https://github.com/otikanelson',
        apk: 'https://play.google.com/store/apps/details?id=com.son_the_nel.Inventory',
        icon: 'images/Insightory Logo.png',
        screenshots: ['images/Insightory_1.jpeg', 'images/Insightory_2.jpeg', 'images/Insightory_3.jpeg', 'images/Insightory_4.jpeg', 'images/Insightory_5.jpeg', 'images/Insightory_6.jpeg']
    },
    CFCFreight: {
        name: 'CFC Freight',
        subtitle: 'A freight and logistics management mobile application',
        description: 'A digital logistics tool used to connect shippers, carriers, and freight forwarders. It manages the movement of goods in real time, automates repetitive tasks like generating quotes, and tracks shipments. Drivers and managers use these apps to coordinate pickups, upload documents, and monitor fleets from anywhere.',
        rating: '3.5', downloads: '200+', category: 'Utility',
        tags: ['React Native', 'Typescript'],
        github: 'https://github.com/otikanelson/CFC freight',
        icon: 'images/CFC Freight Logo.jpeg',
        screenshots: ['images/CFC Freight_1.jpeg', 'images/CFC Freight_2.jpeg', 'images/CFC Freight_3.jpeg', 'images/CFC Freight_4.jpeg']
    },
    afrochinatrade: {
        name: 'AFROCHINATRADE',
        subtitle: 'International Trade Platform',
        description: 'Multi-tenant SaaS mobile platform facilitating trade between African businesses and Chinese suppliers. Built scalable backend with Node.js and Express for supplier listings, marketplace interactions, user authentication, and procurement workflows. Supports independent multi-tenant environments within shared infrastructure.',
        rating: '4.8', downloads: '800+', category: 'Business',
        tags: ['React Native', 'Node.js', 'Express', 'SaaS'],
        github: 'https://github.com/otikanelson/AfroChinaTrade',
        apk: 'https://play.google.com/store/apps/details?id=com.afrochinatrade_mobile.act_mobile',
        icon: 'images/AfroChinaTrade Logo.png',
        screenshots: ['images/AfroChinaTrade_1.jpeg', 'images/AfroChinaTrade_2.jpeg', 'images/AfroChinaTrade_3.jpeg', 'images/AfroChinaTrade_4.jpeg', 'images/AfroChinaTrade_5.jpeg', 'images/AfroChinaTrade_6.jpeg', 'images/AfroChinaTrade_7.jpeg', 'images/AfroChinaTrade_8.jpeg']
    },
    cfcwallet: {
        name: 'CFC Wallet',
        subtitle: 'Fintech Mobile Application',
        description: 'Comprehensive mobile wallet application facilitating airtime, data, and utility bill payments for the Nigerian market. Architected and developed using React Native and Expo with secure integrations with payment gateways and service providers, ensuring transactional integrity and real-time balance synchronization.',
        rating: '4.9', downloads: '1.2K+', category: 'Finance',
        tags: ['React Native', 'Expo', 'Payment Gateway', 'Fintech'],
        github: 'https://github.com/otikanelson/Wallet-App',
        apk: null,
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
