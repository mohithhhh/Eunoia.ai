"""
Script to train custom AI models for mental health assessment
"""

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report, accuracy_score
import joblib
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification, Trainer, TrainingArguments
from datasets import Dataset
import os

def create_sample_data():
    """Create sample training data for demonstration"""
    # This is sample data - replace with real mental health datasets
    data = {
        'text': [
            "I feel really sad and hopeless today",
            "Everything seems pointless and I can't find motivation",
            "I'm having a great day and feeling positive",
            "Feeling anxious about the upcoming presentation",
            "I love spending time with my friends",
            "I can't sleep and feel worried all the time",
            "Life is beautiful and I'm grateful",
            "I feel empty and disconnected from everyone",
            "Excited about my new job opportunity",
            "I'm constantly stressed and overwhelmed"
        ],
        'sentiment': [0, 0, 1, 0, 1, 0, 1, 0, 1, 0],  # 0: negative, 1: positive
        'depression_risk': [1, 1, 0, 0, 0, 0, 0, 1, 0, 0],  # 0: low risk, 1: high risk
        'anxiety_risk': [0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
        'sleep_hours': [4, 5, 8, 6, 7, 3, 8, 4, 7, 5],
        'activity_level': [2, 1, 4, 3, 5, 2, 5, 1, 4, 2],  # 1-5 scale
        'mood_rating': [2, 1, 5, 3, 5, 2, 5, 1, 4, 2],  # 1-5 scale
        'stress_level': [4, 5, 1, 4, 1, 5, 1, 4, 2, 5]  # 1-5 scale
    }
    
    return pd.DataFrame(data)

def train_risk_assessment_model():
    """Train a risk assessment model using behavioral features"""
    print("Training risk assessment model...")
    
    # Create sample data (replace with real dataset)
    df = create_sample_data()
    
    # Prepare features for risk assessment
    features = ['sleep_hours', 'activity_level', 'mood_rating', 'stress_level']
    X = df[features]
    
    # Create composite risk score (0: low, 1: moderate, 2: high)
    y = (df['depression_risk'] + df['anxiety_risk']).apply(
        lambda x: 2 if x >= 2 else (1 if x == 1 else 0)
    )
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Scale features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Train model
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train_scaled, y_train)
    
    # Evaluate
    y_pred = model.predict(X_test_scaled)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"Risk Assessment Model Accuracy: {accuracy:.2f}")
    
    # Save model and scaler
    os.makedirs('models', exist_ok=True)
    joblib.dump(model, 'models/risk_assessment_model.pkl')
    joblib.dump(scaler, 'models/risk_assessment_scaler.pkl')
    
    print("✅ Risk assessment model saved!")
    return model, scaler

def fine_tune_sentiment_model():
    """Fine-tune a BERT model for mental health sentiment analysis"""
    print("Fine-tuning sentiment model...")
    
    # This is a simplified example - in practice, you'd use a larger dataset
    df = create_sample_data()
    
    # Prepare data for transformers
    texts = df['text'].tolist()
    labels = df['sentiment'].tolist()
    
    # Create dataset
    dataset = Dataset.from_dict({
        'text': texts,
        'labels': labels
    })
    
    # Load tokenizer and model
    model_name = "distilbert-base-uncased"
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForSequenceClassification.from_pretrained(
        model_name, 
        num_labels=2
    )
    
    # Tokenize data
    def tokenize_function(examples):
        return tokenizer(examples['text'], truncation=True, padding=True)
    
    tokenized_dataset = dataset.map(tokenize_function, batched=True)
    
    # Split dataset
    train_dataset = tokenized_dataset.train_test_split(test_size=0.2)
    
    # Training arguments
    training_args = TrainingArguments(
        output_dir='./models/sentiment_model',
        num_train_epochs=3,
        per_device_train_batch_size=8,
        per_device_eval_batch_size=8,
        warmup_steps=500,
        weight_decay=0.01,
        logging_dir='./logs',
        evaluation_strategy="epoch",
        save_strategy="epoch",
        load_best_model_at_end=True,
    )
    
    # Trainer
    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=train_dataset['train'],
        eval_dataset=train_dataset['test'],
        tokenizer=tokenizer,
    )
    
    # Train model
    trainer.train()
    
    # Save model
    trainer.save_model('./models/sentiment_model')
    tokenizer.save_pretrained('./models/sentiment_model')
    
    print("✅ Sentiment model fine-tuned and saved!")

def create_mental_health_classifier():
    """Create a simple mental health text classifier"""
    print("Training mental health classifier...")
    
    df = create_sample_data()
    
    # Simple keyword-based features
    def extract_features(text):
        depression_keywords = ['sad', 'hopeless', 'empty', 'pointless', 'disconnected']
        anxiety_keywords = ['anxious', 'worried', 'stressed', 'overwhelmed']
        positive_keywords = ['great', 'positive', 'love', 'beautiful', 'grateful', 'excited']
        
        text_lower = text.lower()
        
        return [
            sum(1 for word in depression_keywords if word in text_lower),
            sum(1 for word in anxiety_keywords if word in text_lower),
            sum(1 for word in positive_keywords if word in text_lower),
            len(text.split())  # Text length
        ]
    
    # Extract features
    X = np.array([extract_features(text) for text in df['text']])
    
    # Create labels (0: normal, 1: depression risk, 2: anxiety risk)
    y = []
    for _, row in df.iterrows():
        if row['depression_risk']:
            y.append(1)
        elif row['anxiety_risk']:
            y.append(2)
        else:
            y.append(0)
    
    y = np.array(y)
    
    # Train model
    model = LogisticRegression(random_state=42)
    model.fit(X, y)
    
    # Save model
    joblib.dump(model, 'models/mental_health_classifier.pkl')
    
    print("✅ Mental health classifier saved!")
    return model

if __name__ == "__main__":
    print("🚀 Starting model training...")
    
    # Train all models
    train_risk_assessment_model()
    create_mental_health_classifier()
    
    # Note: Uncomment the line below if you want to fine-tune BERT
    # This requires more computational resources and time
    # fine_tune_sentiment_model()
    
    print("🎉 All models trained successfully!")
    print("\nNext steps:")
    print("1. Copy the models to your backend directory")
    print("2. Update the model paths in your backend configuration")
    print("3. Test the models with your API endpoints")