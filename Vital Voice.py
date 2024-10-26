import pandas as pd
from fuzzywuzzy import fuzz
import tkinter as tk
from tkinter import scrolledtext, messagebox

# Load data from CSV file
df = pd.read_csv('test.csv')

def check_similarity(input_issue, df):
    results = []
    sim=0
    r=0
    for index, row in df.iterrows():
        similarity = fuzz.ratio(input_issue.lower(), row['issue'].lower())
        if sim < similarity:
            r=row
            sim=similarity
    if sim > 30:
        results.append({
                'issue': r['issue'],
                # 'similarity': sim,
                'remedies': r['remedies'],
                'best_doctor': r['best_doctor'],
                'doctor_contact': r['doctor_contact'],  # Assuming this column exists in your CSV
                'disease_name': r['disease_name']  # New column for disease name
             })
    return results


def chatbot(input_issue):
    matches = check_similarity(input_issue, df)
    response = ""
    if matches:
        for match in matches:
            response += f"Similar Issue: {match['issue']}\n"
            response += f"Disease Name: {match['disease_name']}\n"
            response += f"Recommended Remedies: {match['remedies']}\n"
            response += f"Best Doctor: {match['best_doctor']}\n"
            response += f"Doctor Contact: {match['doctor_contact']}\n\n"  # Include contact info
    else:
        response = "No similar issues found."
    
    return response

def on_submit():
    user_input = entry.get()
    if user_input.strip() == "":
        messagebox.showwarning("Input Error", "Please enter an issue.")
        return
    
    response = chatbot(user_input)
    output_text.config(state=tk.NORMAL)  # Enable text widget for editing
    output_text.delete(1.0, tk.END)  # Clear previous output
    output_text.insert(tk.END, response)  # Insert new response
    output_text.config(state=tk.DISABLED)  # Disable text widget for editing

root = tk.Tk()
root.title("Vital Voice")

label = tk.Label(root, text="Enter your issue:")
label.pack(pady=10)

entry = tk.Entry(root, width=50)
entry.pack(pady=10)

submit_button = tk.Button(root, text="Submit", command=on_submit)
submit_button.pack(pady=10)

output_text = scrolledtext.ScrolledText(root, width=80, height=30, state=tk.DISABLED)
output_text.pack(pady=10)

root.mainloop()