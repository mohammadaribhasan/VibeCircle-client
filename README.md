# MERN Stack Forum Application

Live Link : https://assignment-12-1f976.web.app

## Overview

This is a MERN (MongoDB, Express.js, React.js, Node.js) Stack Forum application designed as an online platform where users can hold conversations by posting messages. The app focuses on interactivity, scalability, and excellent user experience, including features like user authentication, post voting, comments, announcements, and admin management.

---

## Features

### HomePage

- **Navbar**  
  Displays logo, website name, Home, Membership, Notification icon, and "Join Us" button (Login) when not logged in.  
  When logged in, shows user profile picture with dropdown containing username, Dashboard link, and Logout button.

- **Banner Section**  
  Search bar to search posts by tags (backend-powered search). Search results appear below the banner.

- **Tags Section**  
  Shows all available tags users can click to filter posts by tag.

- **Announcements Section**  
  Displays announcements if any exist. If announcements exist, notification icon shows the count.

- **Posts Section**  
  Displays all posts ordered newest to oldest by default.  
  Shows author picture, post title, tags, time, comments count, and vote count (upvotes minus downvotes).  
  Includes "Sort by Popularity" to reorder posts by total vote counts descending.  
  Pagination enabled (5 posts per page).

---

### Post Details Page

- Shows post author image, name, title, description, tags, time posted, comment button, upvote/downvote icons, and share button.
- Comments section for logged-in users to add comments, vote, and share posts via social media using `react-share`.

---

### Membership Page (Private Route)

- Payment page for users to become members by paying a fee.
- Members receive a Gold badge and can post more than 5 posts.

---

### User Dashboard (Private Route)

- Dashboard layout with routes:
  - **My Profile:** User info, badges (Bronze for registration, Gold for membership), and 3 recent posts.
  - **Add Post:** Form for adding new posts with author info, post title, description, tags, and default votes. Normal users limited to 5 posts; exceeding users see a "Become a Member" button redirecting to Membership page.
  - **My Posts:** Tabular view of user's posts with title, votes, comment button, and delete option.

---

### Comments Page

- Displays comments for a post in a table with commenter email, comment text (truncated to 20 chars with "Read More" modal), feedback dropdown, and report button.
- Reporting a comment enables admin moderation.

---

### Authentication

- Join Us Page for login and registration using `react-hook-form`.
- Includes social login (e.g., Google).
- Badges assigned on registration (Bronze).

---

### Admin Dashboard (Private Route)

- Routes:
  - **Admin Profile:** Shows admin info, stats (number of posts, comments, users) with pie chart, and tag management.
  - **Manage Users:** Tabular user list with admin promotion and server-side search by username.
  - **Reported Comments/Activities:** View and moderate reported comments with relevant admin actions.
  - **Make Announcement:** Create announcements visible on Homepage.

---

## Technical Details

- **Backend:** Node.js, Express.js, MongoDB with collections for users, posts, comments, announcements, and tags.
- **Frontend:** React.js with React Router, react-hook-form, react-select (optional), react-share, and Tailwind CSS for styling.
- **Authentication:** Firebase Authentication with social login integration.
- **Data fetching:** Aggregation pipelines for sorting, pagination, and computing vote differences and comment counts.
- **Admin features:** Role-based access control, report moderation, user management, and announcement creation.

---

## Installation

1. Clone the repository:
   git clone <repo-url>
   cd <repo-folder>

markdown
Copy code

2. Install backend dependencies and start server:
   cd backend
   npm install
   npm run dev

markdown
Copy code

3. Install frontend dependencies and start client:
   cd ../frontend
   npm install
   npm start

yaml
Copy code

4. Configure `.env` files for backend (MongoDB URI, JWT secret, Firebase keys) and frontend (Firebase config).

---

## Usage

- Access homepage to browse posts, filter by tags, search, and see announcements.
- Register or login via Join Us page (including social login).
- Become a member to unlock premium features like posting more than 5 posts.
- Navigate user dashboard to manage profile, add posts, and view own posts.
- Use post detail pages to comment, vote, and share posts.
- Admin users can manage users, review reports, add tags, and make announcements.

---

## Notes

- Email verification and password reset are not enforced to avoid inconvenience.
- Comments are stored in a separate collection for scalability.
- Posts and comments support pagination for performance.
- Admin actions for reports are designed to mimic social media moderation.
- The project focuses on clean UI/UX with Tailwind CSS styling.

---

## Author

Developed by [Your Name] - Junior MERN Stack Developer.

---

## License

MIT License

---

## Acknowledgments

- React.js, Express.js, MongoDB, Node.js communities
- Firebase Authentication
- react-hook-form, react-select, react-share packages

---

## Contact

For questions or support, contact: your.email@example.com
