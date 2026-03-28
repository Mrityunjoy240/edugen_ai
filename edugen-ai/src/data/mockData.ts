export const mockCourses = [
  { id: "1", title: "Python for Beginners", level: "Beginner", progress: 72, image: "coding" },
  { id: "2", title: "Data Science Fundamentals", level: "Intermediate", image: "data", progress: 45 },
  { id: "3", title: "UI/UX Design Mastery", level: "Beginner", image: "design", progress: 30 },
  { id: "4", title: "Digital Marketing 101", level: "Intermediate", image: "marketing", progress: 10 },
];

export const mockQuizQuestions = {
  easy: [
    { q: "What does HTML stand for?", options: ["HyperText Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyper Transfer Markup Language"], answer: 0 },
    { q: "Which tag is used for the largest heading in HTML?", options: ["<h6>", "<heading>", "<h1>", "<head>"], answer: 2 },
    { q: "What does CSS stand for?", options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style System", "Colorful Style Sheets"], answer: 1 },
  ],
  medium: [
    { q: "Which Python keyword is used to define a function?", options: ["function", "func", "def", "define"], answer: 2 },
    { q: "What is the time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n²)", "O(1)"], answer: 1 },
    { q: "Which SQL clause is used to filter results?", options: ["FILTER", "WHERE", "HAVING", "SELECT"], answer: 1 },
  ],
  hard: [
    { q: "What design pattern does React's Context API implement?", options: ["Observer", "Singleton", "Provider", "Factory"], answer: 2 },
    { q: "In Big-O notation, what is the complexity of merge sort?", options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"], answer: 1 },
    { q: "Which HTTP method is idempotent?", options: ["POST", "PATCH", "PUT", "None"], answer: 2 },
  ],
};

export const mockCareerPaths = [
  {
    career: "Full-Stack Developer",
    match: 92,
    skills: ["JavaScript", "React", "Node.js", "SQL", "Git"],
    path: ["Learn HTML/CSS basics", "Master JavaScript", "Build React projects", "Learn backend with Node.js", "Deploy full-stack apps"],
    tools: ["VS Code", "Git", "Docker", "PostgreSQL", "Vercel"],
  },
  {
    career: "Data Scientist",
    match: 85,
    skills: ["Python", "Statistics", "Machine Learning", "SQL", "Data Visualization"],
    path: ["Learn Python fundamentals", "Study statistics & probability", "Master pandas & NumPy", "Build ML models", "Create data dashboards"],
    tools: ["Python", "Jupyter", "SQL", "Tableau", "TensorFlow"],
  },
  {
    career: "UX Designer",
    match: 78,
    skills: ["User Research", "Wireframing", "Prototyping", "Visual Design", "Usability Testing"],
    path: ["Study design principles", "Learn Figma", "Practice wireframing", "Build a portfolio", "Conduct user tests"],
    tools: ["Figma", "Adobe XD", "Miro", "Maze", "Hotjar"],
  },
];

export const mockLessonPlan = `# Lesson Plan: Introduction to Python Programming

## Duration: 60 minutes

### Learning Objectives
- Understand what Python is and why it's popular
- Write and run basic Python programs
- Use variables, data types, and simple operations

### Warm-Up (5 min)
- Ask students: "What apps or websites do you use daily?"
- Reveal that many use Python (Instagram, Spotify, Netflix)

### Main Content (35 min)

**Part 1: What is Python? (10 min)**
- Brief history and use cases
- Setting up the environment (Google Colab)

**Part 2: Your First Program (10 min)**
- print("Hello, World!")
- Variables and data types (strings, integers, floats)
- Live coding demonstration

**Part 3: Simple Operations (15 min)**
- Arithmetic operators (+, -, *, /)
- String concatenation
- User input with input()

### Practice Activity (15 min)
- Students create a "Personal Info Card" program
- Program asks for name, age, favorite subject
- Displays formatted output

### Wrap-Up (5 min)
- Quick quiz (3 questions)
- Preview next lesson: Conditionals & Loops
- Homework: Modify the program to include more fields

### Assessment
- Participation in live coding
- Completion of practice activity
- Homework submission
`;

export const mockMentorResponses: Record<string, string> = {
  default: "That's a great question! Based on current industry trends, I'd recommend focusing on building practical projects alongside your coursework. This combination of theory and hands-on experience is what employers value most. Would you like me to suggest some specific project ideas?",
  career: "Career planning is crucial! I'd suggest starting with a self-assessment of your strengths and interests. Then, research industries that align with those. Build relevant skills through courses and projects. Network through communities and LinkedIn. Would you like me to create a personalized career roadmap?",
  learning: "Effective learning strategies include: 1) Spaced repetition for retention, 2) Active recall through practice problems, 3) Teaching concepts to others, 4) Building real projects. The key is consistency over intensity. Even 30 minutes of focused daily practice beats 5-hour weekend marathons.",
  coding: "For coding, I recommend the 'build-learn-build' approach: Start with a small project → hit a wall → learn the concept you need → apply it → repeat. This creates a natural learning loop. Also, reading other people's code on GitHub is underrated for learning patterns and best practices.",
};
