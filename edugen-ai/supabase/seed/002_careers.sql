-- Seed career data for PCM students (Physics, Chemistry, Mathematics)
INSERT INTO public.careers (title, description, required_skills, recommended_subjects, growth_outlook, average_salary_range) VALUES
(
  'Software Engineer',
  'Design, develop, and maintain software applications and systems. Work with various programming languages and frameworks to create efficient solutions.',
  ARRAY['Programming', 'Problem Solving', 'Data Structures', 'Algorithms', 'Database Management', 'System Design'],
  ARRAY['Mathematics', 'Physics', 'Computer Science'],
  'Very High - One of the fastest-growing fields globally with increasing demand across all industries',
  '₹6-50+ LPA depending on experience and company'
),
(
  'Data Scientist',
  'Analyze complex data sets to help organizations make better decisions. Use statistical methods, machine learning, and programming to extract insights.',
  ARRAY['Statistics', 'Machine Learning', 'Programming (Python/R)', 'Data Visualization', 'Mathematics', 'Problem Solving'],
  ARRAY['Mathematics', 'Physics'],
  'Very High - Demand increasing as companies rely more on data-driven decisions',
  '₹8-40+ LPA depending on experience and domain'
),
(
  'Aerospace Engineer',
  'Design, develop, and test aircraft, spacecraft, satellites, and missiles. Create and maintain propulsion systems and aerodynamic configurations.',
  ARRAY['Physics', 'Mathematics', 'CAD Software', 'Thermodynamics', 'Material Science', 'Fluid Mechanics'],
  ARRAY['Physics', 'Mathematics', 'Chemistry'],
  'High - Growing with space exploration initiatives and commercial aviation expansion',
  '₹8-35 LPA in India, higher internationally'
),
(
  'Research Scientist (Physics)',
  'Conduct experiments and research to advance scientific knowledge in physics. Work in laboratories, universities, or research institutions.',
  ARRAY['Research Methods', 'Data Analysis', 'Physics Theory', 'Mathematics', 'Laboratory Skills', 'Critical Thinking'],
  ARRAY['Physics', 'Mathematics', 'Chemistry'],
  'Moderate to High - Depends on funding and research priorities',
  '₹6-25 LPA in academia, higher in private R&D'
),
(
  'Actuary',
  'Use mathematics, statistics, and financial theory to study uncertain future events, especially those concerned with insurance and pension programs.',
  ARRAY['Mathematics', 'Statistics', 'Financial Analysis', 'Risk Assessment', 'Programming', 'Problem Solving'],
  ARRAY['Mathematics', 'Physics'],
  'High - Consistently in demand for insurance, finance, and consulting firms',
  '₹10-50+ LPA with experience and certifications'
),
(
  'Electrical Engineer',
  'Design, develop, and test electrical equipment and systems including motors, communication systems, and power generation equipment.',
  ARRAY['Circuit Design', 'Electromagnetics', 'Mathematics', 'Physics', 'CAD Software', 'Problem Solving'],
  ARRAY['Physics', 'Mathematics'],
  'High - Essential for power, electronics, and telecommunications industries',
  '₹5-25 LPA depending on sector and experience'
),
(
  'Mechanical Engineer',
  'Design, develop, build, and test mechanical devices and systems including tools, engines, and machines.',
  ARRAY['CAD/CAE', 'Thermodynamics', 'Fluid Mechanics', 'Mathematics', 'Physics', 'Manufacturing Processes'],
  ARRAY['Physics', 'Mathematics'],
  'High - Widely needed across manufacturing, automotive, aerospace, and energy sectors',
  '₹5-20 LPA for freshers, higher with experience'
),
(
  'Quantitative Analyst (Quant)',
  'Use mathematical and statistical methods to analyze financial markets and develop trading strategies for banks and hedge funds.',
  ARRAY['Mathematics', 'Statistics', 'Programming', 'Financial Markets', 'Risk Management', 'Problem Solving'],
  ARRAY['Mathematics', 'Physics'],
  'Very High - High-paying field in finance with strong demand',
  '₹15-100+ LPA in investment banks and hedge funds'
),
(
  'Machine Learning Engineer',
  'Design and implement machine learning systems that can learn from data. Build and deploy AI models for various applications.',
  ARRAY['Machine Learning', 'Deep Learning', 'Programming (Python)', 'Mathematics', 'Statistics', 'Software Engineering'],
  ARRAY['Mathematics', 'Physics', 'Computer Science'],
  'Extremely High - One of the most in-demand roles in tech',
  '₹10-60+ LPA depending on company and expertise'
),
(
  'Civil Engineer',
  'Design, construct, and maintain infrastructure projects including roads, bridges, buildings, and water systems.',
  ARRAY['Structural Analysis', 'Geotechnical Engineering', 'Mathematics', 'Physics', 'CAD', 'Project Management'],
  ARRAY['Physics', 'Mathematics'],
  'High - Steady demand for infrastructure development',
  '₹5-20 LPA for freshers'
);

-- Note: Career embeddings will be generated via API when the app initializes
