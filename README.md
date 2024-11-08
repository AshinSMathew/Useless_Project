# AppamScope

This project is a web application that finds the number of holes in Appam, a popular dish from Kerala. The application uses a Flask backend to handle the image processing and a Next.js frontend for user interaction.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)

## Getting Started

These instructions will help you set up the project on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your machine:

- Python 3.x
- Node.js (with npm)
- Git

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/AshinSMathew/Useless_Project.git
2. **Set up the backend (Flask):**
   Navigate to the backend directory and install the required libraries:
   ```bash
   cd backend
   python -m venv venv               # Create a virtual environment (optional)
   source venv/bin/activate          # Activate the virtual environment (Linux/Mac)
   # venv\Scripts\activate             # Activate the virtual environment (Windows)
   pip install Flask Flask-RESTful    # Install Flask and other dependencies
   pip install opencv-python          # Install OpenCV for image processing
3. **Set up the frontend (Next.js):**
   Navigate to the frontend directory and install the required libraries:
   ```bash
   cd ../frontend
   npm install                         # Install Next.js and other dependencies

### Usage
1. **Run the Flask backend:**
   Navigate to the backend directory and run the Flask application:
   
   The backend will be running on http://127.0.0.1:5000
   ```bash
   cd backend
   python app.py                      # Replace 'app.py' with your main Flask file

3. **Run the Next.js frontend:**
   Open a new terminal, navigate to the frontend directory, and run the Next.js application:
   
   The frontend will be accessible at http://localhost:3000
    ```bash
    cd frontend
    npm run dev                        # Start the Next.js development server
