export const cafeBoards = [
  { id: "music", title: "Music", icon: "fa-music", desc: "Share your favorite tunes." },
  { id: "books", title: "Books", icon: "fa-book", desc: "Book recommendations & reviews." },
  { id: "life", title: "Life", icon: "fa-mug-hot", desc: "Casual daily chat." },
  { id: "hobbies", title: "Hobbies", icon: "fa-palette", desc: "Art, gaming, travel, etc." }
];

export const cafeGroups = [
  { id: "coffee-lovers", title: "Coffee Lovers", members: 1240, icon: "fa-mug-saucer", type: "Public" },
  { id: "book-club", title: "Weekend Book Club", members: 580, icon: "fa-book-open", type: "Public" },
  { id: "travel-gram", title: "Travel Gram", members: 3200, icon: "fa-plane", type: "Public" }
];

export const cafeThreads = [
  {
    id: 1,
    boardId: "music",
    title: "Best Lo-Fi playlists for coding?",
    author: "CodeChill",
    replies: 12,
    views: 340,
    date: "2025-11-28",
    content: "I'm looking for some new background music for deep work sessions. Any recommendations?",
    comments: [
      { author: "DevBeats", date: "2 hours ago", content: "Check out 'Lofi Girl' on YouTube, it's a classic." },
      { author: "JazzCat", date: "1 hour ago", content: "I prefer instrumental Jazz. 'Coffee Shop Jazz' playlists are great." }
    ]
  },
  {
    id: 2,
    boardId: "life",
    title: "What's your favorite coffee spot in Tokyo?",
    author: "CafeHopper",
    replies: 45,
    views: 1200,
    date: "2025-11-27",
    content: "I'm visiting Tokyo next week and want to find some hidden gems. Not the big chains!",
    comments: [
      { author: "TokyoLocal", date: "1 day ago", content: "Try 'Glitch Coffee' in Jimbocho. Amazing single origin beans." },
      { author: "EspressoLover", date: "1 day ago", content: "Blue Bottle is popular, but 'Koffee Mameya' is a unique experience." }
    ]
  },
  {
    id: 3,
    boardId: "books",
    title: "Just finished 'Project Hail Mary' - Wow!",
    author: "SciFiFan",
    replies: 8,
    views: 210,
    date: "2025-11-26",
    content: "The ending was so satisfying. Has anyone else read it? No spoilers please!",
    comments: [
      { author: "ReaderOne", date: "2 days ago", content: "Yes! Rocky is the best character ever." }
    ]
  },
  {
    id: 4,
    boardId: "hobbies",
    title: "Anyone into film photography?",
    author: "AnalogSoul",
    replies: 22,
    views: 560,
    date: "2025-11-25",
    content: "I just bought an old Canon AE-1. Any tips for a beginner?",
    comments: [
      { author: "PhotoGuru", date: "3 days ago", content: "Start with ISO 400 film, it's versatile. And don't forget to focus!" }
    ]
  }
];
