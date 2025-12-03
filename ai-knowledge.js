export const knowledgeBase = [
  // --- GREETINGS & GENERAL ---
  {
    keywords: ["hello", "hi", "hey", "greetings", "good morning", "good afternoon"],
    response: "Hello! Welcome to TOVA. I'm your AI assistant. How can I help you optimize your logistics today?",
    category: "general"
  },
  {
    keywords: ["who are you", "what are you", "your name"],
    response: "I am TOVA AI, a virtual assistant designed to help you navigate our logistics platform and answer your questions.",
    category: "general"
  },
  {
    keywords: ["thank", "thanks", "appreciate"],
    response: "You're very welcome! Let me know if there's anything else I can do for you.",
    category: "general"
  },
  {
    keywords: ["bye", "goodbye", "see you"],
    response: "Goodbye! Have a productive day. Come back anytime!",
    category: "general"
  },

  // --- TOVA SERVICES ---
  {
    keywords: ["register", "signup", "sign up", "account", "create"],
    response: "You can create a new account or manage user registrations via our **Register System**. It's fast, secure, and free to start.",
    category: "service"
  },
  {
    keywords: ["login", "sign in", "log in", "password", "cant login"],
    response: "To log in, click the 'Log In' button on the top right. If you forgot your password, please contact support or use the reset link on the login page.",
    category: "service"
  },
  {
    keywords: ["schedule", "calendar", "task", "todo", "plan"],
    response: "Our **Schedule App** helps you manage warehouse shifts and delivery tasks efficiently. You can access it from the dashboard.",
    category: "service"
  },
  {
    keywords: ["map", "location", "tracking", "gps", "vehicle"],
    response: "The **Map** section allows you to visualize warehouse locations and track vehicles in real-time. Check it out in the navigation menu!",
    category: "service"
  },
  {
    keywords: ["blog", "news", "article", "read"],
    response: "Our **Blog** features expert columns, case studies, and tech updates. It's a great place to learn about the latest logistics trends.",
    category: "service"
  },
  {
    keywords: ["cafe", "community", "forum", "chat", "discuss"],
    response: "The **TOVA Cafe** is our community space. You can join discussions, ask questions, and network with other logistics professionals.",
    category: "service"
  },

  // --- LOGISTICS TOPICS ---
  {
    keywords: ["wms", "warehouse management"],
    response: "WMS (Warehouse Management System) is core to TOVA. We provide tools to track inventory, manage space, and optimize picking routes.",
    category: "logistics"
  },
  {
    keywords: ["scm", "supply chain"],
    response: "Supply Chain Management (SCM) involves the flow of goods and data. TOVA aims to streamline this entire process from factory to doorstep.",
    category: "logistics"
  },
  {
    keywords: ["inventory", "stock", "count"],
    response: "Real-time inventory tracking is available in your dashboard. You can set low-stock alerts and automate reordering.",
    category: "logistics"
  },
  {
    keywords: ["shipping", "delivery", "transport"],
    response: "We support multi-modal transport management. You can optimize delivery routes and track shipment status in the Map section.",
    category: "logistics"
  },

  // --- PRICING & SUPPORT ---
  {
    keywords: ["price", "cost", "fee", "subscription", "plan"],
    response: "TOVA offers a free tier for startups. For enterprise features like advanced analytics and unlimited users, please check our Pricing page or contact sales.",
    category: "business"
  },
  {
    keywords: ["support", "help", "contact", "error", "bug"],
    response: "If you're facing issues, you can reach our support team at **support@tova.inc**. We're available 24/7.",
    category: "business"
  },

  // --- FUN / EASTER EGGS ---
  {
    keywords: ["joke", "funny"],
    response: "Why did the scarecrow become a successful logistics manager? Because he was outstanding in his field! 🌾",
    category: "fun"
  },
  {
    keywords: ["love", "like you"],
    response: "That's sweet! I love helping you optimize your logistics operations. 💙",
    category: "fun"
  }
];

export const defaultResponse = "I'm not sure I understand that yet. Could you try asking about **registration**, **maps**, **schedules**, or **WMS**? I'm still learning!";
