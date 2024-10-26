from flask import Flask, render_template, request, redirect, url_for, send_file 
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import io
import base64
import os
from werkzeug.utils import secure_filename
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.metrics import mean_squared_error, accuracy_score
from sklearn.preprocessing import LabelEncoder
from sklearn.impute import SimpleImputer

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['PLOT_FOLDER'] = 'static/plots'

def load_data(file_path):
    if file_path.endswith('.csv'):
        return pd.read_csv(file_path)
    elif file_path.endswith('.xlsx'):
        return pd.read_excel(file_path)
    else:
        raise ValueError("Unsupported file format. Please use CSV or XLSX files.")

def get_plot_url(plt, filename):
    img = io.BytesIO()
    plt.savefig(img, format='png', bbox_inches='tight')
    img.seek(0)
    plot_url = base64.b64encode(img.getvalue()).decode()
    plt.close()
    return plot_url

def preprocess_data(df):
    # Create a copy of the dataframe
    df_processed = df.copy()
    
    # Identify numeric and categorical columns
    numeric_columns = df_processed.select_dtypes(include=['int64', 'float64']).columns
    categorical_columns = df_processed.select_dtypes(include=['object']).columns
    
    # Handle missing values in numeric columns
    imputer = SimpleImputer(strategy='mean')
    df_processed[numeric_columns] = imputer.fit_transform(df_processed[numeric_columns])
    
    # Encode categorical variables
    le = LabelEncoder()
    for col in categorical_columns:
        df_processed[col] = le.fit_transform(df_processed[col].astype(str))
    
    # Convert all columns to float
    for col in df_processed.columns:
        df_processed[col] = df_processed[col].astype(float)
    
    return df_processed

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        if 'file' not in request.files:
            return redirect(request.url)
        file = request.files['file']
        if file.filename == '':
            return redirect(request.url)
        if file and file.filename.endswith(('.csv', '.xlsx')):
            filename = secure_filename(file.filename)
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(file_path)
            return redirect(url_for('analyze', filename=filename))
    return render_template('index.html')

@app.route('/analyze/<filename>')
def analyze(filename):
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    df = load_data(file_path)
    info = df.info()
    head = df.head().to_html()
    return render_template('analyze.html', filename=filename, info=info, head=head)

@app.route('/analyze_data/<filename>')
def analyze_data(filename):
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    df = load_data(file_path)
    
    # Preprocess the data
    df_processed = preprocess_data(df)
    
    describe = df_processed.describe().to_html()
    correlation_matrix = df_processed.corr()
    
    plt.figure(figsize=(10, 8))
    sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm')
    plt.title('Correlation Heatmap')
    heatmap_url = get_plot_url(plt, 'correlation_heatmap.png')
    
    plot_urls = []
    numerical_columns = df_processed.select_dtypes(include=['int64', 'float64']).columns
    for column in numerical_columns:
        plt.figure(figsize=(10, 6))
        sns.histplot(df_processed[column], kde=True)
        plt.title(f'Distribution of {column}')
        plot_urls.append((column, get_plot_url(plt, f'distribution_{column}.png')))
    
    return render_template('analysis_results.html', filename=filename, describe=describe, heatmap_url=heatmap_url, plot_urls=plot_urls)

@app.route('/predict/<filename>', methods=['GET', 'POST'])
def predict(filename):
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    df = load_data(file_path)
    
    # Preprocess the data
    df_processed = preprocess_data(df)
    
    features = df_processed.columns.tolist()
    
    if request.method == 'POST':
        target = request.form['target']
        if target not in df_processed.columns:
            return "Error: Target column not found in the dataset."
        
        X = df_processed.drop(columns=[target])
        y = df_processed[target]
        
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        if df_processed[target].dtype in ['int64', 'float64']:
            model = RandomForestRegressor(n_estimators=100, random_state=42)
            metric = mean_squared_error
            metric_name = "Mean Squared Error"
        else:
            model = RandomForestClassifier(n_estimators=100, random_state=42)
            metric = accuracy_score
            metric_name = "Accuracy"
        
        model.fit(X_train, y_train)
        y_pred = model.predict(X_test)
        performance = metric(y_test, y_pred)
        
        feature_importance = pd.DataFrame({'feature': X.columns, 'importance': model.feature_importances_})
        feature_importance = feature_importance.sort_values('importance', ascending=False)
        
        # Format the data for the template
        feature_importance_data = feature_importance.head(10).to_dict(orient='records')
        
        # Round the values to 4 decimal places for display
        for item in feature_importance_data:
            item['importance'] = float(format(item['importance'], '.4f'))
        
        plt.figure(figsize=(10, 6))
        sns.barplot(x='importance', y='feature', data=feature_importance.head(10))
        plt.title('Top 10 Feature Importance')
        importance_url = get_plot_url(plt, 'feature_importance.png')
        
        return render_template('prediction_results.html', filename=filename, metric_name=metric_name, performance=performance, importance_url=importance_url, feature_importance_data=feature_importance_data)
    
    return render_template('predict.html', filename=filename, features=features)

if __name__ == '__main__':
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    os.makedirs(app.config['PLOT_FOLDER'], exist_ok=True)
    app.run(debug=True)
