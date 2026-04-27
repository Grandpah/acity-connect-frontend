# CampusTrade ACITY (Frontend)

📌 Project Overview

CampusTrade ACITY is a smart campus marketplace and skill exchange platform designed for Academic City students.
It allows students to buy/sell second-hand items, offer skills, and connect within the campus community.

---

🌐 Live Deployment

Frontend (GitHub Pages):
https://grandpah.github.io/acity-connect-frontend/

Backend API (Render):
https://acity-connect-backend.onrender.com

---

🚀 Features Implemented

👤 User System

* User registration and login
* Restricted to ACity emails (@acity.edu.gh)
* Secure authentication using JWT

🛒 Marketplace & Listings

* Create listings (Items & Skills)
* Listings include:

  * Title
  * Description
  * Category
  * Status (Available, Sold, Swapped)
  * Search and filter system implemented

🤝 Interaction System

* Users can express interest in listings
* Interest request button available
* Interaction tracking via frontend counter

🛠️ Admin Features

* Listings require approval before becoming visible
* Admin moderation handled through backend/database
* Platform activity overview (listing counts)


🧪 How to Test

1. Register a user:

   * Use email ending with `@acity.edu.gh`

2. Login

3. Create a listing

4. Approve listing (Admin step):

```sql
UPDATE listings SET approved = true;
```

5. Refresh website → listing appears

---

🛠️ Technologies Used

* HTML
* CSS
* JavaScript (Vanilla)
* Fetch API
* GitHub Pages (Frontend Hosting)


📌 Notes

* Only approved listings are displayed
* Backend handles authentication and database operations
* Admin dashboard is simplified for demonstration purposes
