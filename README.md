

# Real Estate Marketplace

Welcome to the **Real Estate Marketplace** repository! This project is a comprehensive real estate platform designed to facilitate property listing, searching, and user management. Built with modern web technologies, it provides an advanced search engine, user role management, and seamless integration with Firebase for authentication and file storage.

## 📜 Features

### Property Management

- **Role-Based Routing:** Different access levels for users and administrators, allowing for role-specific functionalities.
- **Property Listings Management:** Create, update, and delete property listings with ease.
- **Last Visited Property:** Users can view their recently visited properties for quick access.
- **Commenting System:** Users can comment on properties, and comments are displayed on user home pages.

### Search Functionality

- **Advanced Search Engine:** Handle multiple search inputs like "2 BHK," "3 BHK," specific locations, price ranges (e.g., "1 Cr"), and other criteria.
- **Cost Slider:** Allows users to filter properties based on a minimum to maximum price range.
- **Property Type Filters:** Filter properties by type (e.g., residential, commercial).

### Data Management

- **MongoDB Aggregation Pipeline:** Utilized for complex queries and data manipulation.
- **Regex Functions:** Used to handle and interpret search terms effectively.

### Authentication & File Storage

- **Google Authentication:** Integrated via Firebase for secure user authentication.
- **File Storage:** Utilizes Firebase for storing and managing property-related files.

## 🛠️ Technologies Used

- **Frontend:**
  - **React:** For building interactive and dynamic user interfaces.
  - **Tailwind CSS:** For responsive and modern styling.
  - **Redux:** For state management.

- **Backend:**
  - **Express.js:** Framework used for server-side routing and logic.
  - **MongoDB & Mongoose:** For database management, schema design, and advanced querying.

- **Authentication & File Storage:**
  - **Firebase:** Handles user authentication via Google Auth and stores property-related files.

---

## Getting Started

To get the Real Estate Marketplace up and running on your local machine, follow these steps:

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/shivvang/Real_estate_marketplace.git
cd Real_estate_marketplace
```

### 2. Install Dependencies

**Backend:**

1. Navigate to the root directory of the project where the `package.json` for the backend is located.
2. Install the backend dependencies:

   ```bash
   npm install
   ```

**Frontend:**

1. Navigate to the `client` directory:

   ```bash
   cd client
   ```

2. Install the frontend dependencies:

   ```bash
   npm install
   ```

### 3. Set Up Google Firebase

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project or use an existing one.
3. Configure Firebase Authentication:
   - Enable Google Sign-In under the Authentication section.
4. Set up Firebase Firestore or Realtime Database if you plan to use these services.
5. Obtain your Firebase configuration object from the Firebase Console (it includes API keys and other configuration details).

### 4. Configure Environment Variables

1. in the `client/src/firebase.js` directory add your Firebase configuration details:

   ```plaintext
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   ```

2. Ensure that the Firebase configuration is properly integrated into the frontend code, particularly in `client/src/firebase.js` or similar configuration file.

### 5. Run the Project

**Backend:**

1. Start the backend server from the root directory:

   ```bash
   npm start
   ```

**Frontend:**

1. Navigate to the `client` directory:

   ```bash
   cd client
   ```

2. Start the frontend development server:

   ```bash
   npm run dev
   ```

---

Happy coding!

