/* =====================================================================
   STORED FREE ENERGY — the community list on stored-free-energy.html

   Criterion: an experimental chemical system (or an analysis of
   experimental data) for which the paper reports the free energy stored
   away from equilibrium, computed from concentrations as
   RT Σ ( [X] ln([X]/[X]eq) − [X] + [X]eq ), or an equivalent expression.
   Same criterion for every group, ours included. The page sorts by year.

   To add a paper, copy one entry and edit it.

   Fields
     year       number
     authors    "Initial. Surname" separated by commas, as published
     title      string, sentence case
     journal    string (italicised on the page)
     details    volume, pages / article number
     doi        DOI without https://doi.org/
     labs       corresponding / principal investigators
     driving    "chemical" | "light" | "electricity"
     source     what supplies the energy (fuel, wavelength, …)
     system     a few words on what is driven
     quantified one or two sentences in plain words; HTML allowed.
                Give values as the paper reports them, conditions, and
                mark any conversion we made ("about … J L⁻¹").
     coauthored true if Emanuele is a co-author (shown as a tag)
   ===================================================================== */
window.SFE_DRIVING = {
  chemical:    "Chemical energy",
  light:       "Light",
  electricity: "Electricity"
};

window.SFE_PAPERS = [
  { year: 2026,
    authors: "F. Nicoli, C. Taticchi, S. Corrà, M. Tranfić Bakić, M. Baroncini, S. Silvi, J. Groppi, A. Credi",
    title: "An artificial molecular pump powered by light",
    journal: "Angew. Chem. Int. Ed.", details: "65, e8103353",
    doi: "10.1002/anie.8103353",
    labs: "Credi",
    driving: "light", source: "369 nm",
    system: "Light-driven molecular pump",
    quantified: "<b>0.012 J L⁻¹</b> stored at the steady state under 369 nm light, relative to the dark equilibrium (about 10 mM of each component; the fraction of free macrocycles drops from 0.12 to 0.11). The authors also report a Carnot-like efficiency of about 0.9 %: the power dissipated by the thermal reaction steps over the absorbed light power." },

  { year: 2026,
    authors: "S. Yahaya, S. Amano, F. Nicoli, G. Ragazzon",
    title: "A versatile strategy for light-driven active transport of ions",
    journal: "Angew. Chem. Int. Ed.", details: "65, e20638",
    doi: "10.1002/anie.202520638",
    labs: "Ragazzon",
    driving: "light", source: "365 nm and 424 nm",
    system: "Ion transport across a liquid membrane",
    quantified: "Free energy stored in the concentration gradient of the carrier between two compartments (0.5 mM in each at the start): <b>0.098 J L⁻¹</b> with one light source, rising to 0.24 J L⁻¹ with salt and a second light source acting on the other compartment." },

  { year: 2026,
    authors: "P. A. Hoffmann, S. Saha, S. Volk, J. Sun, A. Englert, M. von Delius",
    title: "Autonomous migration of a phosphate group along glycerol and inositol scaffolds driven by a phosphodiester reaction cycle",
    journal: "Nat. Chem.", details: "advance online publication",
    doi: "10.1038/s41557-026-02240-4",
    labs: "von Delius",
    driving: "chemical", source: "carbodiimide (EDC)",
    system: "Phosphate walker on glycerol",
    quantified: "About <b>2.3 kJ mol⁻¹</b> stored after ten fuelling cycles, when 64 % of the glycerophosphate sits in the less stable middle position (about 10 % at equilibrium; 10 mM)." },

  { year: 2026,
    authors: "W. Baxter, L. E. Bickerton, K. Liang, E. Penocchio, J. A. Aguilar, G. Ragazzon, S. Borsley",
    title: "Chemically fueled active transport cascades in large unilamellar vesicles",
    journal: "J. Am. Chem. Soc.", details: "148, 39976–39987",
    doi: "10.1021/jacs.6c11418",
    coauthored: true,
    labs: "Borsley, Ragazzon",
    driving: "chemical", source: "carbodiimide (EDC)",
    system: "Transport cascades in vesicles",
    quantified: "<b>1.08 J L⁻¹</b> stored in the cargo gradient across a hybrid lipid–liquid supported membrane, and up to 0.9 J L⁻¹ in the cargo gradient across vesicle membranes. Vesicle values depend on the volume they refer to: 3.4 J L⁻¹ per litre of vesicle interior in one experiment, below 10⁻³ J L⁻¹ per litre of sample. In separate experiments the resulting pH gradient drives Cl⁻ or Na⁺ transport, whose gradients store 0.91 and 0.64 J L⁻¹ of vesicle interior (transduction efficiencies of about 58 % and 57 %)." },

  { year: 2025,
    authors: "B. M. W. Roberts, E. Del Grosso, E. Penocchio, F. Ricci, L. J. Prins",
    title: "An information ratchet improves selectivity in molecular recognition under non-equilibrium conditions",
    journal: "Nat. Nanotechnol.", details: "20, 1449–1456",
    doi: "10.1038/s41565-025-01982-5",
    coauthored: true,
    labs: "Prins, Ricci",
    driving: "chemical", source: "DNA fuel strand, enzyme-processed",
    system: "Information ratchet for DNA duplex formation",
    quantified: "At its peak, <b>0.15 mJ L⁻¹</b> stored in the out-of-equilibrium duplex distribution (about 3.0 kJ mol⁻¹ per mole of template strand; 50 nM of each strand, 500 nM fuel strand), which the authors relate to the extra information gained in recognition; 0.05 mJ L⁻¹ with 200 nM fuel." },

  { year: 2025,
    authors: "K. Liang, F. Nicoli, S. Al Shehimy, E. Penocchio, S. Di Noja, Y. Li, C. Bonfio, S. Borsley, G. Ragazzon",
    title: "Catalysis-driven active transport across a liquid membrane",
    journal: "Angew. Chem. Int. Ed.", details: "64, e202421234",
    doi: "10.1002/anie.202421234",
    coauthored: true,
    labs: "Ragazzon",
    driving: "chemical", source: "carbodiimide (EDC)",
    system: "Transport across a liquid membrane",
    quantified: "Free energy stored in the maleic acid gradient between two aqueous compartments (5 mM in each at the start; 100 mM EDC added to one side only): at least <b>14 J L⁻¹</b> at the plateau, a lower bound because the depleted side falls below the detection limit. The storage efficiency (stored free energy over the free energy of EDC hydration) peaks at about 0.35 %." },

  { year: 2024,
    authors: "S. Al Shehimy, H.-D. Le, S. Amano, S. Di Noja, L. Monari, G. Ragazzon",
    title: "Progressive endergonic synthesis of Diels–Alder adducts driven by chemical energy",
    journal: "Angew. Chem. Int. Ed.", details: "63, e202411554",
    doi: "10.1002/anie.202411554",
    labs: "Ragazzon",
    driving: "chemical", source: "carbodiimide (DIC)",
    system: "Endergonic Diels–Alder synthesis",
    quantified: "Up to <b>49 J L⁻¹</b> stored in the out-of-equilibrium reactant–adduct distribution after one addition of 3 equivalents of fuel (100 mM diene and maleic acid, 40 °C), about 0.2 % of the free energy released by the fuel. Repeated additions of 1 equivalent raise it step by step (by 21, 9.5 and 2.5 J L⁻¹)." },

  { year: 2024,
    authors: "J. Wu, J. L. Greenfield",
    title: "Photoswitchable imines drive dynamic covalent systems to nonequilibrium steady states",
    journal: "J. Am. Chem. Soc.", details: "146, 20720–20727",
    doi: "10.1021/jacs.4c03817",
    labs: "Greenfield",
    driving: "light", source: "405 nm",
    system: "Dynamic covalent imine network",
    quantified: "<b>44 J L⁻¹</b> at the nonequilibrium steady state under 405 nm light (6 mM imine with 50 equivalents of aniline), relative to thermal equilibrium in the dark. 99 % of it is in the E/Z photoisomer populations, evaluated with a computed Z–E free-energy difference; 0.33 J L⁻¹ is in the shifted imine-exchange equilibrium." },

  { year: 2024,
    authors: "E. Olivieri, J. M. Gallagher, A. Betts, T. W. Mrad, D. A. Leigh",
    title: "Endergonic synthesis driven by chemical fuelling",
    journal: "Nat. Synth.", details: "3, 707–714",
    doi: "10.1038/s44160-024-00493-w",
    labs: "Leigh",
    driving: "chemical", source: "carbodiimide (DIC)",
    system: "Endergonic Diels–Alder synthesis",
    quantified: "<b>0.63 kJ mol⁻¹</b> stored after one fuelling (10 % adduct, against 0.4 % at equilibrium) and 1.05 kJ mol⁻¹ after a second fuelling (15 %), with 12.5 mM of each reactant and of fuel: about 8 and 13 J L⁻¹ (our conversion, × 12.5 mM). After one fuelling this is about 0.8 % of the free energy released by carbodiimide hydration (about 80 kJ mol⁻¹)." },

  { year: 2024,
    authors: "M. S. Neumann, S. K. Jensen, R. Frederiksen, S. S. Andersen, K. M. Beck, J. O. Jeppesen",
    title: "Pushing a bistable [2]rotaxane out of equilibrium and isolation of the metastable-state co-conformation",
    journal: "Org. Biomol. Chem.", details: "22, 9203–9208",
    doi: "10.1039/d4ob01419g",
    labs: "Jeppesen",
    driving: "chemical", source: "redox reagents, one cycle",
    system: "Bistable [2]rotaxane",
    quantified: "<b>4.4 J L⁻¹</b> (0.7 kcal mol⁻¹) in a 1.5 mM sample of the metastable co-conformation, which can be physically isolated." },

  { year: 2023,
    authors: "T. Marchetti, D. Frezzato, L. Gabrielli, L. J. Prins",
    title: "ATP drives the formation of a catalytic hydrazone through an energy ratchet mechanism",
    journal: "Angew. Chem. Int. Ed.", details: "62, e202307530",
    doi: "10.1002/anie.202307530",
    labs: "Prins",
    driving: "chemical", source: "ATP",
    system: "Energy-ratchet hydrazone synthesis",
    quantified: "<b>0.49 J L⁻¹</b> stored in the kinetically trapped composition (83 % hydrazone, against 47 % at equilibrium; 0.5 mM of each component) once the ATP has been hydrolysed." },

  { year: 2023,
    authors: "L. Binks, S. Borsley, T. R. Gingrich, D. A. Leigh, E. Penocchio, B. M. W. Roberts",
    title: "The role of kinetic asymmetry and power strokes in an information ratchet",
    journal: "Chem", details: "9, 2902–2917",
    doi: "10.1016/j.chempr.2023.05.035",
    coauthored: true,
    labs: "Leigh",
    driving: "chemical", source: "carbodiimide (DIC)",
    system: "Rotaxane information ratchets",
    quantified: "<b>1.2–1.7 kJ mol⁻¹</b> per mole of ratchet for three rotaxane ratchets at steady state, split into an information (Shannon entropy) and a binding contribution; about 3–4 J L⁻¹ at 2.5 mM ratchet (our conversion; Sangchai et al. 2023 give 3.0–4.3 J L⁻¹)." },

  { year: 2022,
    authors: "S. Corrà, M. Tranfić Bakić, J. Groppi, M. Baroncini, S. Silvi, E. Penocchio, M. Esposito, A. Credi",
    title: "Kinetic and energetic insights into the dissipative non-equilibrium operation of an autonomous light-powered supramolecular pump",
    journal: "Nat. Nanotechnol.", details: "17, 746–751",
    doi: "10.1038/s41565-022-01151-y",
    coauthored: true,
    labs: "Credi",
    driving: "light", source: "365 nm",
    system: "Light-driven supramolecular pump",
    quantified: "Up to <b>0.63 J L⁻¹</b> stored at the steady state under 365 nm light, relative to the local equilibrium reached in the dark with the E/Z composition fixed; the value rises with photon flow and levels off near 0.6 J L⁻¹. The fraction of the absorbed light free energy dissipated by the pumping steps falls from 0.3 % to 0.08 % as the flow increases." }
];
