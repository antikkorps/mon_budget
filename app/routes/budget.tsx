import {
  AlertCircle,
  Calculator,
  PiggyBank,
  ShieldCheck,
  TrendingUp,
  Utensils,
  Wallet,
} from "lucide-react"
import { useLoaderData } from "react-router"
import { calculateBudget, loadBudgetFromEnv, type BudgetData } from "~/lib/budget"
import type { Route } from "./+types/budget"

// --- LOADER ---
export function loader(): BudgetData {
  return loadBudgetFromEnv()
}

// --- META ---
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Pilotage Financier - Budget Builder" },
    { name: "description", content: "Simulateur de budget personnel" },
  ]
}

// --- COMPOSANT UI ---
export default function BudgetBuilder() {
  const data = useLoaderData<typeof loader>()
  const calc = calculateBudget(data)

  // Solde avant projet (revenus - charges fixes)
  const soldeAvantProjet = calc.totalRevenus - calc.totalDepensesFixes

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 py-6 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl font-sans text-slate-800 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 px-6 py-5 text-white">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Calculator className="w-7 h-7" /> Pilotage Financier
          </h1>
          <p className="text-blue-200 text-sm mt-1">
            Configuration via variables d'environnement (.env)
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* GAUCHE : LES CHIFFRES */}
            <div className="lg:col-span-7 space-y-6">
              {/* Revenus et Dépenses côte à côte */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. REVENUS */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col">
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-green-100">
                    <div className="p-1.5 bg-green-100 rounded-lg">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                    <h3 className="font-bold text-green-800 uppercase text-xs tracking-wider">
                      Revenus Mensuels
                    </h3>
                  </div>
                  <div className="space-y-2 text-sm flex-grow">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Salaire Net</span>
                      <span className="font-semibold">
                        {data.salaire.toLocaleString()} €
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Locatif (Net)</span>
                      <span>{data.revenuLocatif.toLocaleString()} €</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 flex items-center gap-1">
                        <Utensils className="w-3 h-3" /> Tickets Resto
                      </span>
                      <span className="text-green-600 font-medium">
                        {data.ticketsResto} €
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Google Reward</span>
                      <span>{data.googleReward} €</span>
                    </div>
                  </div>
                  <div className="mt-auto pt-3 border-t border-green-100 flex justify-between font-bold text-green-700 bg-green-50 -mx-4 -mb-4 px-4 py-3 rounded-b-xl">
                    <span>Total Entrées</span>
                    <span>{calc.totalRevenus.toLocaleString()} €</span>
                  </div>
                </div>

                {/* 2. DEPENSES */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col">
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-red-100">
                    <div className="p-1.5 bg-red-100 rounded-lg">
                      <AlertCircle className="w-4 h-4 text-red-600" />
                    </div>
                    <h3 className="font-bold text-red-800 uppercase text-xs tracking-wider">
                      Charges Fixes
                    </h3>
                  </div>
                  <div className="space-y-1.5 text-sm flex-grow">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Pension Alimentaire</span>
                      <span>{data.pension} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Voiture</span>
                      <span>{data.voiture} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Charges Couple</span>
                      <span>{data.chargesCouple} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Nourriture</span>
                      <span>{data.nourriture} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Immobilier Loc.</span>
                      <span>{data.chargesLocatif + data.creditLocatif} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Prévoyance</span>
                      <span>{data.prevoyance} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Abo. Stream</span>
                      <span>{data.stream} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Abo. IA</span>
                      <span>{data.ia} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Internet</span>
                      <span>{data.internet} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Tél. Franck</span>
                      <span>{data.telFranck} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Tél. Gabriel</span>
                      <span>{data.telGabriel} €</span>
                    </div>
                  </div>
                  <div className="mt-auto pt-3 border-t border-red-100 flex justify-between font-bold text-red-700 bg-red-50 -mx-4 -mb-4 px-4 py-3 rounded-b-xl">
                    <span>Total Sorties</span>
                    <span>{calc.totalDepensesFixes.toLocaleString()} €</span>
                  </div>
                </div>
              </div>

              {/* Balance avant projet */}
              <div className="flex items-center justify-between bg-slate-100 rounded-xl p-4">
                <div className="flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-slate-500" />
                  <span className="font-medium text-slate-700">Solde avant projet</span>
                </div>
                <span
                  className={`text-xl font-bold ${soldeAvantProjet >= 0 ? "text-green-600" : "text-red-600"}`}
                >
                  {soldeAvantProjet >= 0 ? "+" : ""}
                  {soldeAvantProjet.toLocaleString()} €
                </span>
              </div>

              {/* 3. PROJET */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-blue-200">
                  <div className="p-1.5 bg-blue-100 rounded-lg">
                    <Calculator className="w-4 h-4 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-blue-900 uppercase text-xs tracking-wider">
                    Projet Travaux ITE
                  </h3>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="text-center md:text-left">
                    <p className="text-xs text-blue-600 mb-1">Coût total</p>
                    <span className="text-2xl font-bold text-blue-900">
                      {data.totalTravaux.toLocaleString()} €
                    </span>
                  </div>
                  <div className="text-center md:text-right">
                    <p className="text-xs text-blue-600 mb-1">Mensualité crédit</p>
                    <span className="inline-block px-4 py-2 bg-white border-2 border-blue-300 rounded-xl font-bold text-blue-900 text-xl shadow-sm">
                      {data.mensualiteTravaux} €
                    </span>
                  </div>
                </div>
              </div>

              {/* 4. EPARGNE (STOCK) */}
              <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-purple-100">
                  <div className="p-1.5 bg-purple-100 rounded-lg">
                    <PiggyBank className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-purple-800 uppercase text-sm tracking-wider">
                    Votre Épargne
                  </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                  <div className="bg-purple-50 rounded-lg p-2.5">
                    <span className="text-purple-600 text-xs font-medium block mb-1">
                      LEP
                    </span>
                    <span className="font-bold text-purple-900">
                      {data.lep.toLocaleString()} €
                    </span>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2.5">
                    <span className="text-slate-500 text-xs font-medium block mb-1">
                      Livret A
                    </span>
                    <span className="font-semibold">
                      {data.livretA.toLocaleString()} €
                    </span>
                  </div>
                  <div className="bg-green-50 rounded-lg p-2.5 border border-green-200">
                    <span className="text-green-600 text-xs font-medium block mb-1">
                      Prime Janvier
                    </span>
                    <span className="font-bold text-green-700">
                      {data.primeJanvierStock.toLocaleString()} €
                    </span>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2.5">
                    <span className="text-slate-500 text-xs font-medium block mb-1">
                      CSL
                    </span>
                    <span className="font-semibold">{data.csl.toLocaleString()} €</span>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2.5">
                    <span className="text-slate-500 text-xs font-medium block mb-1">
                      Intéressement
                    </span>
                    <span className="font-semibold">
                      {data.interessement.toLocaleString()} €
                    </span>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2.5">
                    <span className="text-slate-500 text-xs font-medium block mb-1">
                      Parts Sociales
                    </span>
                    <span className="font-semibold">
                      {data.partsSociales.toLocaleString()} €
                    </span>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-purple-100 flex justify-between items-center">
                  <span className="text-purple-900 font-medium">Total Disponible</span>
                  <span className="text-2xl font-bold text-purple-700">
                    {calc.totalEpargne.toLocaleString()} €
                  </span>
                </div>
              </div>
            </div>

            {/* DROITE : RESULTATS */}
            <div className="lg:col-span-5 space-y-6">
              {/* Carte Principale */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Reste à vivre Mensuel
                </h3>
                <div
                  className={`text-5xl font-bold mb-1 ${
                    calc.resteAvecTravaux > 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {calc.resteAvecTravaux.toLocaleString()} €
                </div>
                <p className="text-slate-400 text-sm mb-6">
                  Après paiement des travaux et charges
                </p>

                <div className="bg-slate-700/50 rounded-xl p-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-300">Taux d'effort</span>
                    <span
                      className={`font-bold ${calc.tauxEffortProjet > 85 ? "text-red-400" : "text-green-400"}`}
                    >
                      {calc.tauxEffortProjet.toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-600 h-3 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        calc.tauxEffortProjet > 85 ? "bg-red-500" : "bg-green-500"
                      }`}
                      style={{ width: `${Math.min(calc.tauxEffortProjet, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-2">Recommandé : moins de 85%</p>
                </div>
              </div>

              {/* Carte Sécurité */}
              <div className="bg-white border border-purple-200 rounded-2xl shadow-sm p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <ShieldCheck className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-purple-900">Sécurité Financière</h3>
                </div>

                <div className="space-y-4">
                  <div className="bg-purple-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-purple-700">Couverture travaux</span>
                      <span className="font-bold text-purple-900 text-lg">
                        {calc.moisTravauxSeuls.toFixed(0)} mois
                      </span>
                    </div>
                    <p className="text-xs text-purple-600">
                      Soit <strong>{(calc.moisTravauxSeuls / 12).toFixed(1)} ans</strong>{" "}
                      de mensualités couvertes par l'épargne
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-600">Autonomie totale</span>
                      <span className="font-bold text-slate-800 text-lg">
                        {calc.moisAutonomie.toFixed(1)} mois
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Si tous les revenus s'arrêtent (crash test)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
