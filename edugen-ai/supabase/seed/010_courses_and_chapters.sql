-- Seed Courses and Chapters for EduGen AI

-- ============================================
-- HIGH SCHOOL COURSES (NCERT Class 11-12)
-- ============================================

-- Physics High School
INSERT INTO public.courses (title, description, subject, level, category, is_ncert, total_chapters, is_published) VALUES
('Physics Class 12 (NCERT)', 'NCERT Physics for Class 12 students covering Electrostatics, Magnetism, Optics, and Modern Physics', 'Physics', 'high_school', 'Science', true, 14, true),
('Physics Class 11 (NCERT)', 'NCERT Physics for Class 11 students covering Laws of Motion, Work-Energy, Gravitation, and more', 'Physics', 'high_school', 'Science', true, 15, true);

-- Chemistry High School
INSERT INTO public.courses (title, description, subject, level, category, is_ncert, total_chapters, is_published) VALUES
('Chemistry Class 12 (NCERT)', 'NCERT Chemistry for Class 12 covering Organic, Inorganic, and Physical Chemistry', 'Chemistry', 'high_school', 'Science', true, 16, true),
('Chemistry Class 11 (NCERT)', 'NCERT Chemistry for Class 11 covering Basic Chemistry concepts', 'Chemistry', 'high_school', 'Science', true, 14, true);

-- Mathematics High School
INSERT INTO public.courses (title, description, subject, level, category, is_ncert, total_chapters, is_published) VALUES
('Mathematics Class 12 (NCERT)', 'NCERT Mathematics for Class 12 covering Calculus, Algebra, Vectors, and Probability', 'Mathematics', 'high_school', 'Science', true, 13, true),
('Mathematics Class 11 (NCERT)', 'NCERT Mathematics for Class 11 covering Trigonometry, Coordinate Geometry, and more', 'Mathematics', 'high_school', 'Science', true, 16, true);

-- Biology High School
INSERT INTO public.courses (title, description, subject, level, category, is_ncert, total_chapters, is_published) VALUES
('Biology Class 12 (NCERT)', 'NCERT Biology for Class 12 covering Genetics, Evolution, Ecology, and Human Physiology', 'Biology', 'high_school', 'Science', true, 16, true);

-- ============================================
-- COLLEGE COURSES
-- ============================================

-- Programming Courses
INSERT INTO public.courses (title, description, subject, level, category, is_ncert, total_chapters, is_published) VALUES
('Python Programming', 'Complete Python programming from basics to advanced concepts including OOP, File handling, and libraries', 'Python', 'college', 'Programming', false, 12, true),
('JavaScript Fundamentals', 'Modern JavaScript covering ES6+, DOM manipulation, Async programming, and Node.js basics', 'JavaScript', 'college', 'Programming', false, 10, true),
('SQL & Databases', 'Complete SQL course covering queries, joins, subqueries, and database design principles', 'SQL', 'college', 'Programming', false, 8, true);

-- Data Science & AI
INSERT INTO public.courses (title, description, subject, level, category, is_ncert, total_chapters, is_published) VALUES
('Data Structures & Algorithms', 'DSA fundamentals covering Arrays, Linked Lists, Trees, Graphs, Sorting, and Searching algorithms', 'DSA', 'college', 'Computer Science', false, 15, true),
('Machine Learning Basics', 'Introduction to ML covering Supervised Learning, Unsupervised Learning, Neural Networks basics', 'Machine Learning', 'college', 'Data Science', false, 10, true);

-- Web Development
INSERT INTO public.courses (title, description, subject, level, category, is_ncert, total_chapters, is_published) VALUES
('React.js Fundamentals', 'Complete React course covering Components, Hooks, State management, and Next.js basics', 'React', 'college', 'Web Development', false, 8, true),
('Full Stack Web Development', 'MERN Stack development covering MongoDB, Express, React, and Node.js', 'Web Dev', 'college', 'Web Development', false, 12, true);

-- Design
INSERT INTO public.courses (title, description, subject, level, category, is_ncert, total_chapters, is_published) VALUES
('UI/UX Design Fundamentals', 'Learn design thinking, wireframing, prototyping, and using Figma for modern UI design', 'Design', 'college', 'Design', false, 8, true);

-- ============================================
-- CHAPTERS FOR PHYSICS CLASS 12
-- ============================================

-- Get Physics Class 12 course ID
DO $$
DECLARE
    physics_12_id UUID;
    physics_11_id UUID;
    chem_12_id UUID;
    math_12_id UUID;
    python_id UUID;
    js_id UUID;
    sql_id UUID;
    dsa_id UUID;
    ml_id UUID;
    react_id UUID;
BEGIN
    SELECT id INTO physics_12_id FROM courses WHERE title = 'Physics Class 12 (NCERT)' LIMIT 1;
    SELECT id INTO physics_11_id FROM courses WHERE title = 'Physics Class 11 (NCERT)' LIMIT 1;
    SELECT id INTO chem_12_id FROM courses WHERE title = 'Chemistry Class 12 (NCERT)' LIMIT 1;
    SELECT id INTO math_12_id FROM courses WHERE title = 'Mathematics Class 12 (NCERT)' LIMIT 1;
    SELECT id INTO python_id FROM courses WHERE title = 'Python Programming' LIMIT 1;
    SELECT id INTO js_id FROM courses WHERE title = 'JavaScript Fundamentals' LIMIT 1;
    SELECT id INTO sql_id FROM courses WHERE title = 'SQL & Databases' LIMIT 1;
    SELECT id INTO dsa_id FROM courses WHERE title = 'Data Structures & Algorithms' LIMIT 1;
    SELECT id INTO ml_id FROM courses WHERE title = 'Machine Learning Basics' LIMIT 1;
    SELECT id INTO react_id FROM courses WHERE title = 'React.js Fundamentals' LIMIT 1;
    
    -- Physics Class 12 Chapters
    INSERT INTO public.chapters (course_id, title, description, chapter_number, duration_minutes, is_free) VALUES
    (physics_12_id, 'Electric Charges and Fields', 'Understanding electric charges, Coulomb''s law, electric field, and Gauss''s law', 1, 180, true),
    (physics_12_id, 'Electrostatic Potential and Capacitance', 'Electric potential, capacitance, dielectrics, and energy storage', 2, 180, false),
    (physics_12_id, 'Current Electricity', 'Electric current, Ohm''s law, Kirchhoff''s laws, and circuits', 3, 200, false),
    (physics_12_id, 'Moving Charges and Magnetism', 'Magnetic effects of current, Biot-Savart law, and Ampere''s circuital law', 4, 180, false),
    (physics_12_id, 'Magnetism and Matter', 'Magnetic materials, earth''s magnetism, and hysteresis', 5, 120, false),
    (physics_12_id, 'Electromagnetic Induction', 'Faraday''s laws, Lenz''s law, and self-induction', 6, 180, false),
    (physics_12_id, 'Alternating Current', 'AC circuits, impedance, resonance, and power in AC circuits', 7, 150, false),
    (physics_12_id, 'Electromagnetic Waves', 'EM waves, electromagnetic spectrum, and properties', 8, 90, false),
    (physics_12_id, 'Ray Optics and Optical Instruments', 'Reflection, refraction, lenses, mirrors, and optical instruments', 9, 200, false),
    (physics_12_id, 'Wave Optics', 'Interference, diffraction, polarization, and Young''s experiment', 10, 180, false),
    (physics_12_id, 'Dual Nature of Radiation and Matter', 'Photoelectric effect, photon, de Broglie wavelength', 11, 150, false),
    (physics_12_id, 'Atoms', 'Atomic models, Bohr''s model, hydrogen spectrum', 12, 120, false),
    (physics_12_id, 'Nuclei', 'Nuclear structure, binding energy, radioactivity, fission and fusion', 13, 150, false),
    (physics_12_id, 'Semiconductor Electronics', 'Semiconductors, p-n junction, diodes, transistors', 14, 180, false);

    -- Python Programming Chapters
    INSERT INTO public.chapters (course_id, title, description, chapter_number, duration_minutes, is_free) VALUES
    (python_id, 'Introduction to Python', 'Setting up Python, first program, syntax basics', 1, 60, true),
    (python_id, 'Variables and Data Types', 'Numbers, strings, lists, tuples, dictionaries', 2, 120, false),
    (python_id, 'Operators and Expressions', 'Arithmetic, logical, comparison operators', 3, 60, false),
    (python_id, 'Control Flow', 'if-else, loops (for, while), break, continue', 4, 120, false),
    (python_id, 'Functions', 'Defining functions, arguments, return values, lambda', 5, 150, false),
    (python_id, 'Object-Oriented Programming', 'Classes, objects, inheritance, polymorphism', 6, 180, false),
    (python_id, 'File Handling', 'Reading, writing files, working with JSON, CSV', 7, 120, false),
    (python_id, 'Error Handling', 'Try-except, custom exceptions, debugging', 8, 90, false),
    (python_id, 'Modules and Packages', 'Import, pip, creating modules, virtual environments', 9, 90, false),
    (python_id, 'NumPy and Pandas', 'Introduction to data science libraries', 10, 180, false),
    (python_id, 'Python Projects', 'Building real-world projects', 11, 240, false),
    (python_id, 'Interview Preparation', 'Common interview questions and solutions', 12, 180, false);

    -- SQL & Databases Chapters
    INSERT INTO public.chapters (course_id, title, description, chapter_number, duration_minutes, is_free) VALUES
    (sql_id, 'Introduction to Databases', 'What are databases, SQL vs NoSQL, RDBMS concepts', 1, 60, true),
    (sql_id, 'Basic SQL Queries', 'SELECT, WHERE, ORDER BY, LIMIT', 2, 90, false),
    (sql_id, 'Filtering and Operators', 'AND, OR, NOT, IN, BETWEEN, LIKE', 3, 90, false),
    (sql_id, 'Aggregation Functions', 'COUNT, SUM, AVG, MIN, MAX, GROUP BY, HAVING', 4, 120, false),
    (sql_id, 'Joins', 'INNER, LEFT, RIGHT, FULL joins', 5, 150, false),
    (sql_id, 'Subqueries', 'Nested queries, correlated subqueries', 6, 120, false),
    (sql_id, 'Database Design', 'Normalization, primary keys, foreign keys', 7, 120, false),
    (sql_id, 'Advanced SQL', 'Views, stored procedures, transactions', 8, 150, false);

    -- DSA Chapters
    INSERT INTO public.chapters (course_id, title, description, chapter_number, duration_minutes, is_free) VALUES
    (dsa_id, 'Arrays', '1D arrays, 2D arrays, array operations', 1, 120, true),
    (dsa_id, 'Linked Lists', 'Singly, doubly, circular linked lists', 2, 180, false),
    (dsa_id, 'Stacks and Queues', 'Stack operations, queue types, applications', 3, 150, false),
    (dsa_id, 'Trees', 'Binary trees, BST, tree traversals', 4, 200, false),
    (dsa_id, 'Heaps', 'Min-heap, max-heap, priority queues', 5, 150, false),
    (dsa_id, 'Graphs', 'Graph representation, BFS, DFS', 6, 200, false),
    (dsa_id, 'Sorting Algorithms', 'Bubble, selection, insertion, merge, quick sort', 7, 180, false),
    (dsa_id, 'Searching Algorithms', 'Linear, binary search, hash tables', 8, 120, false),
    (dsa_id, 'Dynamic Programming', 'Memorization, tabulation, classic problems', 9, 240, false),
    (dsa_id, 'Greedy Algorithms', 'Fractional knapsack, Huffman coding', 10, 150, false),
    (dsa_id, 'String Algorithms', 'Pattern matching, string manipulation', 11, 150, false),
    (dsa_id, 'Bit Manipulation', 'Bit operations, bitwise algorithms', 12, 120, false),
    (dsa_id, 'Recursion', 'Backtracking, divide and conquer', 13, 180, false),
    (dsa_id, 'Interview Problems', 'Top 50 interview questions with solutions', 14, 300, false),
    (dsa_id, 'Complexity Analysis', 'Time and space complexity, Big O notation', 15, 120, false);

    -- React.js Chapters
    INSERT INTO public.chapters (course_id, title, description, chapter_number, duration_minutes, is_free) VALUES
    (react_id, 'Introduction to React', 'React basics, JSX, components', 1, 90, true),
    (react_id, 'State and Props', 'Managing component state, passing props', 2, 120, false),
    (react_id, 'React Hooks', 'useState, useEffect, useContext', 3, 180, false),
    (react_id, 'Conditional Rendering', 'Ternary, && operator, if-else patterns', 4, 60, false),
    (react_id, 'Lists and Keys', 'Mapping arrays, key prop importance', 5, 90, false),
    (react_id, 'Forms in React', 'Controlled inputs, form validation', 6, 120, false),
    (react_id, 'API Integration', 'fetch, axios, handling async data', 7, 150, false),
    (react_id, 'React Router', 'Navigation, dynamic routes, params', 8, 120, false);

END $$;

-- ============================================
-- SEED CAREERS DATA
-- ============================================
INSERT INTO public.careers (title, description, required_skills, recommended_subjects, growth_outlook, average_salary_range) VALUES
('Software Engineer', 'Design, develop, and maintain software applications', ARRAY['Programming', 'Problem Solving', 'Data Structures', 'Algorithms', 'Database Management'], ARRAY['Python', 'JavaScript', 'SQL'], 'Very High', '₹6-50+ LPA'),
('Full Stack Developer', 'Build complete web applications from front to back', ARRAY['JavaScript', 'React', 'Node.js', 'SQL', 'Git'], ARRAY['JavaScript', 'SQL', 'Web Dev'], 'Very High', '₹8-45 LPA'),
('Data Scientist', 'Analyze complex data to help organizations make decisions', ARRAY['Python', 'Statistics', 'Machine Learning', 'SQL', 'Data Visualization'], ARRAY['Python', 'DSA', 'SQL'], 'Very High', '₹8-40 LPA'),
('Machine Learning Engineer', 'Build and deploy ML models for applications', ARRAY['Python', 'Machine Learning', 'Deep Learning', 'Mathematics', 'Statistics'], ARRAY['Python', 'Machine Learning', 'DSA'], 'Extremely High', '₹12-60 LPA'),
('UI/UX Designer', 'Design user interfaces and experiences for apps/websites', ARRAY['Design Thinking', 'Figma', 'User Research', 'Prototyping', 'Visual Design'], ARRAY['Design'], 'High', '₹5-25 LPA'),
('DevOps Engineer', 'Manage infrastructure, CI/CD pipelines, and deployment', ARRAY['Linux', 'Docker', 'Kubernetes', 'AWS', 'CI/CD'], ARRAY['Python', 'SQL'], 'Very High', '₹10-45 LPA'),
('Backend Developer', 'Build server-side logic and APIs', ARRAY['Python', 'SQL', 'APIs', 'Git', 'Database Design'], ARRAY['Python', 'SQL', 'DSA'], 'Very High', '₹6-35 LPA'),
('Frontend Developer', 'Build user interfaces using modern frameworks', ARRAY['JavaScript', 'React', 'CSS', 'HTML', 'TypeScript'], ARRAY['JavaScript', 'Web Dev'], 'High', '₹5-30 LPA');
