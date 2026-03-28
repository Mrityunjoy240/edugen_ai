-- Seed NCERT Class 12 Physics chapters (structure)
INSERT INTO public.ncert_content (subject, chapter_number, chapter_title, content, key_topics) VALUES
('Physics', 1, 'Electric Charges and Fields',
'Electric charge is a fundamental property of matter. There are two types of charges: positive and negative. Like charges repel each other and unlike charges attract each other. Charge is conserved in an isolated system. The SI unit of charge is coulomb (C). The smallest charge that can exist freely is the electronic charge e = 1.602 × 10⁻¹⁹ C. Coulomb''s law states that the force between two point charges is directly proportional to the product of their charges and inversely proportional to the square of the distance between them. The force is along the line joining the two charges. Electric field is the space around a charge in which its influence can be felt. Electric field intensity at a point is the force experienced by a unit positive charge placed at that point.',
ARRAY['Electric charge', 'Coulomb''s law', 'Electric field', 'Electric field intensity', 'Electric dipole', 'Gauss''s law']),

('Physics', 2, 'Electrostatic Potential and Capacitance',
'Electrostatic potential at a point is the amount of work done in moving a unit positive charge from infinity to that point against the electrostatic force. The SI unit of potential is volt. Potential difference between two points is the work done in moving a unit positive charge from one point to the other. A capacitor is a system of two conductors separated by an insulator (dielectric). The capacitance of a capacitor is defined as the ratio of the charge on either plate to the potential difference between the plates. The SI unit of capacitance is farad. Series and parallel combinations of capacitors are used to obtain desired capacitance values.',
ARRAY['Electric potential', 'Potential difference', 'Capacitance', 'Dielectrics', 'Energy stored in capacitor', 'Combination of capacitors']),

('Physics', 3, 'Current Electricity',
'Electric current is the flow of electric charge. The SI unit of current is ampere. Current density is the current per unit cross-sectional area. Ohm''s law states that at constant temperature, the current flowing through a conductor is directly proportional to the potential difference across its ends. Resistance is the opposition offered by a conductor to the flow of current. The SI unit of resistance is ohm. Resistivity is the property of a material that determines its resistance. Conductance is the reciprocal of resistance.',
ARRAY['Electric current', 'Ohm''s law', 'Resistance', 'Resistivity', 'Kirchhoff''s laws', 'Wheatstone bridge']),

('Physics', 4, 'Moving Charges and Magnetism',
'A moving charge produces both electric and magnetic fields. The magnetic field due to a moving charge is experienced in the region around it. A current-carrying conductor produces a magnetic field around it. The direction of the magnetic field is given by Maxwell''s right-hand thumb rule. The magnetic field due to a straight current-carrying wire is circular around the wire. Biot-Savart law gives the magnetic field at any point due to a current-carrying conductor. Ampere''s circuital law is useful for calculating magnetic field in symmetric situations.',
ARRAY['Magnetic field', 'Biot-Savart law', 'Ampere''s circuital law', 'Force on moving charge', 'Torque on current loop', 'Moving coil galvanometer']),

('Physics', 5, 'Magnetism and Matter',
'Every magnet has two poles: north and south. Like poles repel and unlike poles attract. The magnetic dipole moment is a vector quantity that points from south to north. The earth behaves like a magnet with its magnetic field approximately uniform near its surface. Magnetic materials are classified as diamagnetic, paramagnetic, and ferromagnetic. Ferromagnetic materials show hysteresis. The hysteresis curve shows the relationship between magnetic flux density and magnetic field intensity.',
ARRAY['Magnetic dipole', 'Magnetism', 'Earth''s magnetism', 'Magnetic materials', 'Hysteresis', 'Curie temperature']),

('Physics', 6, 'Electromagnetic Induction',
'Electromagnetic induction is the phenomenon of producing an electromotive force across a conductor when exposed to a varying magnetic field. Faraday''s laws of electromagnetic induction state that the magnitude of induced EMF is directly proportional to the rate of change of magnetic flux. Lenz''s law states that the direction of induced current is such that it opposes the change that caused it. Eddy currents are currents induced in conductors when the magnetic flux through them changes. Self-induction is the phenomenon of inducing EMF in a coil due to change of current in the same coil.',
ARRAY['Magnetic flux', 'Faraday''s laws', 'Lenz''s law', 'Self-induction', 'Mutual induction', 'Eddy currents']),

('Physics', 7, 'Alternating Current',
'An alternating current is one that reverses direction periodically. The frequency of AC is the number of cycles per second. The root mean square (RMS) value of AC is the effective value of AC. AC circuits contain resistance, inductance, and capacitance. The opposition offered by any component to the flow of AC is called impedance. Resonance occurs when the inductive reactance equals the capacitive reactance. Power in AC circuits can be real, reactive, or apparent.',
ARRAY['AC generator', 'RMS value', 'AC circuits', 'Impedance', 'Resonance', 'Power factor']),

('Physics', 8, 'Electromagnetic Waves',
'An electromagnetic wave consists of oscillating electric and magnetic fields perpendicular to each other and to the direction of propagation. EM waves do not require a medium for propagation. The speed of EM waves in vacuum is 3 × 10⁸ m/s. The electromagnetic spectrum includes radio waves, microwaves, infrared radiation, visible light, ultraviolet radiation, X-rays, and gamma rays in order of increasing frequency.',
ARRAY['EM waves', 'Electromagnetic spectrum', 'Properties of EM waves', 'Speed of light', 'Displacement current']),

('Physics', 9, 'Ray Optics and Optical Instruments',
'Ray optics deals with the propagation of light in terms of rays. Reflection is the bouncing back of light when it hits a surface. The laws of reflection state that the angle of incidence equals the angle of reflection and the incident ray, reflected ray, and normal lie in the same plane. Refraction is the bending of light when it passes from one medium to another. Total internal reflection occurs when light travels from a denser to a rarer medium and the angle of incidence exceeds the critical angle.',
ARRAY['Reflection', 'Refraction', 'Total internal reflection', 'Lenses', 'Mirrors', 'Optical instruments']),

('Physics', 10, 'Wave Optics',
'Wave optics deals with the wave nature of light. Huygens'' principle states that every point on a wavefront is a source of secondary wavelets. Interference is the phenomenon of superposition of two or more waves. Young''s double-slit experiment demonstrates the interference of light. Diffraction is the bending of light around obstacles. Polarization is the phenomenon of restricting the vibrations of light waves to one direction.',
ARRAY['Huygens'' principle', 'Interference', 'Young''s double-slit experiment', 'Diffraction', 'Polarization', 'Coherent sources']),

('Physics', 11, 'Dual Nature of Radiation and Matter',
'The photoelectric effect demonstrates the particle nature of light. Einstein''s photoelectric equation explains the kinetic energy of emitted electrons. The work function is the minimum energy required to eject an electron from a metal surface. The de Broglie hypothesis states that matter has wave-like properties. The wavelength of matter waves is inversely proportional to the momentum of the particle.',
ARRAY['Photoelectric effect', 'Einstein''s equation', 'Work function', 'de Broglie wavelength', 'Wave-particle duality', 'Photon']),

('Physics', 12, 'Atoms',
'Atomic models have evolved from Thomson''s model to Rutherford''s nuclear model to Bohr''s model. Bohr''s model explains the stability of atoms and spectral lines. The hydrogen spectrum consists of various series like Lyman, Balmer, Paschen, etc. Each series corresponds to transitions from higher energy levels to a lower energy level. Atomic energy levels are quantized.',
ARRAY['Atomic models', 'Bohr''s model', 'Hydrogen spectrum', 'Energy levels', 'Spectral lines', 'Excitation and ionization']),

('Physics', 13, 'Nuclei',
'The nucleus consists of protons and neutrons. The atomic number Z is the number of protons, and the mass number A is the total number of protons and neutrons. Isotopes have the same Z but different A. Isobars have the same A but different Z. Nuclear binding energy is the energy required to separate a nucleus into its constituent nucleons. Nuclear forces are short-range forces that hold nucleons together.',
ARRAY['Nuclear structure', 'Binding energy', 'Radioactivity', 'Nuclear reactions', 'Fission and fusion', 'Nuclear force']),

('Physics', 14, 'Semiconductor Electronics',
'Semiconductors have resistivity between conductors and insulators. Intrinsic semiconductors are pure semiconductors. Doping creates extrinsic semiconductors with extra electrons (n-type) or holes (p-type). A p-n junction is the basis for diodes, transistors, and other semiconductor devices. Rectifiers convert AC to DC. Transistors can be used as amplifiers and switches.',
ARRAY['Semiconductors', 'p-n junction', 'Diode', 'Transistor', 'Logic gates', 'Semiconductor devices']);
