import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import LabelEncoder
import joblib
import tkinter as tk
from tkinter import messagebox
from PIL import Image, ImageTk

class MedicalChatbot:
    def __init__(self, data_path='medical_data.csv'):
        self.data_path = data_path
        self.label_encoder = LabelEncoder()
        self.question_bank = self.load_questions()
        self.model = Pipeline([
            ('tfidf', TfidfVectorizer(max_features=5000)),
            ('clf', MultinomialNB())
        ])
        self.load_data()

    def load_questions(self):
        return {
            "general": [
                "Are you experiencing fever?",
                "Do you feel fatigue or weakness?",
                "Do you have a headache?"
            ],
            "respiratory": [
                "Do you have a cough?",
                "Is there any difficulty breathing?",
                "Do you have a runny nose or sore throat?"
            ],
            "digestive": [
                "Do you have any stomach pain?",
                "Have you experienced nausea or vomiting?",
                "Any changes in appetite?"
            ],
            "cardiac": [
                "Are you experiencing chest pain?",
                "Do you have shortness of breath?",
                "Any rapid or irregular heartbeat?"
            ],
            "skin": [
                "Do you have any rash?",
                "Is there itching or swelling?",
                "Have you noticed any skin changes?"
            ]
        }

    def load_data(self):
        try:
            df = pd.read_csv(self.data_path)
            symptoms_cols = [col for col in df.columns if col != 'disease']
            self.symptoms_data = []
            for _, row in df[symptoms_cols].iterrows():
                symptoms = ' '.join([symptom for symptom in row.index if row[symptom] == 1 or row[symptom] == '1'])
                self.symptoms_data.append(symptoms)
            self.diagnoses = self.label_encoder.fit_transform(df['disease'])
            self.train_model()
        except FileNotFoundError:
            self.create_sample_data()
            self.load_data()

    def create_sample_data(self):
        sample_data = {
            'fever': [1, 0, 1, 0, 1],
            'headache': [1, 0, 1, 0, 0],
            'cough': [1, 1, 0, 0, 0],
            'runny_nose': [1, 1, 0, 0, 0],
            'fatigue': [1, 0, 1, 1, 1],
            'nausea': [0, 0, 1, 0, 0],
            'vomiting': [0, 0, 1, 0, 0],
            'chest_pain': [0, 0, 0, 1, 0],
            'shortness_breath': [0, 1, 0, 1, 0],
            'rash': [0, 0, 0, 0, 1],
            'itching': [0, 0, 0, 0, 1],
            'disease': ['Common Cold', 'Bronchitis', 'Gastroenteritis', 'Respiratory Infection', 'Allergic Reaction']
        }
        df = pd.DataFrame(sample_data)
        df.to_csv(self.data_path, index=False)

    def train_model(self):
        X_train, X_test, y_train, y_test = train_test_split(self.symptoms_data, self.diagnoses, test_size=0.2, random_state=42)
        self.model.fit(X_train, y_train)

    def get_user_symptoms(self):
        symptoms = []
        for category, questions in self.question_bank.items():
            for question in questions:
                response = self.show_custom_prompt(question)
                if response:
                    symptom = question.lower().split(" ")[-1].split("?")[0]
                    symptoms.append(symptom)
        return " ".join(symptoms)

    def show_custom_prompt(self, question):
        dialog = tk.Toplevel()
        dialog.title("Symptom Inquiry")
        dialog.geometry("400x200")
        dialog.configure(bg='black')

        label = tk.Label(dialog, text=question, font=("Arial", 14), bg='black', fg='white')
        label.pack(pady=20)

        yes_button = tk.Button(dialog, text="Yes", command=lambda: self.confirm_answer(dialog, True), bg="#4CAF50", fg="white", font=("Arial", 12))
        yes_button.pack(side=tk.LEFT, padx=30, pady=10)

        no_button = tk.Button(dialog, text="No", command=lambda: self.confirm_answer(dialog, False), bg="#FF5722", fg="white", font=("Arial", 12))
        no_button.pack(side=tk.RIGHT, padx=30, pady=10)

        dialog.wait_window()
        return dialog.result

    def confirm_answer(self, dialog, answer):
        dialog.result = answer
        dialog.destroy()

    def get_diagnosis(self, symptoms):
        prediction_idx = self.model.predict([symptoms])[0]
        probabilities = self.model.predict_proba([symptoms])[0]
        confidence = probabilities[prediction_idx] * 100
        prediction = self.label_encoder.classes_[prediction_idx]
        top_3_idx = np.argsort(probabilities)[-3:][::-1]
        top_3_diagnoses = [(self.label_encoder.classes_[idx], probabilities[idx] * 100) for idx in top_3_idx]
        return prediction, confidence, top_3_diagnoses

    def provide_recommendations(self, diagnosis):
        recommendations = {
            "Common Cold": ["Rest and get plenty of sleep", "Stay hydrated", "Consider over-the-counter cold medications", "Monitor your temperature"],
            "Bronchitis": ["Get plenty of rest", "Stay hydrated", "Use a humidifier", "Consider over-the-counter cough medicine"],
            "Gastroenteritis": ["Stay hydrated with clear fluids", "Eat bland foods (BRAT diet)", "Avoid dairy and fatty foods", "Rest and monitor symptoms"],
            "Respiratory Infection": ["Seek medical attention", "Rest and stay hydrated", "Monitor your temperature", "Use a humidifier"],
            "Allergic Reaction": ["Avoid known allergens", "Take antihistamines if prescribed", "Apply cool compress if there's swelling", "Seek medical attention if breathing is affected"]
        }
        return recommendations.get(diagnosis, ["Please consult a healthcare provider"])

    def chat(self):
        symptoms = self.get_user_symptoms()
        diagnosis, confidence, top_3_diagnoses = self.get_diagnosis(symptoms)

        message = f"\nTop 3 possible diagnoses:\n"
        for disease, prob in top_3_diagnoses:
            message += f"- {disease}: {prob:.1f}% confidence\n"
        message += f"\nMost likely diagnosis: {diagnosis}\n"
        message += f"Confidence: {confidence:.1f}%\n\nRecommendations:\n"
        for rec in self.provide_recommendations(diagnosis):
            message += f"- {rec}\n"

        messagebox.showinfo("Diagnosis Result", message)

        if messagebox.askyesno("Check Symptoms Again", "Would you like to check symptoms again?"):
            self.chat()
        else:
            messagebox.showinfo("Goodbye", "Thank you for using the Medical Chatbot!")

def main():
    chatbot = MedicalChatbot()
    root = tk.Tk()
    root.title("Medical Diagnostic Chatbot")
    root.geometry("800x600")
    root.configure(bg='black')

    label = tk.Label(root, text="Welcome to the Medical Diagnostic Chatbot!\nClick to start.", font=("Arial", 18), bg='black', fg='white')
    label.pack(pady=20)

    start_button = tk.Button(root, text="Start Diagnosis", command=chatbot.chat, bg="#4CAF50", fg="white", font=("Arial", 14))
    start_button.pack(pady=10)

    exit_button = tk.Button(root, text="Exit", command=root.quit, bg="#FF5722", fg="white", font=("Arial", 14))
    exit_button.pack(pady=10)

    root.mainloop()

if __name__ == "__main__":
    main()
