# Replit Setup Instructions

**IMPORTANT: Do NOT modify, rewrite, or "improve" any source code files. Only run the commands listed below. Do not add files, do not refactor, do not install extra packages beyond what is listed. Follow these steps exactly.**

---

## Step 1: Set Node version

This project requires Node 18+. In the Replit shell:

```bash
node --version
```

If below 18, set it in `.replit` or `replit.nix`:

```nix
{ pkgs }: {
  deps = [
    pkgs.nodejs_20
    pkgs.nodePackages.npm
  ];
}
```

---

## Step 2: Install dependencies from the root

Run this single command from the project root (`/home/runner/DrawAI` or wherever the repo is cloned):

```bash
npm install
```

This uses npm workspaces and will install dependencies for all packages (`packages/core`, `packages/aps-client`, `apps/web`) in one pass. Do NOT cd into subdirectories and run npm install separately.

---

## Step 3: Build the shared packages

The web app depends on `@drawai/core` and `@drawai/aps-client`. Build them first:

```bash
npm run build:core
npm run build:aps
```

---

## Step 4: Run the web app in dev mode

```bash
npm run dev
```

This starts the Vite dev server on port 3000. If Replit needs a different port, edit `apps/web/vite.config.ts` line 14 — change `port: 3000` to whatever Replit assigns. That is the ONLY edit allowed.

---

## Step 5: Configure Replit run command

In `.replit`, set:

```toml
run = "npm run dev"

[nix]
channel = "stable-24_05"

[[ports]]
localPort = 3000
externalPort = 80
```

---

## What NOT to do

- Do NOT run `npm init` or overwrite `package.json`
- Do NOT install additional dependencies unless explicitly asked
- Do NOT modify any `.ts`, `.tsx`, `.css`, `.cs`, `.cpp`, `.h`, or `.json` source files
- Do NOT create new files
- Do NOT convert the project to a different framework
- Do NOT add a `start` script that differs from `vite`
- Do NOT touch the `apps/unreal/` or `apps/revit-plugin/` directories — those are not runnable on Replit

---

## Expected result

After these steps, opening the Replit webview should show the DrawAI dashboard — a white-themed UI with frosted glass panels, showing "New Project" cards for Healthcare Clinic and K-12 Education Wing, and a Recent Projects section.
