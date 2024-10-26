import streamlit as st
import sqlite3
from pathlib import Path

# Add custom CSS for blue theme
st.markdown("""
    <style>
    .stApp {
        background: linear-gradient(to bottom right, #1e3c72, #2a5298);  /* Deep blue gradient background */
    }
    .css-1d391kg, .css-12oz5g7 {
        background-color: rgba(255, 255, 255, 0.9);  /* Semi-transparent white containers */
        padding: 20px;
        border-radius: 10px;
        margin-bottom: 20px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .stButton button {
        background-color: #2e5cb8;  /* Blue buttons */
        color: white;
        border: none;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .stButton button:hover {
        background-color: #3d7be3;  /* Lighter blue on hover */
    }
    h1, h2, h3 {
        color: white !important;
    }
    .st-text {
        color: white;
    }
    </style>
""", unsafe_allow_html=True)

# Database setup
conn = sqlite3.connect('user_data.db')
cursor = conn.cursor()

# Create tables if not exist
cursor.execute('''
CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY,
    username TEXT UNIQUE,
    password TEXT
)
''')

cursor.execute('''
CREATE TABLE IF NOT EXISTS uploads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    video_path TEXT,
    text_report TEXT,
    status TEXT DEFAULT 'Pending',
    FOREIGN KEY(user_id) REFERENCES users(user_id)
)
''')
conn.commit()

# Dummy users for login (in a real-world app, securely store and hash passwords)
dummy_users = [
    {'username': 'reporter1', 'password': 'password1'},
    {'username': 'reporter2', 'password': 'password2'},
    {'username': 'reporter3', 'password': 'password3'},
    {'username': 'reporter4', 'password': 'password4'}
]

# Add dummy users to the database if not exist
for user in dummy_users:
    cursor.execute('''
    INSERT OR IGNORE INTO users (username, password)
    VALUES (?, ?)
    ''', (user['username'], user['password']))
conn.commit()

# Authentication function
def authenticate(username, password):
    cursor.execute('SELECT * FROM users WHERE username = ? AND password = ?', (username, password))
    return cursor.fetchone()

# Save report and video function
def save_upload(user_id, video_path, text_report):
    cursor.execute('''
    INSERT INTO uploads (user_id, video_path, text_report)
    VALUES (?, ?, ?)
    ''', (user_id, video_path, text_report))
    conn.commit()

# Get user's report history function
def get_user_reports(user_id):
    cursor.execute('SELECT video_path, text_report, status FROM uploads WHERE user_id = ?', (user_id,))
    return cursor.fetchall()

# Streamlit app layout
st.title("WhistleSafe : Anonymous Reporting System")

# Login Page
if 'authenticated' not in st.session_state:
    st.session_state.authenticated = False
    st.session_state.user_id = None

if not st.session_state.authenticated:
    with st.form("login_form"):
        username = st.text_input("Username")
        password = st.text_input("Password", type="password")
        submit = st.form_submit_button("Login")

    if submit:
        user = authenticate(username, password)
        if user:
            st.session_state.authenticated = True
            st.session_state.user_id = user[0]
            st.success("Logged in successfully!")
            st.experimental_rerun()
        else:
            st.error("Invalid username or password")
else:
    # User dashboard
    st.sidebar.title("User Dashboard")
    option = st.sidebar.selectbox("Choose an option", ["Check Progress", "Upload Report"])

    if option == "Check Progress":
        st.header("Previous Reports")
        reports = get_user_reports(st.session_state.user_id)
        if reports:
            for idx, report in enumerate(reports):
                st.write(f"**Report {idx + 1}:**")
                st.video(report[0])
                st.text(report[1])
                st.write(f"Status: {report[2]}")
        else:
            st.info("No reports found.")

    elif option == "Upload Report":
        st.header("Upload New Report")
        video_file = st.file_uploader("Upload Video", type=["mp4", "mov", "avi"])
        text_report = st.text_area("Enter Report Text")

        if st.button("Submit Report"):
            if video_file and text_report:
                # Save the uploaded video to a temporary file path
                video_path = Path("uploads") / video_file.name
                video_path.parent.mkdir(exist_ok=True, parents=True)
                with open(video_path, "wb") as f:
                    f.write(video_file.getbuffer())

                # Save data in the database
                save_upload(st.session_state.user_id, str(video_path), text_report)
                st.success("Report uploaded successfully!")
            else:
                st.warning("Please upload a video and enter a report text.")

    if st.sidebar.button("Logout"):
        st.session_state.authenticated = False
        st.session_state.user_id = None
        st.experimental_rerun()
