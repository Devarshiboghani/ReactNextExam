<div align="center">

# 🎓 Student Management System

### A modern, full-stack student records platform built with Next.js, MongoDB & Redux

</div>

---

## 📖 About

**Student Management System** is a full-stack web application that helps institutions manage student records with ease. It offers secure authentication, a clean dashboard, CRUD operations on student profiles, image uploads, and a fast global search — all wrapped in a responsive, modern UI powered by the Next.js App Router.

---

## ✨ Features

- 🔐 **Authentication** — Secure sign-up & sign-in with session-based auth
- 🧑‍🎓 **Student CRUD** — Add, view, edit, and delete student records
- 🔍 **Global Search** — Instantly filter students via React Context
- 🖼️ **Image Uploads** — Upload and manage student profile pictures
- 🗂️ **Dashboard** — Centralized view of all student data
- 🔄 **Redux State Management** — Predictable, centralized app state
- 📱 **Responsive UI** — Works seamlessly across devices
- ⚡ **API Routes** — Built-in Next.js REST API for auth & student data

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | [Next.js](https://nextjs.org/) (App Router) |
| **Frontend** | React, CSS Modules |
| **State Management** | Redux |
| **Global Search** | React Context API |
| **Database** | MongoDB (via Mongoose models) |
| **Image Handling** | Custom upload service |
| **Linting** | ESLint |

---

## 📁 Project Structure

```
student-management-system/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── login/         
│   │   │   │   └── signup/         
│   │   │   └── students/
│   │   │       ├── route.js        
│   │   │       └── [id]/route.js  
│   │   ├── add-student/            
│   │   ├── dashboard/             
│   │   ├── edit-student/           
│   │   ├── profile/               
│   │   ├── signin/                
│   │   ├── signup/                 
│   │   ├── layout.js
│   │   ├── page.js
│   │   ├── globals.css
│   │   └── StoreProvider.js      
│   ├── components/
│   │   ├── Navbar/
│   │   ├── StudentCard/
│   │   ├── StudentForm/
│   │   └── StudentList/
│   ├── context/
│   │   └── SearchContext.jsx       
│   ├── lib/
│   │   ├── connectDB.js           
│   │   └── model/
│   │       ├── Student.js         
│   │       └── User.js            
│   ├── redux/
│   │   ├── actions/
│   │   ├── reducers/
│   │   └── store.js
│   ├── services/
│   │   └── uploadImage.js          
│   └── utils/
│       └── auth.js                 
├── public/
├── .env.local
├── package.json
└── next.config.mjs
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- A MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Devarshiboghani/ReactNextExam.git
cd student-management-system

# 2. Install dependencies
npm install

#3. Start the development server
npm run dev

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

---

## 🔌 API Reference

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/signup` | Register a new user |
| `POST` | `/api/auth/login` | Authenticate an existing user |

### Students

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/students` | Fetch all students |
| `POST` | `/api/students` | Create a new student |
| `GET` | `/api/students/:id` | Fetch a single student |
| `PUT` | `/api/students/:id` | Update a student record |
| `DELETE` | `/api/students/:id` | Delete a student record |

---

## 🧩 Application Pages

| Route | Description |
|---|---|
| `/` | Landing page |
| `/signin` | User login |
| `/signup` | User registration |
| `/dashboard` | View all students |
| `/add-student` | Add a new student |
| `/edit-student` | Edit an existing student |
| `/profile` | View/manage user profile |