/* =====================================================================
   PUBLICATIONS — single source of truth for publications.html and the
   "Selected papers" block on the home page.

   To add a paper, copy one entry and edit it. Newest first is nice but
   not required (the page sorts by year).

   Fields
     year      number
     authors   string, "Initial. Surname" separated by commas.
               Write "E. Penocchio*" when Emanuele is a corresponding
               author. Other corresponding authors are not marked.
               "E. Penocchio" is highlighted automatically.
     title     string
     journal   string (italicised on the page)
     details   volume, pages / article number
     doi       DOI without https://doi.org/  (or use url for non-DOI links)
     url       optional full link (preprints, proceedings)
     type      "article" | "review" | "preprint" | "notes"
     topics    any of: "thermo", "machines", "catalysis", "light",
               "simulation", "structure"
     note      optional one-liner (highlights, press)
     featured  true → appears in "Selected papers" on the home page
     image     picture shown next to the paper (home page and publications
               page); every published paper from 2019 on has one, preprints
               none. A graphical abstract or a figure of the paper (JPG,
               longest side 480 px), or our own drawing (SVG, 160 × 120,
               site colours).
     imageAlt  short description of the picture
     imageCredit  for pictures from the paper: "Graphical abstract, <journal year>"
               or "Fig. 1b, <journal year>" (shown on hover)
   ===================================================================== */
window.PUB_TOPICS = {
  thermo:     "Nonequilibrium thermodynamics",
  machines:   "Molecular machines & ratchets",
  catalysis:  "Transport & catalysis",
  light:      "Light-driven systems",
  simulation: "Simulations",
  structure:  "Molecular structure & spectroscopy"
};

window.PUBLICATIONS = [
  { year: 2026, type: "article",
    authors: "B. Remlein, L. Monari, B. Bartolomei, G. Ragazzon, M. Esposito, E. Penocchio*",
    title: "A minimal thermodynamically consistent chemical oscillator",
    journal: "J. Chem. Phys.", details: "165, 184102",
    doi: "10.1063/5.0357883",
    image: "assets/img/papers/2026-oscillator.svg", imageAlt: "A three-species reaction network fed by two chemostats, and the concentration oscillations it sustains",
    note: "In the 2026 JCP Emerging Investigators Special Collection",
    topics: ["thermo"] },

  { year: 2026, type: "preprint",
    authors: "C. P. Murphy, S. B. Nicholson, N. Freitas, E. Penocchio, T. R. Gingrich",
    title: "Dissipation-reliability tradeoff for stochastic CMOS bits in series",
    journal: "arXiv", details: "2603.04658",
    url: "https://arxiv.org/abs/2603.04658",
    topics: ["thermo"] },

  { year: 2026, type: "article",
    authors: "J. M. Gallagher, E. Penocchio*, R. G. Bergman, F. D. Toste",
    title: "Conformational dynamics for catalysis beyond the Sabatier limit",
    journal: "J. Am. Chem. Soc.", details: "148, 39417–39432",
    doi: "10.1021/jacs.6c11246",
    image: "assets/img/papers/2026-dynamic-catalysis.svg", imageAlt: "A volcano plot of catalytic rate: static catalysts sit on or below the peak; a catalyst that changes shape can go above it",
    topics: ["catalysis"] },

  { year: 2026, type: "article",
    authors: "W. Baxter, L. E. Bickerton, K. Liang, E. Penocchio, J. A. Aguilar, G. Ragazzon, S. Borsley",
    title: "Chemically fueled active transport cascades in large unilamellar vesicles",
    journal: "J. Am. Chem. Soc.", details: "148, 39976–39987",
    doi: "10.1021/jacs.6c11418",
    image: "assets/img/papers/2026-vesicle-transport.jpg", imageAlt: "Graphical abstract: fuelled pumping of a cargo into vesicles builds a proton gradient, which then drives a sodium gradient", imageCredit: "Graphical abstract, J. Am. Chem. Soc. 2026 (CC BY 4.0)",
    topics: ["machines", "catalysis"] },

  { year: 2026, type: "preprint",
    authors: "G. Gu, D. Alvarez, J. Strahan, A. Albaugh, E. Penocchio, T. R. Gingrich",
    title: "It takes two to make a thing go right: boosting current in coupled motors",
    journal: "arXiv", details: "2601.09907",
    url: "https://arxiv.org/abs/2601.09907",
    topics: ["machines", "simulation"] },

  { year: 2025, type: "article",
    authors: "F. Avanzini, M. Esposito, E. Penocchio",
    title: "Coarse graining photo-isomerization reactions: thermodynamic consistency and implications for molecular ratchets",
    journal: "J. Chem. Phys.", details: "163, 134122",
    doi: "10.1063/5.0290281",
    image: "assets/img/papers/2025-coarse-grain-photo.svg", imageAlt: "Detailed ground- and excited-state levels coarse-grained into a two-state photoreaction that still obeys local detailed balance",
    topics: ["thermo", "light", "machines"] },

  { year: 2025, type: "article",
    authors: "B. M. W. Roberts, E. Del Grosso, E. Penocchio, F. Ricci, L. J. Prins",
    title: "An information ratchet improves selectivity in molecular recognition under non-equilibrium conditions",
    journal: "Nat. Nanotechnol.", details: "20, 1449–1456",
    doi: "10.1038/s41565-025-01982-5",
    image: "assets/img/papers/2025-info-ratchet-dna.jpg", imageAlt: "Reaction network of the DNA information ratchet: fuel-strand degradation drives accumulation of the correct duplex and depletion of the wrong one", imageCredit: "Fig. 1b, Nat. Nanotechnol. 2025",
    note: "Highlighted in a News & Views article in Nature Nanotechnology",
    topics: ["machines", "thermo"] },

  { year: 2025, type: "article",
    authors: "K. Liang, F. Nicoli, S. Al Shehimy, E. Penocchio, S. Di Noja, Y. Li, C. Bonfio, S. Borsley, G. Ragazzon",
    title: "Catalysis-driven active transport across a liquid membrane",
    journal: "Angew. Chem. Int. Ed.", details: "64, e202421234",
    doi: "10.1002/anie.202421234",
    image: "assets/img/papers/2025-liquid-membrane.svg", imageAlt: "Two water compartments over an organic layer: a fuelled carrier pumps cargo from the left to the right compartment",
    topics: ["machines", "catalysis"] },

  { year: 2025, type: "article", featured: true,
    authors: "E. Penocchio*, G. Gu, A. Albaugh, T. R. Gingrich",
    title: "Power strokes in molecular motors: predictive, irrelevant, or somewhere in between?",
    journal: "J. Am. Chem. Soc.", details: "147, 1063–1073",
    doi: "10.1021/jacs.4c14481",
    image: "assets/img/papers/2025-power-strokes.jpg", imageAlt: "Graphical abstract: direction of a simulated motor against the strength of its power stroke", imageCredit: "Graphical abstract, J. Am. Chem. Soc. 2025",
    topics: ["machines", "simulation"] },

  { year: 2025, type: "article",
    authors: "Z. Yang, X. Wang, E. Penocchio*, G. Ragazzon, X. Chen, S. Lu, Y. Zhou, K. Fu, Z. Liu, Y. Cai, X. Yu, X. Li, X. Li, W. Feng, L. Yuan",
    title: "Beyond single-cycle autonomous molecular machines: light-powered shuttling in a multi-cycle reaction network",
    journal: "Angew. Chem. Int. Ed.", details: "64, e202414072",
    doi: "10.1002/anie.202414072",
    image: "assets/img/papers/2025-multicycle-light.jpg", imageAlt: "Graphical abstract: a light-driven rotaxane shuttling through a multi-cycle reaction network", imageCredit: "Graphical abstract, Angew. Chem. Int. Ed. 2025",
    topics: ["machines", "light"] },

  { year: 2024, type: "article", featured: true,
    authors: "E. Penocchio*, A. Bachir, A. Credi, R. D. Astumian, G. Ragazzon",
    title: "Analysis of kinetic asymmetry in a multi-cycle reaction network establishes the principles for autonomous compartmentalized molecular ratchets",
    journal: "Chem", details: "10, 3644–3655",
    doi: "10.1016/j.chempr.2024.07.038",
    image: "assets/img/papers/2024-compartment-ratchets.jpg", imageAlt: "Graphical abstract: a multi-cycle reaction network spanning two compartments", imageCredit: "Graphical abstract, Chem 2024",
    note: "Highlighted by a Preview in Chem and by ChemistryViews",
    topics: ["machines", "thermo"] },

  { year: 2024, type: "notes",
    authors: "F. Avanzini, M. Bilancioni, V. Cavina, S. Dal Cengio, M. Esposito, G. Falasco, D. Forastiere, N. Freitas, A. Garilli, P. E. Harunari, V. Lecomte, A. Lazarescu, S. G. Marehalli Srinivas, C. Moslonka, I. Neri, E. Penocchio, W. D. Piñeros, M. Polettini, A. Raghu, P. Raux, K. Sekimoto, A. Soret",
    title: "Methods and conversations in (post)modern thermodynamics",
    journal: "SciPost Phys. Lect. Notes", details: "80",
    doi: "10.21468/SciPostPhysLectNotes.80",
    image: "assets/img/papers/2024-lecture-notes.svg", imageAlt: "Open lecture notes with a reaction network sketched on one page",
    note: "Lecture notes from a doctoral school (authors in alphabetical order)",
    topics: ["thermo"] },

  { year: 2023, type: "review",
    authors: "T. Sangchai, S. Al Shehimy, E. Penocchio*, G. Ragazzon",
    title: "Artificial molecular ratchets: tools enabling endergonic processes",
    journal: "Angew. Chem. Int. Ed.", details: "62, e202309501",
    doi: "10.1002/anie.202309501",
    image: "assets/img/papers/2023-ratchets-review.jpg", imageAlt: "Graphical abstract: energy driving a reaction network away from equilibrium", imageCredit: "Graphical abstract, Angew. Chem. Int. Ed. 2023",
    note: "Tutorial review, a good starting point for new students",
    topics: ["machines", "thermo"] },

  { year: 2023, type: "article",
    authors: "L. Binks, S. Borsley, T. R. Gingrich, D. A. Leigh, E. Penocchio, B. M. W. Roberts",
    title: "The role of kinetic asymmetry and power strokes in an information ratchet",
    journal: "Chem", details: "9, 2902–2917",
    doi: "10.1016/j.chempr.2023.05.035",
    image: "assets/img/papers/2023-rotaxane-ratchets.jpg", imageAlt: "Graphical abstract: kinetic asymmetry and power strokes in a rotaxane information ratchet", imageCredit: "Graphical abstract, Chem 2023",
    note: "Authors in alphabetical order. Highlighted by a Preview in Matter",
    topics: ["machines"] },

  { year: 2023, type: "article",
    authors: "M. Bilancioni, M. Esposito, E. Penocchio*",
    title: "A [3]-catenane non-autonomous molecular motor model: geometric phase, no-pumping theorem, and energy transduction",
    journal: "J. Chem. Phys.", details: "158, 224104",
    doi: "10.1063/5.0151625",
    image: "assets/img/papers/2023-catenane-driving.svg", imageAlt: "A [3]-catenane motor: two small rings on a large ring with three stations, driven by a periodic external modulation",
    topics: ["machines", "thermo"] },

  { year: 2023, type: "article",
    authors: "E. Penocchio*, G. Ragazzon",
    title: "Kinetic barrier diagrams to visualize and engineer molecular nonequilibrium systems",
    journal: "Small", details: "19, 2206188",
    doi: "10.1002/smll.202206188",
    image: "assets/img/papers/2023-barrier-diagram.svg", imageAlt: "A kinetic barrier diagram: states as levels joined by barriers, one barrier lowered to give a direction",
    topics: ["machines", "thermo"] },

  { year: 2022, type: "article",
    authors: "S. Amano, M. Esposito, E. Kreidt, D. A. Leigh, E. Penocchio*, B. M. W. Roberts",
    title: "Using catalysis to drive chemistry away from equilibrium: relating kinetic asymmetry, power strokes, and the Curtin–Hammett principle in Brownian ratchets",
    journal: "J. Am. Chem. Soc.", details: "144, 20153–20164",
    doi: "10.1021/jacs.2c08723",
    image: "assets/img/papers/2022-catalysis-ratchet.jpg", imageAlt: "Graphical abstract: the Curtin–Hammett principle linking artificial and biological molecular machines", imageCredit: "Graphical abstract, J. Am. Chem. Soc. 2022",
    note: "Authors in alphabetical order",
    topics: ["machines", "catalysis"] },

  { year: 2022, type: "article",
    authors: "E. Penocchio*, F. Avanzini, M. Esposito",
    title: "Information thermodynamics for deterministic chemical reaction networks",
    journal: "J. Chem. Phys.", details: "157, 034110",
    doi: "10.1063/5.0094849",
    image: "assets/img/papers/2022-info-bipartite.svg", imageAlt: "Two chemical subnetworks that share species but not reactions, exchanging energy and information",
    topics: ["thermo"] },

  { year: 2022, type: "article",
    authors: "S. Corrà, M. Tranfić Bakić, J. Groppi, M. Baroncini, S. Silvi, E. Penocchio, M. Esposito, A. Credi",
    title: "Kinetic and energetic insights into the dissipative non-equilibrium operation of an autonomous light-powered supramolecular pump",
    journal: "Nat. Nanotechnol.", details: "17, 746–751",
    doi: "10.1038/s41565-022-01151-y",
    image: "assets/img/papers/2022-pump-light.svg", imageAlt: "A light-powered supramolecular pump: rings thread onto an axle at the light-switchable end and leave from the other end",
    note: "Highlighted in a News & Views article in Nature Nanotechnology",
    topics: ["machines", "light", "thermo"] },

  { year: 2022, type: "article",
    authors: "D. Asnicar, E. Penocchio, D. Frezzato",
    title: "Sample size dependence of tagged molecule dynamics in steady-state networks with bimolecular reactions: cycle times of a light-driven pump",
    journal: "J. Chem. Phys.", details: "156, 184116",
    doi: "10.1063/5.0089695",
    image: "assets/img/papers/2022-tagged-size.svg", imageAlt: "One tagged molecule followed in a small sample with few molecules and in a large one with many",
    topics: ["light", "machines"] },

  { year: 2022, type: "article", featured: true,
    authors: "S. Amano, M. Esposito, E. Kreidt, D. A. Leigh, E. Penocchio*, B. M. W. Roberts",
    title: "Insights from an information thermodynamics analysis of a synthetic molecular motor",
    journal: "Nat. Chem.", details: "14, 530–537",
    doi: "10.1038/s41557-022-00899-z",
    image: "assets/img/papers/motor-information.svg", imageAlt: "A small ring threaded on a larger ring, moving between two binding sites, driven by a fuel-to-waste reaction",
    note: "Authors in alphabetical order",
    topics: ["machines", "thermo"] },

  { year: 2021, type: "article",
    authors: "E. Penocchio*, R. Rao, M. Esposito",
    title: "Nonequilibrium thermodynamics of light-induced reactions",
    journal: "J. Chem. Phys.", details: "155, 114101",
    doi: "10.1063/5.0060774",
    image: "assets/img/papers/2021-light-thermo.svg", imageAlt: "Energy curves of a photoreaction: light lifts a molecule to an excited state, it relaxes to the other isomer and returns thermally",
    topics: ["thermo", "light"] },

  { year: 2021, type: "article",
    authors: "F. Avanzini, E. Penocchio, G. Falasco, M. Esposito",
    title: "Nonequilibrium thermodynamics of non-ideal chemical reaction networks",
    journal: "J. Chem. Phys.", details: "154, 094114",
    doi: "10.1063/5.0041225",
    image: "assets/img/papers/2021-nonideal.svg", imageAlt: "Dilute, non-interacting molecules next to a crowded solution of interacting ones",
    topics: ["thermo"] },

  { year: 2019, type: "article", featured: true,
    authors: "E. Penocchio, R. Rao, M. Esposito",
    title: "Thermodynamic efficiency in dissipative chemistry",
    journal: "Nat. Commun.", details: "10, 3865",
    doi: "10.1038/s41467-019-11676-x",
    image: "assets/img/papers/efficiency.svg", imageAlt: "Free energy from a fuel enters a chemical system; part is stored or used, the rest is dissipated",
    note: "Covered by Phys.org",
    topics: ["thermo"] },

  { year: 2019, type: "article",
    authors: "A. Sabatino, E. Penocchio, G. Ragazzon, A. Credi, D. Frezzato",
    title: "Individual-molecule perspective analysis of chemical reaction networks: the case of a light-driven supramolecular pump",
    journal: "Angew. Chem. Int. Ed.", details: "58, 14341–14348",
    doi: "10.1002/anie.201908026",
    image: "assets/img/papers/2019-pump-molecule.jpg", imageAlt: "Graphical abstract: single molecules of a light-driven supramolecular pump, each seen from its own viewpoint", imageCredit: "Graphical abstract, Angew. Chem. Int. Ed. 2019",
    topics: ["light", "machines"] },

  { year: 2019, type: "article",
    authors: "G. Falasco, T. Cossetto, E. Penocchio, M. Esposito",
    title: "Negative differential response in chemical reactions",
    journal: "New J. Phys.", details: "21, 073005",
    doi: "10.1088/1367-2630/ab28be",
    image: "assets/img/papers/2019-ndr.svg", imageAlt: "Reaction current against driving affinity: it first rises, then falls (negative differential response)",
    topics: ["thermo"] },

  { year: 2017, type: "article",
    authors: "M. Mendolicchio, E. Penocchio, D. Licari, N. Tasinato, V. Barone",
    title: "Development and implementation of advanced fitting methods for the calculation of accurate molecular structures",
    journal: "J. Chem. Theory Comput.", details: "13, 3060–3075",
    doi: "10.1021/acs.jctc.7b00279",
    topics: ["structure"] },

  { year: 2016, type: "article",
    authors: "E. Penocchio, M. Mendolicchio, N. Tasinato, V. Barone",
    title: "Structural features of the carbon–sulfur chemical bond: a semi-experimental perspective",
    journal: "Can. J. Chem.", details: "94, 1065–1076",
    doi: "10.1139/cjc-2016-0282",
    topics: ["structure"] },

  { year: 2015, type: "article",
    authors: "E. Penocchio, M. Piccardo, V. Barone",
    title: "Semiexperimental equilibrium structures for building blocks of organic and biological molecules: the B2PLYP route",
    journal: "J. Chem. Theory Comput.", details: "11, 4689–4707",
    doi: "10.1021/acs.jctc.5b00622",
    topics: ["structure"] },

  { year: 2015, type: "article",
    authors: "V. Barone, M. Biczysko, J. Bloino, P. Cimino, E. Penocchio, C. Puzzarini",
    title: "CC/DFT route toward accurate structures and spectroscopic features for observed and elusive conformers of flexible molecules: pyruvic acid as a case study",
    journal: "J. Chem. Theory Comput.", details: "11, 4342–4363",
    doi: "10.1021/acs.jctc.5b00580",
    topics: ["structure"] },

  { year: 2015, type: "article",
    authors: "M. Piccardo, E. Penocchio, C. Puzzarini, M. Biczysko, V. Barone",
    title: "Semi-experimental equilibrium structure determinations by employing B3LYP/SNSD anharmonic force fields: validation and application to semirigid organic molecules",
    journal: "J. Phys. Chem. A", details: "119, 2058–2082",
    doi: "10.1021/jp511432m",
    topics: ["structure"] },

  { year: 2014, type: "article",
    authors: "C. Puzzarini, E. Penocchio, M. Biczysko, V. Barone",
    title: "Molecular structure and spectroscopic signatures of acrolein: theory meets experiment",
    journal: "J. Phys. Chem. A", details: "118, 6648–6656",
    doi: "10.1021/jp503672g",
    topics: ["structure"] }
];
