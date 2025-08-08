## 📸 Screenshot
<img width="1302" height="647" alt="Screenshot 2025-08-08 122703" src="https://github.com/user-attachments/assets/e8c7658d-8a48-4be0-a5c4-6cdd7d8b79d7" />

---

# VibeCircle — Frontend

<img width="100%" alt="Project Banner" src="https://github.com/user-attachments/assets/96a681af-beb9-4023-850b-4c575d9cf959" />

## 🔎 Description
FreelanceTasker is a marketplace-style web app where individuals post small tasks and freelancers bid on them. The frontend (React + Tailwind) provides routes for browsing tasks, posting new tasks (protected), viewing task details, managing the user's posted tasks, and placing bids. Includes auth (Email/Password + Google), dark/light theme, carousel banner, toasts, and loading states.

- **Live demo:** `Live Link : https://assignment-12-1f976.web.app` 

---

## 🧰 Technologies Used
- React (Vite)
- React Router v6
- Tailwind CSS
- Firebase Authentication (Email/Password + Google)
- Axios
- react-hot-toast
- react-datepicker
- react-simple-typewriter (banner)
- swiper or react-slick (carousel)
- react-modal or headlessui (modals)



---

## 🚀 Core Features
- Email/password + Google authentication (Firebase)
- Protected routes: Add Task, My Posted Tasks, Task Details
- Task CRUD (Add/Edit/Delete) — Add is private, Update/Delete only by owner
- Browse all tasks with card layout and pagination
- Featured Tasks: 6 tasks by soonest deadline (from API)
- Task Details page with bidding (increment bidsCount)
- My Posted Tasks (table) — Update, Delete, View Bids
- Loading spinner and toasts for success/error
- Dark / Light theme toggle
- Banner carousel (3+ slides), and animated typewriter effect
- React-simple-typewriter integration for the banner

---

## 📦 Main dependencies
```text
react, react-dom, react-router-dom, axios
tailwindcss, postcss, autoprefixer
firebase
react-hot-toast
react-datepicker
react-simple-typewriter
swiper (or react-slick)
react-modal (or @headlessui/react)
clsx (or classnames)
