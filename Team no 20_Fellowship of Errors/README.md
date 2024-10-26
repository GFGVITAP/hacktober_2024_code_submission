
# WhistleSafe: Anonymous Reporting System

![WhistleSafe Logo](logo/Logo.jpg)


WhistleSafe is an anonymous reporting platform designed to enable individuals to securely submit reports on incidents and suspicions. With IBM Watsonx for natural language processing of the text report to extract key details and a custom deepfake detection pipeline for video validation, WhistleSafe ensures comprehensive review and management of reports via an interactive authority dashboard.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Getting Started](#getting-started)
4. [Usage Guide](#usage-guide)
5. [Project Structure](#project-structure)
6. [Contributing](#contributing)
7. [License](#license)
8. [Contact](#contact)

## Project Overview

The WhistleSafe platform provides a secure environment where users can report sensitive incidents anonymously. Reported videos are authenticated with deepfake detection algorithms, while IBM Watsonx analyzes report text for concise insights. An authority dashboard enables administrators to review reports, analyze media, update report statuses, and generate downloadable reports in real-time.

## Features

- **User Authentication**: Secure login for anonymous report submissions.
- **Deepfake Detection**: Video reports are analyzed using facial, frequency, and audio-visual consistency checks.
- **Natural Language Processing with IBM Watsonx**: Analyzes report text to extract structured information.
- **Admin Dashboard**: Allows administrators to review and analyze submissions, update statuses, and generate downloadable reports.
- **Status Management**: Reports can be marked as Accepted or Rejected, with feedback and download options.

## Getting Started

### Prerequisites

Ensure you have the following installed:
- **Python 3.8** or higher
- **pip** for Python package management

To install project dependencies, run:

```bash
pip install -r requirements.txt
```

### Installation

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/DPRASAD-dp/hacktober_2024_code_submission.git
    cd hacktober_2024_code_submission
    ```

2. **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

## Usage Guide

### User Dashboard (Reporters)

1. **User Login**: Users authenticate with username and password.

Use the default username : "reporter1" and default password : "password1" to login.

2. **Submit Reports**: Upload a video (e.g., `.mp4` or `.avi` format) and provide text details in the provided text area.
3. **View Past Submissions**: Users can review previous reports and track the status (Pending, Accepted, or Rejected).

### Authority Dashboard (Admin)

1. **Access the Dashboard**: Admins log into a separate dashboard for reviewing user submissions.
2. **Review Reports**:
   - Play the uploaded video and analyze text reports.
   - Utilize IBM Watsonx for structured text insights and deepfake detection for video analysis.
3. **Update Report Status**:
   - Mark reports as Accepted or Rejected.
   - Generate downloadable `.docx` files containing analysis and final verdict.

### Running the App

To launch the application from the user side, execute the user file using Streamlit:

```bash
streamlit run user_input.py
```
To launch the application from the authority side, execute the authority file using Streamlit:

```bash
streamlit run submission_verification.py
```


## Project Structure

- **user_input.py**: Handles user authentication, report submission, and report display on the user dashboard.
- **watsonxprocessing.py**: Configures and processes report text with IBM Watsonx.
- **dfpipeline.py**: Implements deepfake detection for validating video reports.
- **submission_verification.py**: Provides the authority dashboard for reviewing and updating reports.

## Contributing

We welcome contributions! Here’s how you can help:

1. **Fork the Repository**: Click the "Fork" button at the top of this page to create a copy of this repository.
2. **Clone the Forked Repository**:
    ```bash
    git clone https://github.com/DPRASAD-dp/hacktober_2024_code_submission.git
    ```
3. **Create a New Branch**:
    ```bash
    git checkout -b feature/YourFeatureName
    ```
4. **Commit Your Changes**:
    ```bash
    git commit -m 'Add some feature'
    ```
5. **Push to the Branch**:
    ```bash
    git push origin feature/YourFeatureName
    ```
6. **Open a Pull Request**: Once your feature branch is pushed to GitHub, open a Pull Request for review.

## License

This project is licensed under the MIT License.

---
## Contact

Mail at kdurgaprasadkavali@gmail.com for collaborations and queries.

Enjoy using WhistleSafe for secure, anonymous reporting!
