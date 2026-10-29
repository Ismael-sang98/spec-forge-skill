<div align="center">
  <img src="./assets/logo.svg" alt="SpecForge Logo" width="112" height="112" />
  <h1>SpecForge — Développement Piloté par Spécifications pour IA</h1>
  <p><strong>Zéro Hallucination. Zéro Code Spaghetti. Zéro Ligne de Code avant les Spécifications Validées.</strong></p>
  <p>
    <a href="./README.md">🇬🇧 English</a> &nbsp;|&nbsp;
    <strong>🇫🇷 Français</strong> &nbsp;|&nbsp;
    <a href="./README.tr.md">🇹🇷 Türkçe</a>
  </p>
</div>

---

## Pourquoi SpecForge ?

Lorsqu'un agent IA commence à coder directement à partir d'une idée vague, il improvise des routes d'API, oublie les cas limites, mélange le vocabulaire métier et génère des composants géants impossibles à maintenir.

**SpecForge** transforme votre assistant IA (**Google Antigravity, Cursor, Claude Code, Windsurf, Copilot**) en un **Architecte Logiciel Senior** grâce au *Spec-Driven AI Development* :

1. **Verrou Technique Intelligent (`PreToolUse` Hook + Règle Globale)** : Sur tout nouveau projet, l'écriture de code applicatif est **physiquement bloquée** tant que le dossier `docs/` et `AGENTS.md` ne sont pas générés et validés à 100 %.
2. **Découverte Multimodale Assistée par un CTO (`spec-init`)** : Lit vos PDF, notes, tableaux de tarifs et maquettes Figma (`docs/maquettes/`), explore vos liens externes (docs d'API tierces, sites de référence), vous recommande la meilleure stack/architecture et mène une **interview en 4 phases sauvegardée** dans **votre langue** (Français, Turc, Anglais...).
3. **Pilotage sur Tout le Cycle de Vie** : Exécution par tranches verticales (`spec-slice`), évolution propre avec ADR en cours de route (`spec-evolve`), et audit sécurité pré-production (`spec-audit`).
4. **Universel (Web, Mobile, Desktop, Backend, CLI)** : Règles de code et commande `verify` adaptées nativement à TypeScript/React/Node, Flutter/Dart, Python, Java/Spring Boot, C#/.NET, Go et Rust.

---

## Installation Globale (En 1 Minute)

### Option A — Plugin Complet + Hook Smart Gate (Recommandé pour Antigravity & Multi-IDE)

**macOS & Linux :**
```bash
git clone https://github.com/Ismael-sang98/spec-forge-skill.git
cd spec-forge-skill
chmod +x install.sh && ./install.sh
```

**Windows (PowerShell) :**
```powershell
git clone https://github.com/Ismael-sang98/spec-forge-skill.git
cd spec-forge-skill
powershell -ExecutionPolicy Bypass -File .\install.ps1
```

**Ou directement avec le CLI Antigravity :**
```bash
agy plugin install ./spec-forge-skill
```

> **Important :** Redémarrez votre IDE IA une fois l'installation terminée pour activer le plugin global, le hook `PreToolUse` et les 4 skills.

### Option B — Via `npx skills` (Cursor, Claude Code, Windsurf, Copilot, Antigravity)

```bash
npx skills add Ismael-sang98/spec-forge-skill -g
```

---

## Les 4 Skills du Cycle de Vie

| Skill | Quand l'utiliser ? | Ce qu'il fait concrètement |
| :--- | :--- | :--- |
| **`spec-init`** | Démarrage d'un nouveau projet (ou rétro-cadrage d'un projet existant) | Scanne vos fichiers/maquettes et liens URL, pose des questions ciblées en **4 Phases** avec réponses `(Recommended)`, sauvegarde l'avancement dans `docs/.spec-state.json`, rédige tous les docs **sans aucun `[TODO]`** + le pack multi-équipe (`AGENTS.md`, `.cursorrules`, `CLAUDE.md`, `.env.example`, `verify`) et déverrouille le code (`READY_TO_CODE`). |
| **`spec-slice`** | Développement quotidien fonctionnalité par fonctionnalité | Prend la prochaine tranche `[ ]` dans `docs/07_IMPLEMENTATION_PLAN.md`, code verticalement (Validation $\rightarrow$ BDD $\rightarrow$ Service/ACID $\rightarrow$ Tests $\rightarrow$ UI), exécute `verify`, coche `[x]` et produit le rapport obligatoire. |
| **`spec-evolve`** | Ajout d'une feature ou changement en cours de projet | Évite toute dérive : crée un ADR numéroté (`docs/adr/NNNN-*.md`), met à jour les fichiers `docs/` impactés et ajoute la tranche au plan **avant** de modifier le code. |
| **`spec-audit`** | Revue qualité & passage en production | Vérifie l'alignement strict entre `docs/` et le code (zéro `any`/`dynamic`, glossaire, taille des fichiers, RBAC, transactions ACID), lance `verify` et contrôle 100 % de `docs/PROD_CONFIG.md`. |

---

## Fonctionnement du Verrou Intelligent (*Smart Gate*)

Installé globalement, `scripts/spec-gate.mjs` distingue intelligemment chaque situation :

- **Nouveau projet vide (`< 3` fichiers de code, pas de `docs/`)** : Bloque l'écriture de code (`deny`) et ordonne à l'IA de lancer **`spec-init`**.
- **Cadrage en cours (`docs/.spec-state.json` = `IN_PROGRESS`)** : Autorise l'écriture dans `docs/` et la gouvernance racine, mais garde le code verrouillé jusqu'à la validation finale de la Phase 4 (`READY_TO_CODE`).
- **Projet déjà cadré (`READY_TO_CODE` ou `docs/01_PRD.md` + `07_IMPLEMENTATION_PLAN.md` présents)** : Autorise le développement fluide sous l'autorité de `AGENTS.md`.
- **Ancien projet legacy (`>= 3` fichiers de code, sans `docs/`)** : Vous demande confirmation — vous pouvez lancer `spec-init` en **rétro-cadrage** ou créer un fichier `.spec-ignore` à la racine pour un dépannage rapide.

---

## Arborescence Générée dans Vos Projets (Profil Complet 14 Docs + Pack Équipe)

*(Un profil **Lean / MVP / Projet Universitaire en 8 Docs** est également proposé au démarrage pour les projets courts !)*

```text
MonProjet/
├── AGENTS.md                          # Constitution suprême & 12 Commandements adaptés à la stack
├── .cursorrules                       # Miroir automatique pour les coéquipiers sur Cursor
├── CLAUDE.md                          # Miroir automatique pour les coéquipiers sur Claude Code
├── .env.example                       # Matrice documentée des variables d'environnement
└── docs/
    ├── .spec-state.json               # Sauvegarde d'avancement des phases & statut READY_TO_CODE
    ├── README.md                      # Index centralisateur
    ├── GLOSSARY.md                    # Glossaire métier (Terme local <-> Identifiant Code Anglais)
    ├── ERROR_CATALOG.md               # Catalogue unifié des codes d'erreurs et messages
    ├── 01_PRD.md                      # Vision métier, personas, invariants & formules exactes
    ├── 02_TRD_TECHNICAL_SPEC.md       # Architecture, stack, contrats d'API & transactions ACID
    ├── 03_APPFLOW.md                  # Routes/commandes, diagrammes de séquence & machines à états
    ├── 04_DATABASE_SCHEMA.md          # ERD Mermaid, schéma ORM/SQL complet, index & cascades
    ├── 05_UI_UX_DESIGN.md             # Design tokens & mapping écrans (ou 05_INTERFACE_CONTRACT.md)
    ├── 06_CODING_RULES.md             # Clean architecture, limite <= 200 lignes & anti-patterns bannis
    ├── 07_IMPLEMENTATION_PLAN.md      # Feuille de route en tranches verticales à cocher [ ] / [x]
    ├── 08_TESTING_STRATEGY.md         # Pyramide de tests, factories & zones de couverture obligatoire
    ├── 09_RBAC_PERMISSIONS.md         # Matrice des rôles et permissions CRUD
    ├── PROD_CONFIG.md                 # Audit de sécurité et durcissement pré-production en 6 piliers
    ├── adr/                           # Registre immuable des décisions d'architecture (ADR)
    │   └── 0001-stack-and-architecture.md
    └── maquettes/                     # Exports Figma / wireframes / captures d'écran
```

---

## Licence

Distribué sous [Licence MIT](./LICENSE) — libre à partager avec vos amis et vos équipes sur GitHub !
