# 🛒 Products Cart Frontend

A simple shopping cart interface built with vanilla JavaScript. Displays product cards and manages cart operations with localStorage persistence.

## 📐 Architecture

```
index.html
    │
    ├── css/style.css          ← Styles (compiled from SCSS)
    ├── scss/
    │   ├── _variables.scss    ← SCSS variables
    │   └── style.scss         ← Main SCSS
    │
    └── js/script.js           ← Core logic
            │
            ├── Fetch products from API (npoint.io)
            ├── Render product cards
            ├── Cart management (add/remove/quantity)
            └── localStorage persistence
```

## 🛠 Tech Stack

- **HTML5** / **SCSS** / **Vanilla JS**
- **localStorage** for cart persistence
- **Fetch API** for product data

## 📦 Local Data

`db.json` — sample product catalog (4 smartphones)

## ▶️ Run

Open `index.html` in a browser. No build step required.
