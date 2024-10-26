# Authentication and Crypto Autopay Payment Processing API

This web application allows users to securely store their subscriptions and manage autopayments using cryptocurrencies. The project leverages modern technologies and APIs to provide a seamless user experience for managing subscriptions.

## Features

- **User Subscription Storage**: Users can add, view, and manage their subscriptions in a centralized location.
- **Cryptocurrency AutoPay**: Automate payments using various cryptocurrencies, ensuring timely renewals without manual intervention.
- **Secure Data Storage**: User data is securely stored in MongoDB, ensuring reliability and scalability.
- **API Integration**:
  - **Binance API**: Facilitates cryptocurrency transactions with a trusted exchange.
  - **Crypto Wallet Integration**: Supports various crypto wallets, allowing users to choose their preferred payment method.
- **API Testing with Postman**: Utilizes Postman for efficient testing and validation of API endpoints, ensuring robust functionality.

## Technologies Used

- **Backend**: Node.js with Express for server-side logic and API handling.
- **Database**: MongoDB for data storage and management.
- **Cryptocurrency Integration**: Binance API for handling crypto transactions and wallet integration.
- **Frontend**: HTML, CSS, and JavaScript for the user interface.
- **Testing**: Postman for API testing and documentation.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [License](#license)

## Getting Started

To run this project locally, follow the steps below to set up the required environment and dependencies.

## Prerequisites

- **Node.js**: Version 14 or higher is recommended.
- **MongoDB Atlas**: An account to use MongoDB Atlas or a locally running MongoDB instance.
- **Environment Variables**: A `.env` file to store sensitive information.

## Installation

1. **Clone the repository**:
    ```bash
    git clone <your-repo-url>
    cd <your-project-directory>
    ```

2. **Install the required packages**:
    ```bash
    npm install
    ```

3. **Create a `.env` file** in the root directory and add the required environment variables (details below).

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```plaintext
PORT=3000                              # Port on which the server runs
MONGO_URI=<your_mongo_db_connection_string>   # MongoDB connection string
API_KEY=<your_api_key_for_external_api>       # API key for external API services
