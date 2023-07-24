# Credit Card Luhn Validation Web App

This is a simple web application that allows users to validate credit card numbers using the Luhn algorithm. The application consists of both frontend and backend code.

## Features

- Card number formatting: The input for the card number is formatted automatically as the user types, displaying it in the format "xxxx-xxxx-xxxx-xxxx".
- Expiration date formatting: The input for the expiration date is formatted as "MM/YY" automatically.
- CVV handling: The input for the CVV is limited to three digits only.
- Name validation: The input for the name on the card is validated to accept only alphabetic characters.

### Backend

The backend code is implemented using Node.js and Express.js. It provides an API endpoint to validate credit card numbers using the Luhn algorithm.

### API Endpoint

- Endpoint: POST /api/v1/validate
- Input: The request body must contain a card_number field with the credit card number to be validated.
- Output: The API responds with a JSON object containing a message field indicating whether the credit card is valid or invalid.

### Frontend

The frontend code is implemented using React.js and provides a user-friendly interface to input credit card details and check their validity.

### Luhn Validation Algorithm

The Luhn algorithm is used to verify the validity of the credit card number provided. It ensures that the entered card number has a valid checksum and adheres to the Luhn formula.
If the card number is valid, the API will respond with a success message; otherwise, it will return an error message.

### Technologies Used

- Vite.js + React.js
- Node.js

## Prerequisites

Before running the script, make sure you have the following:

- Node.js installed on your machine.

## Setup

1. Clone the repository.
   ```bash
   git clone https://github.com/Dr-Dreams/LuhnValidationApp.git
   ```
2. Navigate to the project directory.
   ```bash
   cd LuhnValidationApp
   ```
3. Install the dependencies by running the following command in the project directory:
   ```bash
   npm run install-everything
   ```
4. Start the application:
   ```bash
   npm start
   ```
   This will start both the frontend and backend concurrently.
5. Access the Money Tracker web app in your browser at http://localhost:3000
