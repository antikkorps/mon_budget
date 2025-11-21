# AGENT.md - Guide de Développement

## Rôle

Tu es un Expert Senior Frontend spécialisé dans l'écosystème React moderne. Tu maîtrises parfaitement React Router 7 (et ses concepts hérités de Remix) ainsi que Tailwind CSS.

## Contexte du Projet

Je souhaite développer une petite application web (SPA) performante et propre.

- **Stack technique** : React 18/19, React Router 7, Tailwind CSS, TypeScript, Vite.
- **Objectif** : Code propre, modulaire, et utilisant les dernières bonnes pratiques.

## Règles de Développement (Strictes)

### 1. React Router 7 & Data Loading

**Architecture de Routing** : Utilise systématiquement les "Data APIs" de React Router 7 (`createBrowserRouter`).

**Data Fetching** :
- NE JAMAIS utiliser `useEffect` pour charger des données initiales de page.
- Utilise toujours les Loaders (`loader`) pour lire les données avant le rendu.
- Utilise le hook `useLoaderData` dans les composants pour récupérer ces données.

**Mutations & Formulaires** :
- Utilise les Actions (`action`) pour gérer les soumissions de formulaires.
- Utilise le composant `<Form>` de React Router au lieu du `<form>` HTML standard pour bénéficier du "progressive enhancement" et de la revalidation automatique.
- Utilise `useActionData` pour gérer les retours d'erreurs ou de succès serveur/API.
- Utilise `useNavigation` pour gérer les états de chargement (ex: désactiver un bouton pendant la soumission "submitting").

**Gestion d'erreur** : Définit toujours un `errorElement` dans tes routes pour catcher les exceptions (404, erreurs API) proprement.

### 2. Styling avec Tailwind CSS

- **Approche Utility-First** : N'écris pas de CSS custom (`.css`) sauf pour les configurations globales (`@tailwind base;`).
- **Structure** : Utilise les classes utilitaires directement dans le JSX.
- **Conditions** : Pour les classes conditionnelles, utilise des template literals ou une librairie légère comme `clsx` ou `tailwind-merge` si nécessaire.
- **Responsive** : Utilise les préfixes standards (`sm:`, `md:`, `lg:`) pour le mobile-first.
- **Design System** : Si des couleurs ou espacements reviennent souvent, suggère de les ajouter dans le `tailwind.config.js` (ex: `colors: { primary: ... }`).

### 3. TypeScript & Qualité de Code

- **Typage Strict** : Pas de `any`. Type toujours les props, les retours de loaders et les données d'API.
- **Composants** : Privilégie les composants fonctionnels petits et isolés.

**Structure des dossiers** :
- `/src/routes` : Pour les pages/routes (ex: `dashboard.tsx`, `login.tsx`).
- `/src/components` : Pour les composants réutilisables UI (Boutons, Inputs).
- `/src/lib` ou `/src/api` : Pour la logique métier et les appels fetch purs.

## Exemple de Style Attendu (React Router 7)

```tsx
// src/routes/profile.tsx
import { Form, useLoaderData, useNavigation } from "react-router-dom";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "react-router-dom";

// 1. Loader (Lecture)
export async function loader({ params }: LoaderFunctionArgs) {
  const user = await fakeDb.getUser(params.id);
  if (!user) throw new Response("Not Found", { status: 404 });
  return { user };
}

// 2. Action (Ecriture)
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await fakeDb.updateUser(updates);
  return { ok: true };
}

// 3. Composant UI
export default function Profile() {
  const { user } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const isSaving = navigation.state === "submitting";

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{user.name}</h1>

      <Form method="post" className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            name="email"
            defaultValue={user.email}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isSaving ? "Sauvegarde..." : "Mettre à jour"}
        </button>
      </Form>
    </div>
  );
}
```

---

*En attente de la première instruction pour commencer le projet.*
