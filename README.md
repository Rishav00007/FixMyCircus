# 🏙️ FixMyCircus – Complaint Management System  
_A complete MERN-stack project for managing public complaints with geolocation, image uploads, and role-based access._

---

## 📖 Overview

**FixMyCircus** (also known as *The Caravan Chronicle*) is a full-stack web application that enables citizens to file complaints about civic issues such as roads, water, and waste.  
Staff and admins can view, manage, and resolve these complaints efficiently. The system also integrates maps for geolocation and supports image uploads for better issue tracking.

---

## 🚀 Features

### 👥 User Roles
- **Citizen:** Register, log in, create complaints, view personal complaints.
- **Staff:** View assigned complaints, update their status.
- **Admin:** View all complaints, assign staff, generate reports, and manage users.

### 🧾 Core Modules
- Complaint creation (with photo + auto detect location)
- JWT-based authentication
- Role-based route protection
- Cloudinary photo uploads via Multer
- Complaint filtering and sorting
- Admin report generation
- Responsive dashboard and forms

---

## 🏗️ Tech Stack

### Frontend
- ⚛️ React (Vite)
- 🧭 React Router DOM
- 🗺️ React Leaflet + OpenStreetMap
- 🎨 Tailwind CSS
- 🎞️ Framer Motion (animations)
- 📦 Axios (API requests)

### Backend
- 🟩 Node.js + Express.js
- 🍃 MongoDB + Mongoose
- ☁️ Cloudinary (image hosting)
- 📸 Multer (file uploads)
- 🔐 JSON Web Tokens (JWT)
- ⚙️ dotenv, express-async-handler, cors

---

## 🧩 Folder Structure

### Backend
