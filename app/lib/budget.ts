// Types pour les données du budget
export interface BudgetData {
  // Revenus
  salaire: number
  revenuLocatif: number
  primeJanvier: number
  ticketsResto: number
  googleReward: number
  // Dépenses
  pension: number
  voiture: number
  chargesCouple: number
  nourriture: number
  chargesLocatif: number
  creditLocatif: number
  prevoyance: number
  stream: number
  ia: number
  internet: number
  telFranck: number
  telGabriel: number
  // Projet
  mensualiteTravaux: number
  totalTravaux: number
  // Epargne (Stock)
  livretA: number
  lep: number
  csl: number
  partsSociales: number
  interessement: number
  primeJanvierStock: number
}

// Résultats des calculs
export interface BudgetCalculations {
  totalRevenus: number
  totalDepensesFixes: number
  totalDepensesAvecTravaux: number
  resteAvecTravaux: number
  tauxEffortProjet: number
  totalEpargne: number
  moisAutonomie: number
  moisTravauxSeuls: number
}

// Helper pour parser les variables d'environnement en nombre
export function parseEnvNumber(
  value: string | undefined,
  defaultValue: number
): number {
  if (!value) return defaultValue
  const parsed = parseFloat(value)
  return isNaN(parsed) ? defaultValue : parsed
}

// Calculs du budget
export function calculateBudget(data: BudgetData): BudgetCalculations {
  // --- CALCULS FLUX (Mensuel) ---
  const totalRevenus =
    data.salaire +
    data.revenuLocatif +
    data.primeJanvier / 12 +
    data.ticketsResto +
    data.googleReward

  const totalDepensesFixes =
    data.pension +
    data.voiture +
    data.chargesCouple +
    data.nourriture +
    data.chargesLocatif +
    data.creditLocatif +
    data.prevoyance +
    data.stream +
    data.ia +
    data.internet +
    data.telFranck +
    data.telGabriel

  const totalDepensesAvecTravaux = totalDepensesFixes + data.mensualiteTravaux
  const resteAvecTravaux = totalRevenus - totalDepensesAvecTravaux
  const tauxEffortProjet = (totalDepensesAvecTravaux / totalRevenus) * 100

  // --- CALCULS STOCK (Epargne) ---
  const totalEpargne =
    data.livretA +
    data.lep +
    data.csl +
    data.partsSociales +
    data.interessement +
    data.primeJanvierStock

  const moisAutonomie = totalEpargne / (totalDepensesAvecTravaux || 1)
  const moisTravauxSeuls = totalEpargne / (data.mensualiteTravaux || 1)

  return {
    totalRevenus,
    totalDepensesFixes,
    totalDepensesAvecTravaux,
    resteAvecTravaux,
    tauxEffortProjet,
    totalEpargne,
    moisAutonomie,
    moisTravauxSeuls,
  }
}

// Charger les données depuis process.env
export function loadBudgetFromEnv(): BudgetData {
  return {
    // Revenus
    salaire: parseEnvNumber(process.env.REACT_APP_SALAIRE, 2200),
    revenuLocatif: parseEnvNumber(process.env.REACT_APP_REVENU_LOCATIF, 647),
    primeJanvier: parseEnvNumber(process.env.REACT_APP_PRIME_JANVIER_FLUX, 0),
    ticketsResto: parseEnvNumber(process.env.REACT_APP_TICKETS_RESTO, 170),
    googleReward: parseEnvNumber(process.env.REACT_APP_GOOGLE_REWARD, 3),
    // Dépenses
    pension: parseEnvNumber(process.env.REACT_APP_DEPENSE_PENSION, 243),
    voiture: parseEnvNumber(process.env.REACT_APP_DEPENSE_VOITURE, 320),
    chargesCouple: parseEnvNumber(process.env.REACT_APP_DEPENSE_CHARGES_COUPLE, 650),
    nourriture: parseEnvNumber(process.env.REACT_APP_DEPENSE_NOURRITURE, 200),
    chargesLocatif: parseEnvNumber(process.env.REACT_APP_DEPENSE_CHARGES_LOCATIF, 77),
    creditLocatif: parseEnvNumber(process.env.REACT_APP_DEPENSE_CREDIT_LOCATIF, 368),
    prevoyance: parseEnvNumber(process.env.REACT_APP_DEPENSE_PREVOYANCE, 19),
    stream: parseEnvNumber(process.env.REACT_APP_DEPENSE_STREAM, 20),
    ia: parseEnvNumber(process.env.REACT_APP_DEPENSE_IA, 55),
    internet: parseEnvNumber(process.env.REACT_APP_DEPENSE_INTERNET, 30),
    telFranck: parseEnvNumber(process.env.REACT_APP_DEPENSE_TEL_FRANCK, 9.99),
    telGabriel: parseEnvNumber(process.env.REACT_APP_DEPENSE_TEL_GABRIEL, 14.99),
    // Projet
    mensualiteTravaux: parseEnvNumber(process.env.REACT_APP_PROJET_MENSUALITE, 401),
    totalTravaux: parseEnvNumber(process.env.REACT_APP_PROJET_TOTAL, 19248),
    // Epargne
    livretA: parseEnvNumber(process.env.REACT_APP_EPARGNE_LIVRET_A, 3130),
    lep: parseEnvNumber(process.env.REACT_APP_EPARGNE_LEP, 3854),
    csl: parseEnvNumber(process.env.REACT_APP_EPARGNE_CSL, 1203),
    partsSociales: parseEnvNumber(process.env.REACT_APP_EPARGNE_PARTS, 224),
    interessement: parseEnvNumber(process.env.REACT_APP_EPARGNE_INTERESSEMENT, 896),
    primeJanvierStock: parseEnvNumber(process.env.REACT_APP_EPARGNE_PRIME_JANVIER, 2000),
  }
}
