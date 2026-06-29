# Deployment Guide - cPanel Hosting (Hosting.com / Other providers)

Since this is a Next.js 16 application with API routes, it requires a Node.js server environment to run the backend form submissions. 

Follow these steps to deploy on a cPanel account supporting Node.js.

---

## Prerequisites
- cPanel account with **Setup Node.js App** (LVE Manager) enabled.
- Domain pointing to your cPanel hosting IP.
- SSL Certificate (AutoSSL or Let's Encrypt activated).

---

## Step 1: Prepare the Build Archive
1. In your local repository, run the production build:
   ```bash
   npm run build
   ```
2. Compress the following files into a single `.zip` file:
   - `.next/`
   - `public/`
   - `src/` (optional for execution, but keeps codebase complete)
   - `package.json`
   - `package-lock.json`
   - `next.config.mjs`
   - `postcss.config.mjs`

---

## Step 2: Configure Node.js in cPanel
1. Log into your cPanel account.
2. Search for and click on **Setup Node.js App**.
3. Click **Create Application**.
4. Configure the parameters:
   - **Node.js Version**: Select `18.x` or `20.x` (or newer).
   - **Application Mode**: `Production`.
   - **Application Root**: e.g., `biocare-app` (where you will upload the files).
   - **Application URL**: Select `biocarehealthsystems.co.ke`.
   - **Application Startup File**: Enter `node_modules/next/dist/bin/next`.
5. Click **Create**. This initializes the application directory and a mock entry point.

---

## Step 3: Upload and Extract Files
1. Open cPanel **File Manager**.
2. Navigate to your application root folder (e.g. `biocare-app`).
3. Upload the `.zip` archive generated in Step 1.
4. Extract the `.zip` file here (ensure hidden files like `.next` are correctly extracted).

---

## Step 4: Install Packages & Run Start
1. Go back to **Setup Node.js App** in cPanel.
2. Under **Configuration**, edit your environment variables to add:
   - `PORT`: Set to standard port provided by host.
   - `SENDGRID_API_KEY`: Your production API key.
   - `CONTACT_EMAIL_TO`: `contact@biocarehealthsystems.co.ke`.
   - `CONTACT_EMAIL_FROM`: Your verified SendGrid sender.
3. Click **Run JS NPM Install** to install dependencies from `package.json` on the server.
4. Once completed, click **Restart Application**.

---

## Option B: Static Export (API routes not supported)
If your cPanel provider does NOT support Node.js applications, you can export the site as static HTML:
1. Edit `next.config.mjs` to add output:
   ```javascript
   const nextConfig = {
     output: 'export',
     // ...
   };
   ```
2. Run compilation:
   ```bash
   npm run build
   ```
3. This creates an `out/` folder in the root.
4. Upload all contents of the `out/` folder directly to cPanel `public_html/`.
5. *Note: The clientside form will not execute API route emails. You must change the form submission action to redirect to a PHP mailer script or standard `mailto:` link.*
