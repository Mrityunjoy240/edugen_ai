-- Seed NCERT Class 12 Mathematics chapters (structure)
INSERT INTO public.ncert_content (subject, chapter_number, chapter_title, content, key_topics) VALUES
('Mathematics', 1, 'Relations and Functions',
'Relations and functions are fundamental concepts in mathematics. A relation from set A to set B is a subset of A × B. A function is a relation where every element of A is associated with exactly one element of B. Types of relations: reflexive, symmetric, transitive, and equivalence relations. Types of functions: one-one (injective), onto (surjective), and bijective functions. Composite functions and invertible functions are important concepts.',
ARRAY['Relations', 'Functions', 'One-one and onto', 'Composite functions', 'Inverse functions', 'Binary operations']),

('Mathematics', 2, 'Inverse Trigonometric Functions',
'Inverse trigonometric functions are the inverse functions of trigonometric functions. The principal value branch is the range of inverse functions. sin⁻¹x, cos⁻¹x, tan⁻¹x, etc. are inverse trigonometric functions. Properties and graphs of inverse trigonometric functions are important. Composition of trigonometric functions and their inverses yields interesting identities.',
ARRAY['Inverse trig functions', 'Principal value branch', 'Properties', 'Graphs', 'Identities', 'Equations']),

('Mathematics', 3, 'Matrices',
'A matrix is a rectangular array of numbers arranged in rows and columns. Types of matrices: row, column, square, diagonal, scalar, identity, zero, symmetric, and skew-symmetric matrices. Operations on matrices: addition, subtraction, scalar multiplication, and matrix multiplication. Transpose of a matrix. Determinant of a square matrix. Inverse of a matrix using adjoint method.',
ARRAY['Matrices', 'Types of matrices', 'Matrix operations', 'Transpose', 'Determinants', 'Inverse of matrix']),

('Mathematics', 4, 'Determinants',
'Determinant is a scalar value associated with a square matrix. Properties of determinants help in evaluation. Determinant of a product of matrices equals the product of determinants. Minors and cofactors of elements. Area of triangle using determinants. Adjoint and inverse of a matrix. Solution of system of linear equations using Cramer''s rule and matrix method.',
ARRAY['Determinants', 'Properties', 'Minors and cofactors', 'Adjoint', 'Inverse', 'Cramer''s rule']),

('Mathematics', 5, 'Continuity and Differentiability',
'A function is continuous at a point if its limit exists and equals the function value. Differentiability implies continuity but not vice versa. Sum, product, quotient, and chain rules of differentiation. Derivatives of inverse trigonometric, exponential, logarithmic, and implicit functions. Logarithmic differentiation. Mean value theorems: Rolle''s theorem and Lagrange''s mean value theorem.',
ARRAY['Continuity', 'Differentiability', 'Differentiation rules', 'Mean value theorems', 'Applications', 'Chain rule']),

('Mathematics', 6, 'Application of Derivatives',
'Derivatives have many applications. Rate of change of quantities. Increasing and decreasing functions. Tangents and normals to curves. Approximation using differentials. Maxima and minima of functions. First derivative test and second derivative test for maxima and minima. Applications in optimization problems.',
ARRAY['Rate of change', 'Tangents and normals', 'Maxima and minima', 'Increasing/decreasing functions', 'Optimization', 'Approximation']),

('Mathematics', 7, 'Integrals',
'Integration is the reverse process of differentiation. Indefinite integrals are families of curves. Integration by substitution, partial fractions, and parts. Integration of trigonometric functions. Definite integrals using antiderivatives. Fundamental theorem of calculus. Properties of definite integrals. Evaluation of definite integrals using substitution and properties.',
ARRAY['Integration', 'Indefinite integrals', 'Definite integrals', 'Integration techniques', 'Fundamental theorem', 'Properties']),

('Mathematics', 8, 'Application of Integrals',
'Definite integrals have important applications. Area under curves using integration. Area between two curves. Area bounded by curves above and below x-axis. Area bounded by polar curves. Volume of solids of revolution. Applications in physics for finding center of mass and moment of inertia.',
ARRAY['Area under curves', 'Area between curves', 'Volume of revolution', 'Polar curves', 'Applications', 'Center of mass']),

('Mathematics', 9, 'Differential Equations',
'A differential equation contains derivatives of unknown functions. Order is the highest order derivative. Degree is the highest power of highest order derivative. Formation of differential equations. Solution of differential equations: variable separable, homogeneous equations, linear differential equations. Applications of differential equations in various fields.',
ARRAY['Differential equations', 'Order and degree', 'Formation', 'Solutions', 'Variable separable', 'Linear equations']),

('Mathematics', 10, 'Vector Algebra',
'Vectors have magnitude and direction. Types: zero, unit, parallel, antiparallel, equal vectors. Addition of vectors: triangle law, parallelogram law. Subtraction of vectors. Scalar (dot) product and vector (cross) product. Components of vectors. Section formula for internal and external division. Applications of vectors in geometry and physics.',
ARRAY['Vectors', 'Addition', 'Subtraction', 'Dot product', 'Cross product', 'Components']),

('Mathematics', 11, 'Three Dimensional Geometry',
'Three-dimensional geometry extends 2D concepts to space. Direction cosines and direction ratios. Equations of lines in space. Angle between two lines. Distance from a point to a line. Equations of planes. Angle between two planes. Distance from a point to a plane. Angle between a line and a plane. Shortest distance between two skew lines.',
ARRAY['3D geometry', 'Direction cosines', 'Lines in space', 'Planes', 'Angle between lines', 'Distance formulas']),

('Mathematics', 12, 'Linear Programming',
'Linear programming deals with optimization of linear functions subject to linear constraints. Feasible region is the intersection of half-planes. Corner point method for solving LPP. Graphical method for two-variable problems. Important terms: objective function, constraints, feasible solution, optimal solution. Applications in business, economics, and engineering.',
ARRAY['Linear programming', 'Objective function', 'Constraints', 'Feasible region', 'Optimization', 'Graphical method']),

('Mathematics', 13, 'Probability',
'Probability measures the likelihood of events. Types of events: simple, compound, mutually exclusive, exhaustive, independent. Conditional probability. Multiplication theorem on probability. Independent events. Bayes'' theorem. Random variables and their probability distributions. Mean and variance of random variables. Binomial and Poisson distributions.',
ARRAY['Probability', 'Conditional probability', 'Bayes theorem', 'Random variables', 'Binomial distribution', 'Poisson distribution']);
