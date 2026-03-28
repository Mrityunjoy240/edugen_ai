-- Seed NCERT Class 12 Chemistry chapters (structure)
INSERT INTO public.ncert_content (subject, chapter_number, chapter_title, content, key_topics) VALUES
('Chemistry', 1, 'Solid State',
'Solid state is characterized by definite shape, definite volume, and high density. Solids are of two types: crystalline and amorphous. Crystalline solids have a definite geometrical shape and an orderly arrangement of particles. Amorphous solids lack definite shape and arrangement. Unit cells are the smallest repeating units in a crystal lattice. There are seven crystal systems and fourteen Bravais lattices. Packing efficiency is the percentage of total space filled by the particles in a crystal. Defects in crystals affect their properties.',
ARRAY['Crystalline solids', 'Unit cell', 'Crystal lattice', 'Packing efficiency', 'Defects', 'Amorphous solids']),

('Chemistry', 2, 'Solutions',
'A solution is a homogeneous mixture of two or more components. The component present in the largest amount is the solvent, and the others are solutes. The concentration of a solution can be expressed in various ways: molarity, molality, mole fraction, mass percentage, and parts per million. Raoult''s law states that the partial vapor pressure of each component is directly proportional to its mole fraction. Colligative properties depend on the number of solute particles.',
ARRAY['Solutions', 'Concentration', 'Raoult''s law', 'Colligative properties', 'Osmosis', 'Abnormal molecular mass']),

('Chemistry', 3, 'Electrochemistry',
'Electrochemistry deals with the relationship between electricity and chemical reactions. Galvanic cells convert chemical energy into electrical energy. Electrolytic cells convert electrical energy into chemical energy. The SI unit of electrode potential is volt. The standard hydrogen electrode is used as a reference electrode. Nernst equation gives the relationship between electrode potential and concentration. Conductance is the reciprocal of resistance.',
ARRAY['Galvanic cell', 'Electrolytic cell', 'Electrode potential', 'Nernst equation', 'Conductance', 'Faraday''s laws']),

('Chemistry', 4, 'Chemical Kinetics',
'Chemical kinetics is the study of the rate of chemical reactions and the factors affecting them. The rate of a reaction is the change in concentration of reactants or products per unit time. Rate laws express the relationship between rate and concentration. The order of a reaction is the sum of the exponents in the rate law. Temperature affects the rate of reaction according to Arrhenius equation. Catalysts increase the rate of reaction without being consumed.',
ARRAY['Rate of reaction', 'Rate law', 'Order of reaction', 'Molecularity', 'Activation energy', 'Catalyst']),

('Chemistry', 5, 'Surface Chemistry',
'Surface chemistry deals with phenomena occurring at surfaces and interfaces. Adsorption is the accumulation of molecules on the surface. Physisorption involves weak van der Waals forces. Chemisorption involves chemical bond formation. Catalysis is the increase in rate of reaction due to the presence of a catalyst. Colloids are heterogeneous systems with particle size between 1-1000 nm. Colloids exhibit Tyndall effect.',
ARRAY['Adsorption', 'Catalysis', 'Colloids', 'Tyndall effect', 'Emulsions', 'Brownian motion']),

('Chemistry', 6, 'p-Block Elements',
'p-Block elements have their last electron in p-orbital. They include groups 13 to 18. Group 13 elements: B, Al, Ga, In, Tl. Group 14 elements: C, Si, Ge, Sn, Pb. Group 15 elements: N, P, As, Sb, Bi. Group 16 elements: O, S, Se, Te, Po. Group 17 elements: F, Cl, Br, I, At. Group 18 elements: He, Ne, Ar, Kr, Xe, Rn. Important trends: atomic size, ionization enthalpy, electronegativity, and metallic/non-metallic character.',
ARRAY['p-Block elements', 'Trends in periodic table', 'Allotropes', 'Oxoacids', 'Hydrides', 'Halides']),

('Chemistry', 7, 'd and f-Block Elements',
'd-Block elements are transition metals with incomplete d-orbitals. They show variable oxidation states, paramagnetism, and form colored complexes. f-Block elements include lanthanides and actinides. Lanthanides are elements with atomic numbers 57-71. Actinides are elements with atomic numbers 89-103. Inner transition elements show +3 oxidation state predominantly.',
ARRAY['Transition metals', 'Lanthanides', 'Actinides', 'Variable oxidation states', 'Coordination compounds', 'Magnetic properties']),

('Chemistry', 8, 'Coordination Compounds',
'Coordination compounds consist of a central metal atom/ion surrounded by ligands. The number of donor atoms attached to the central metal is the coordination number. Ligands can be monodentate, bidentate, or polydentate. Nomenclature of coordination compounds follows specific IUPAC rules. Isomerism is common in coordination compounds. Crystal field theory explains the bonding and properties of complexes.',
ARRAY['Coordination compounds', 'Ligands', 'Coordination number', 'Isomerism', 'Crystal field theory', 'Nomenclature']),

('Chemistry', 9, 'Haloalkanes and Haloarenes',
'Haloalkanes are alkyl halides with halogen atoms attached to sp³ carbon. Haloarenes have halogen attached to aryl carbon. Nucleophilic substitution reactions: SN1 and SN2 mechanisms. Elimination reactions: E1 and E2 mechanisms. Aryl halides are less reactive toward nucleophilic substitution due to resonance. Polyhalogen compounds have multiple halogen atoms.',
ARRAY['Haloalkanes', 'Haloarenes', 'Nucleophilic substitution', 'Elimination reactions', 'Methods of preparation', 'Uses']),

('Chemistry', 10, 'Alcohols, Phenols and Ethers',
'Alcohols contain -OH group attached to alkyl carbon. Phenols contain -OH attached to aryl carbon. Ethers have -O- bridge between two alkyl/aryl groups. Preparation methods include hydration of alkenes, Grignard reagents, and Williamson synthesis. Chemical reactions: oxidation, dehydration, esterification, and nucleophilic substitution.',
ARRAY['Alcohols', 'Phenols', 'Ethers', 'Preparation', 'Chemical reactions', 'Uses']),

('Chemistry', 11, 'Aldehydes, Ketones and Carboxylic Acids',
'Aldehydes have -CHO group at the end of carbon chain. Ketones have -CO- group in the middle. Carboxylic acids contain -COOH group. Nucleophilic addition reactions are characteristic of aldehydes and ketones. Reduction, oxidation, and condensation reactions are important. Carboxylic acids show acidic behavior due to resonance stabilization of carboxylate ion.',
ARRAY['Aldehydes', 'Ketones', 'Carboxylic acids', 'Nucleophilic addition', 'Reduction', 'Preparation methods']),

('Chemistry', 12, 'Amines',
'Amines are derivatives of ammonia with alkyl/aryl groups replacing hydrogen atoms. Primary amines have one alkyl/aryl group. Secondary amines have two alkyl/aryl groups. Tertiary amines have three alkyl/aryl groups. Methods of preparation include Hoffmann bromamide degradation and Gabriel phthalimide synthesis. Chemical reactions include acylation, alkylation, and diazotization.',
ARRAY['Amines', 'Classification', 'Preparation', 'Basicity', 'Diazotization', 'Reactions']),

('Chemistry', 13, 'Biomolecules',
'Biomolecules are organic molecules essential for life. Carbohydrates are polyhydroxy aldehydes or ketones. Proteins are polymers of amino acids linked by peptide bonds. Enzymes are biological catalysts that speed up biochemical reactions. Nucleic acids (DNA and RNA) carry genetic information. Vitamins are organic compounds required in small amounts for metabolic processes.',
ARRAY['Carbohydrates', 'Proteins', 'Enzymes', 'Nucleic acids', 'Vitamins', 'Hormones']);
