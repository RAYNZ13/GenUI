# GenUI

GenUI is a modern React-based project showcasing reusable UI components and smooth design patterns.  
Deployed with **Firebase Hosting** and integrated with **GitHub Actions** for continuous deployment.

## 🚀 Features

- Built with **React** + **Vite**
- Firebase Hosting deployment
- GitHub Actions for automatic CI/CD
- Responsive and reusable UI components
- Modern animations and clean design

## 📂 Project Structure

```
├── public/             # Static assets
├── src/                # React components, pages, and styles
├── dist/               # Production build output
├── .github/workflows/  # GitHub Actions workflow
├── firebase.json       # Firebase Hosting config
├── package.json        # Dependencies and scripts
└── README.md
```

## 🔧 Setup & Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/genui.git
cd genui
npm install
```

## 🛠 Development

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Deploy to Firebase manually:

```bash
firebase deploy
```

## 🤖 GitHub Actions (CI/CD)

Every push to the `main` branch triggers:

- Build with Node.js
- Deploy to Firebase Hosting automatically

Workflow file: `.github/workflows/firebase-deploy.yml`

## 🌐 Live Demo

👉 [GenUI on Firebase Hosting](https://genui-react-app.web.app)

## 📝 License

This project is licensed under the MIT License.

---

Made with ❤️ using React and Firebase.
