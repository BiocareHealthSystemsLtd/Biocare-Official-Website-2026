# Firebase Deployment Guide (Recommended)

Firebase Hosting provides a global CDN, free SSL certificates, and serverless hosting options. Since Next.js Pages router uses API routes, we can deploy the app to Firebase using Next.js integration.

---

## Step 1: Install Firebase CLI
1. Install global firebase-tools in your terminal:
   ```bash
   npm install -g firebase-tools
   ```
2. Log into your Google / Firebase account:
   ```bash
   firebase login
   ```

---

## Step 2: Initialize Firebase
1. In the project root, run the initialization command:
   ```bash
   firebase init hosting
   ```
2. Configure settings:
   - **Project Selection**: Select or create a Firebase project (e.g. `biocare-health-systems`).
   - **Public Directory**: Enter `.next` or `out` if you are using static export.
   - **Single Page App**: Select `No` (Next.js handling routing).
   - **Configure GitHub Actions**: Select `No` (or `Yes` if you want CI/CD).

---

## Step 3: Configure `firebase.json`
To support Next.js framework deployment, Firebase CLI will prompt to automatically use the framework integration. If it does not, configure `firebase.json` for static or serverless deployment:

```json
{
  "hosting": {
    "public": "public",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "cleanUrls": true,
    "trailingSlash": false
  }
}
```

---

## Step 4: Build & Deploy
1. Run the build command locally:
   ```bash
   npm run build
   ```
2. Deploy code:
   ```bash
   firebase deploy --only hosting
   ```
3. Firebase will provide a hosting URL (e.g. `biocare-health-systems.web.app`). Point your custom domain `biocarehealthsystems.co.ke` inside the Firebase Console settings.
