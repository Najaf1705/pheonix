# 🔥 Pheonix

**Pheonix** is a modern, mobile-first React Native app built with Expo. It features user authentication, persistent login, a clean UI with NativeWind (Tailwind CSS), and a modular codebase using Zustand and React Query.

## 🛠️ Tech Stack

- **Expo Router**, React Native
- **Tailwind CSS** (via NativeWind)
- **React Query**, Zustand
- **Form Validation:** `react-hook-form` + `zod`
- **Persistent Storage:** `react-native-storage`
- **Lucide Icons**

---

## 📦 Getting Started

```bash
git clone https://github.com/Najaf1705/pheonix.git
cd pheonix/client
npm install
npm run android
```


# Save the backend README content as a README.md file

# 🔧 Pheonix API

This is the backend for the **Pheonix** app — a Node.js + Express server built with MongoDB, JWT auth, and dotenv configuration. It handles user authentication, data storage, and API routes for the React Native frontend.

---

## 🚀 Tech Stack

- **Node.js + Express** – API server
- **MongoDB + Mongoose** – NoSQL database
- **JWT** – Authentication
- **Dotenv** – Environment config
- **CORS** – Cross-origin requests

---

## ⚙️ Scripts

```bash
npm run build     # Install deps
npm run dev       # Start dev server with nodemon
npm start         # Start production server
```
## ⚙️ ENV

```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname
JWT_SECRET=your_jwt_secret
```
