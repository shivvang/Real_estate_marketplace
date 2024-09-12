
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

- **Backend:**
  - **Express.js:** Framework used for server-side routing and logic.
  - **MongoDB & Mongoose:** For database management, schema design, and advanced querying.

- **Authentication & File Storage:**
  - **Firebase:** Handles user authentication via Google Auth and stores property-related files.
