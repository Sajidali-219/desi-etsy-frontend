# 🛍️ Desi Etsy – Niche E-Commerce Platform (Frontend)

Desi Etsy is a niche e-commerce platform designed for local Indian artisans to showcase and sell handmade products directly to customers.  
This repository contains the **complete frontend** built using **React + TailwindCSS**.

The backend (Node.js + Express + MongoDB) is maintained in a separate repository and must be running to access full functionality such as login, product creation, admin approvals, etc.

---

## 🚀 Features (Frontend)

### 🧑‍🤝‍🧑 Customer Features
- Browse all handmade products  
- Product filtering (category + search)  
- Add to Cart / Remove / Checkout  
- Customer Login & Registration  
- Order simulation (frontend only)

### 🎨 Artisan Features
- Artisan Registration & Login  
- Artisan Dashboard  
- Add / Edit / Delete Products  
- Manage Product Listings  

### 🛡 Admin Features
- Admin Login  
- Dashboard Overview  
- Approve / Reject Artisan Accounts  
- Approve / Reject Products  

### 🎯 Additional Frontend Features
- Clean, responsive layout (Tailwind)  
- Toast notifications  
- Empty state UIs  
- Mobile-friendly navbar  
- Local fallback for safe demo  
- Professional UI/UX polish  

---

## 📁 Folder Structure

src/
│── components/
│── context/
│── pages/
│── data/
│── layout/
│── utils/
│── App.jsx
│── main.jsx
public/
tailwind.config.js

yaml
Copy code

---

## ⚙️ Tech Stack (Frontend)

- **ReactJS**
- **Vite**
- **Tailwind CSS**
- **Axios**
- **React Router**
- **LocalStorage Authentication (Customer)**  

---

## 🚦 How to Run (Frontend Only)

```bash
npm install
npm run dev
This will start the frontend server on:

arduino
Copy code
http://localhost:5173/
⚠️ IMPORTANT (PLEASE READ)
This project is part of a full-stack system.

✅ To access the complete working website, you must also run the backend:
Customer login

Artisan login

Admin login

Product creation

Image upload

Order checkout

Product approval

None of these will work unless the backend server is running.

❗ Why?
Because this frontend communicates with the backend via REST APIs:

bash
Copy code
GET /products
POST /login
POST /register
POST /artisan/products
GET /admin/artisans
...
Without the backend, the frontend will:

Show no products

Prevent login

Show demo placeholders only (if fallback is enabled)

This is expected behavior for all real e-commerce systems.

🧑‍💻 Project Status
We are new developers building this full-stack system as part of an internship/learning project.
The frontend is fully complete and structured professionally.
Backend is actively being improved for stability and security.

🤝 Contributors
Frontend Developer
Sajidali Ansari – React + Tailwind

Backend Developer
Juned Pathan – Node.js + Express + MongoDB

📜 License
This project is for educational and internship evaluation purposes.
