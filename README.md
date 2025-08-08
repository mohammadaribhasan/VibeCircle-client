# VibeCircle — Frontend

## 📸 Screenshot
<img width="1302" height="647" alt="Screenshot 2025-08-08 122703" src="https://github.com/user-attachments/assets/e8c7658d-8a48-4be0-a5c4-6cdd7d8b79d7" />
- **Live demo:** `https://assignment-12-1f976.web.app` 
---



# Description
Social-Service Events is a community-driven forum and event platform built with the MERN stack. Users can create posts and events, search and filter by tags, comment, upvote/downvote, join events, and manage their posts. Admins can manage users, announcements, and reported activity. The app focuses on usability, security (JWT), and responsive design.

# Live project link
**Live Demo:** `https://assignment-12-1f976.web.app`  

# Technologies used
- **Frontend:** React (Vite), React Router v6, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Auth / Security:** JSON Web Tokens (JWT), bcrypt (password hashing)  
- **Utilities & UI:** react-hot-toast, react-datepicker, react-hook-form, react-select, react-share, react-simple-typewriter (or react-awesome-reveal), swiper/react (carousel)  
- **Dev Tools:** dotenv, nodemon, axios, CORS

# README File

## Overview
A concise community forum + event management platform where users can:
- Post content with tags, images, and descriptions.
- Search posts by tags (backend-powered search & filter).
- View post details, comment, upvote/downvote, and share posts.
- Create and join community events (future dates only).
- Manage posts and joined events in a dashboard.
- Become a paid member to unlock higher posting limits (membership badge).
- Admins can manage users, view reported comments, and create announcements.


Main technologies used
React, Vite, React Router

Tailwind CSS

Node.js, Express

MongoDB / Mongoose

JWT (jsonwebtoken)

react-hook-form, react-datepicker, react-share

axios, react-hot-toast

Core features
Authentication: Email/password registration + optional social login; password validation (uppercase, lowercase, min 6 chars). JWT returned on login/register and used for protected routes.

Navbar: Dynamic links (Home, Membership, Notifications, Join Us/Login). Profile picture dropdown with Dashboard, Logout.

Search & Tags: Backend search by post tags; tag list UI; search results show under the banner.

Posts: Create, read, edit (owner only), delete (optional owner only). Each post shows author, title, tags, time, votes, and comment count.

Post details: Author image/name, title, description, tag, time, upvote/downvote, share (react-share), and comment list. Only logged-in users can comment or vote.

Voting: upVote and downVote counters; total popularity computed as upVote - downVote. Sort posts by popularity (aggregation).

Pagination: Home page paginated (5 posts per page). Admin/user tables have pagination (10 rows/page).

Comments & Reporting: Separate comments collection; reporting mechanism with feedback dropdown; admins view & act on reports.

Membership: Payment page (mock/real) that upgrades a user to Gold badge; Gold users can post more than 5 posts.

Dashboards: User dashboard (My Profile, Add Post, My Posts) and Admin dashboard (Manage Users, Reported Activities, Make Announcement, Admin Profile).

Events: Create Event (future-only date enforced), Upcoming Events listing, Join Event (stores user-event join), Manage & Joined events pages.

Theme toggle: Dark / Light mode across the site.

Notifications / Announcements: Announcements stored in collection; notification icon shows count when announcements exist.

Extras: Carousel banner, gallery, newsletter UI section, toasts/sweet alerts for UX, and loading spinners.
