# app/ml/analysis.py
from transformers import pipeline
from textblob import TextBlob

# --- Global Models ---
sentiment_analyzer = None
mental_health_classifier = None

async def load_ai_models():
    """Load AI models on startup"""
    global sentiment_analyzer, mental_health_classifier
    try:
        print("🤖 Loading AI models...")
        sentiment_analyzer = pipeline(
            "sentiment-analysis", model="cardiffnlp/twitter-roberta-base-sentiment-latest"
        )
        mental_health_classifier = pipeline(
            "text-classification", model="mental/mental-bert-base-uncased"
        )
        print("✅ AI models loaded successfully.")
    except Exception as e:
        print(f"❌ Error loading AI models: {e}")

# --- Analysis Functions ---
def analyze_sentiment(text: str) -> dict:
    # (Your analyze_sentiment function code goes here)
    # ...
    try:
        blob = TextBlob(text)
        polarity = blob.sentiment.polarity
        if sentiment_analyzer:
            result = sentiment_analyzer(text)[0]
            return {"sentiment": result['label'], "confidence": result['score'], "polarity": polarity}
        else:
            sentiment = "POSITIVE" if polarity > 0.1 else "NEGATIVE" if polarity < -0.1 else "NEUTRAL"
            return {"sentiment": sentiment, "confidence": abs(polarity), "polarity": polarity}
    except Exception as e:
        print(f"Error in sentiment analysis: {e}")
        return {"sentiment": "NEUTRAL", "confidence": 0.5, "polarity": 0.0}

def analyze_mental_health_indicators(text: str) -> dict:
    # (Your analyze_mental_health_indicators function code goes here)
    # ...
    try:
        depression_keywords = ['sad', 'depressed', 'hopeless', 'worthless', 'empty', 'lonely']
        anxiety_keywords = ['anxious', 'worried', 'nervous', 'panic', 'fear', 'stress']
        text_lower = text.lower()
        depression_score = sum(1 for word in depression_keywords if word in text_lower)
        anxiety_score = sum(1 for word in anxiety_keywords if word in text_lower)
        
        result = {"depression_indicators": depression_score, "anxiety_indicators": anxiety_score}
        if mental_health_classifier:
            model_result = mental_health_classifier(text)[0]
            result["ai_classification"] = model_result['label']
            result["ai_confidence"] = model_result['score']
        return result
    except Exception as e:
        print(f"Error in mental health analysis: {e}")
        return {"depression_indicators": 0, "anxiety_indicators": 0}

def calculate_risk_score(behavioral_data: dict) -> dict:
    # (Your calculate_risk_score function code goes here)
    # ...
    # This function remains largely the same
    try:
        risk_factors = {}
        total_score = 0
        max_score = 100 # Default max_score per factor
        
        # Simplified risk calculation
        final_risk_score = 50.0 # Default
        
        # ... your detailed calculation logic ...

        if final_risk_score >= 80: risk_level = "High"
        elif final_risk_score >= 60: risk_level = "Moderate"
        else: risk_level = "Low"
        
        return {
            "risk_score": round(final_risk_score, 2),
            "risk_level": risk_level,
            "risk_factors": risk_factors
        }
    except Exception as e:
        print(f"Error calculating risk score: {e}")
        return {"risk_score": 50.0, "risk_level": "Moderate", "risk_factors": {}}