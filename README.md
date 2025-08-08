# VibeCircle — Frontend

## 📸 Screenshot
<img width="1302" height="647" alt="Screenshot 2025-08-08 122703" src="https://github.com/user-attachments/assets/e8c7658d-8a48-4be0-a5c4-6cdd7d8b79d7" />
- **Live demo:** `https://assignment-12-1f976.web.app` 
---



**# Description**
Social-Service Events is a community-driven forum and event platform built with the MERN stack. Users can create posts and events, search and filter by tags, comment, upvote/downvote, join events, and manage their posts. Admins can manage users, announcements, and reported activity. The app focuses on usability, security (JWT), and responsive design.

# Live project link
**Live Demo:** `https://assignment-12-1f976.web.app`  

**# Technologies used**
- **Frontend:** React (Vite), React Router v6, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Auth / Security:** JSON Web Tokens (JWT), bcrypt (password hashing)  
- **Utilities & UI:** react-hot-toast, react-datepicker, react-hook-form, react-select, react-share, react-simple-typewriter (or react-awesome-reveal), swiper/react (carousel)  
- **Dev Tools:** dotenv, nodemon, axios, CORS


**## Overview**
A concise community forum + event management platform where users can:
- Post content with tags, images, and descriptions.
- Search posts by tags (backend-powered search & filter).
- View post details, comment, upvote/downvote, and share posts.
- Create and join community events (future dates only).
- Manage posts and joined events in a dashboard.
- Become a paid member to unlock higher posting limits (membership badge).
- Admins can manage users, view reported comments, and create announcements.


**Main technologies used**
React, Vite, React Router

Tailwind CSS

Node.js, Express

MongoDB / Mongoose

JWT (jsonwebtoken)

react-hook-form, react-datepicker, react-share

axios, react-hot-toast

Core features
Authentication: Email/password registration + optional social login; password validation (uppercase, lowercase, min 6 chars). JWT returned on login/register and used for protected routes.

**Navbar**: Dynamic links (Home, Membership, Notifications, Join Us/Login). Profile picture dropdown with Dashboard, Logout.

**Search & Tags**: Backend search by post tags; tag list UI; search results show under the banner.

**Posts**: Create, read, edit (owner only), delete (optional owner only). Each post shows author, title, tags, time, votes, and comment count.

**Post details**: Author image/name, title, description, tag, time, upvote/downvote, share (react-share), and comment list. Only logged-in users can comment or vote.

**Voting**: upVote and downVote counters; total popularity computed as upVote - downVote. Sort posts by popularity (aggregation).

**Pagination**: Home page paginated (5 posts per page). Admin/user tables have pagination (10 rows/page).

**Comments & Reporting**: Separate comments collection; reporting mechanism with feedback dropdown; admins view & act on reports.

**Membership**: Payment page (mock/real) that upgrades a user to Gold badge; Gold users can post more than 5 posts.

**Dashboards**: User dashboard (My Profile, Add Post, My Posts) and Admin dashboard (Manage Users, Reported Activities, Make Announcement, Admin Profile).

**Events**: Create Event (future-only date enforced), Upcoming Events listing, Join Event (stores user-event join), Manage & Joined events pages.

**Theme toggle**: Dark / Light mode across the site.

**Notifications** / Announcements: Announcements stored in collection; notification icon shows count when announcements exist.

**Extras**: Carousel banner, gallery, newsletter UI section, toasts/sweet alerts for UX, and loading spinners.


**Dependencies** (example list)
Put these into your package.json for both frontend & backend as needed.

Frontend
less
Copy
Edit
react
react-dom
vite
react-router-dom
axios
tailwindcss
postcss
autoprefixer
react-hot-toast
react-hook-form
react-datepicker
react-select
react-share
react-simple-typewriter (or react-awesome-reveal)
swiper
react-modal (or @headlessui/react)
clsx
Backend
java
Copy
Edit
express
mongoose
cors
dotenv
bcryptjs
jsonwebtoken
express-validator
nodemon (dev)
Run locally — step-by-step
**1. Clone the repositories**
bash
Copy
Edit
# Frontend
git clone https://github.com/yourusername/social-events-frontend.git

# Backend
git clone https://github.com/yourusername/social-events-backend.git
**2. Backend setup**
bash
Copy
Edit
cd social-events-backend
cp .env.example .env
# Edit .env and provide values:
# PORT=5000
# MONGO_URI=your_mongo_uri
# JWT_SECRET=your_jwt_secret
npm install
npm run dev    # starts server with nodemon (or `node server.js`)
Example backend .env

ini
Copy
Edit
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/social_events?retryWrites=true&w=majority
JWT_SECRET=verysecretkey
JWT_EXPIRES_IN=7d
**3. Frontend setup**
bash
Copy
Edit
cd ../social-events-frontend
cp .env.example .env
# Edit .env (Vite) and provide values:
# VITE_API_BASE_URL=http://localhost:5000/api
npm install
npm run dev
Example frontend .env (Vite)

ini
Copy
Edit
**VITE_API_BASE_URL=http://localhost:5000/api
VITE_JWT_STORAGE_KEY=accessToken**
4. Seed data (optional)
Add a seed.js in backend to create sample users, posts, events, and tags. Run node seed.js to populate dev data (ensure MONGO_URI set).

5. Test flows
Open http://localhost:5173 (Vite default) and:

Register / Login (get JWT)

Create a post (observe Bronze badge)

Create events (future date)

Join events

Comment, upvote/downvote, share posts

Switch themes

**API endpoints** (examples)
bash
Copy
Edit
POST   /api/auth/register     -> register and return JWT
POST   /api/auth/login        -> login and return JWT
GET    /api/posts?search=&tag=&page=&limit=
GET    /api/posts/featured
GET    /api/posts/:id
POST   /api/posts             -> create post (protected)
PUT    /api/posts/:id         -> update post (owner)
DELETE /api/posts/:id         -> delete post (owner)
POST   /api/posts/:id/comment -> add comment (protected)
POST   /api/posts/:id/vote    -> upvote/downvote (protected)
POST   /api/events            -> create event (protected)
GET    /api/events/upcoming
POST   /api/events/:id/join   -> join event (protected)
GET    /api/users/:email/posts
GET    /api/users             -> admin user listing (paginated)
POST   /api/announcements     -> admin create announcement
GET    /api/announcements
POST   /api/reports           -> report comment/activity
GET    /api/reports           -> admin view reports
All protected routes require header:

makefile
Copy
Edit
Authorization: Bearer <JWT_TOKEN>
Live project links & resources
Frontend (live): https://your-frontend-live-url.com

Backend (API): https://your-backend-live-url.com/api

Postman collection: https://link-to-postman-collection

**Useful docs:**

React: https://reactjs.org/

Vite: https://vitejs.dev/

Tailwind: https://tailwindcss.com/docs

MongoDB Atlas: https://www.mongodb.com/cloud/atlas

JWT: https://jwt.io/introduction

react-hook-form: https://react-hook-form.com/

react-share: https://github.com/nygardk/react-share

Author & License
Author: Mohammad Arib Hasan — https://github.com/mohammadaribhasan
License: MIT

Notes:

Replace all your-... placeholders (repo URLs, live links, and .env secrets) with your real values.

If you want, I can fill this README with exact dependency versions (pulled from your package.json) and the real live links — paste package.json files and deployed URLs and I’ll update it.



