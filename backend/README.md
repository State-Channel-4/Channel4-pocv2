# Contributing to Channel4-poc2

Thank you for your interest in contributing to Channel4-poc2! We welcome contributions from the community to help improve and enhance the project.

## Build Instructions

To build and run the project locally, follow these steps:

1. **Clone the repository:**
   `git clone https://github.com/State-Channel-4/Channel4-pocv2.git`

2. **Navigate to the project directory:**
   `cd Channel4-pocv2`

3. **Install dependencies:**
   `npm install` OR `pnpm install`

4. **Set up the MongoDB database:**

- Make sure you have MongoDB installed and running locally.
- Create a new MongoDB database for the project.
- Update the MongoDB connection URI in .env file.

5. **Populate the MongoDB database with sample data:**

- Run the following command to populate the database with fake data:

  ```
  node scripts/populateDB.js
  ```

6. **Start the backend server:**

The server should start running at http://localhost:8000. OR whatever port you specified in .env file
