/* =====================================================================
   NEWS — single source of truth for news.html and the home page
   ("Latest updates" shows the first 4 entries in this list).

   Put the newest item at the TOP. To add one, copy an entry and edit.

   Fields
     date    "YYYY-MM" or "YYYY"
     kind    "group" | "funding" | "paper" | "prize" | "talk" | "people"
     title   one sentence, shown in bold-ish text
     text    optional extra sentence (shown on the News page only)
     link    optional URL (internal page or external)
     image   optional path, e.g. "assets/img/news/2026-group.jpg"
             (square crop, ≥ 300×300). Without it an icon is shown.
   ===================================================================== */
window.NEWS = [
  { date: "2026-10", kind: "group",
    title: "From November 2026 we are at JGU Mainz, and we are recruiting.",
    text: "On 1 November Emanuele joins the Department of Chemistry at Johannes Gutenberg University Mainz as tenure-track professor and Wübben Foundation Professor for Theoretical Chemistry of Macromolecular and Supramolecular Systems. PhD and postdoc positions are open.",
    link: "opportunities.html" },

  { date: "2026-10", kind: "funding",
    title: "JGU Mainz and its Rhine-Main partners are selected as a University Excellence Consortium in Germany’s Excellence Strategy.",
    text: "With Goethe University Frankfurt and TU Darmstadt, JGU forms the Rhine-Main Universities (RMU), the first cross-border alliance in the Excellence Strategy, funded from 2027 to 2033.",
    link: "https://www.rhein-main-universitaeten.de/en/news/rhine-main-universities-successful-in-the-excellence-strategy" },

  { date: "2026-07", kind: "funding",
    title: "The Wübben Stiftung Wissenschaft funds our group with a Tenure-Track Professorship.",
    text: "The six-year grant supports positions, computing infrastructure, workshops in Mainz and open-access publishing, and comes with the title Wübben Foundation Professor.",
    link: "https://press.uni-mainz.de/wubben-foundation-supports-two-faculty-appointments-at-mainz-university/" },

  { date: "2026-05", kind: "people",
    title: "A theorist at the bench: Emanuele starts a Marie Skłodowska-Curie fellowship in Strasbourg.",
    text: "At the Institute of Supramolecular Science and Engineering (ISIS), in Giulio Ragazzon’s lab, he learns experimental electrochemistry to test reaction-network models against real data.",
    link: "https://cordis.europa.eu/project/id/101268485" },

  { date: "2026-01", kind: "paper",
    title: "New preprint with the Gingrich group: two coupled motors can do better than one.",
    link: "https://arxiv.org/abs/2601.09907" },

  { date: "2025", kind: "paper",
    title: "An information ratchet that proofreads: nonequilibrium driving improves molecular recognition, in Nature Nanotechnology.",
    text: "With the Prins and Ricci groups, using DNA hybridisation. Highlighted in a News & Views article.",
    link: "https://doi.org/10.1038/s41565-025-01982-5" },

  { date: "2025", kind: "paper",
    title: "How to coarse-grain light-driven isomerisations without breaking thermodynamics, in J. Chem. Phys.",
    link: "https://doi.org/10.1063/5.0290281" },

  { date: "2025-06", kind: "talk",
    title: "Closing plenary lecture at “The future of biophysics” in Rome, and an Emerging Investigator talk at the ERC Grantees Conference in Porvoo.",
    link: "emanuele.html#talks" },

  { date: "2025-04", kind: "talk",
    title: "Ruth Lynden-Bell Prize lecture at the RSC & Higgs Centre workshop on nonequilibrium thermodynamics in Edinburgh.",
    link: "https://higgs.ph.ed.ac.uk/workshops/non-equilibrium-thermodynamics/" },

  { date: "2025-03", kind: "talk",
    title: "Department-wide chemistry lecture at the University of Cambridge: “Harnessing free energy in chemistry: a theory-driven approach”.",
    link: "https://talks.cam.ac.uk/talk/index/229120" },

  { date: "2025-01", kind: "paper",
    title: "Do power strokes matter for molecular motors? Coarse-grained simulations answer, in J. Am. Chem. Soc.",
    link: "https://doi.org/10.1021/jacs.4c14481" },

  { date: "2024", kind: "prize",
    title: "Emanuele receives the Ruth Lynden-Bell PhD Prize of the Royal Society of Chemistry for the best thesis in statistical mechanics and thermodynamics.",
    link: "https://www.rsc.org/membership-and-community/connect-with-others/through-interests/interest-groups/statistical-mechanics/awards/" },

  { date: "2024-09", kind: "paper",
    title: "Kinetic asymmetry generalised to multi-cycle reaction networks, establishing principles for compartmentalised molecular ratchets, in Chem.",
    text: "Highlighted by a Preview in Chem and by ChemistryViews.",
    link: "https://doi.org/10.1016/j.chempr.2024.07.038" },

  { date: "2024", kind: "people",
    title: "Emanuele is named a Foresight Fellow (Molecular Machines) and joins the Future Faculty Program of the International Institute for Nanotechnology." },

  { date: "2023", kind: "prize",
    title: "Two best-thesis awards across all disciplines: the FNR Award for Outstanding PhD Thesis (Luxembourg) and the Rolf Tarrach Award (University of Luxembourg).",
    link: "https://www.uni.lu/en/news/rolf-tarrach-prize-2023-for-physicist-dr-emanuele-penocchio/",
    image: "assets/img/emanuele-award.jpg" },

  { date: "2023", kind: "prize",
    title: "The “Molecular Ratcheteers” collaboration, including Emanuele, wins the RSC Perkin Prize in Physical Organic Chemistry.",
    link: "https://www.rsc.org/prizes-funding/prizes/2023-winners/the-molecular-ratcheteers/" },

  { date: "2022", kind: "prize",
    title: "Foresight Institute Distinguished Student Award and University of Luxembourg Excellent Thesis Award.",
    link: "https://foresight.org/foresight-feynman-prizes/" },

  { date: "2022-03", kind: "people",
    title: "Emanuele defends his PhD thesis “Thermodynamics of chemical engines: a chemical reaction network approach” in Luxembourg." },

  { date: "2022", kind: "paper",
    title: "Information thermodynamics of a synthetic molecular motor, with the Leigh group, in Nature Chemistry.",
    link: "https://doi.org/10.1038/s41557-022-00899-z" }
];
