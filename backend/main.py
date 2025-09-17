from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import os
from typing import List, Dict, Optional
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="NyayaSathi Legal Aid API", version="1.0.0")

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class TextQuery(BaseModel):
    text: str
    language: str = "en"  # en or hi

class LegalResponse(BaseModel):
    issue_type: str
    advice: str
    next_steps: List[str]
    emergency_contacts: Optional[List[Dict]]
    language: str

class LegalAidCenter(BaseModel):
    id: int
    name: str
    address: str
    phone: str
    services: List[str]
    latitude: float
    longitude: float
    district: str

# Load mock data
def load_mock_data():
    try:
        with open('data/legal_responses.json', 'r', encoding='utf-8') as f:
            legal_data = json.load(f)
        with open('data/aid_centers.json', 'r', encoding='utf-8') as f:
            centers_data = json.load(f)
        with open('data/emergency_contacts.json', 'r', encoding='utf-8') as f:
            emergency_data = json.load(f)
        return legal_data, centers_data, emergency_data
    except Exception as e:
        logger.error(f"Error loading mock data: {e}")
        return {}, [], {}

# Global data storage
LEGAL_DATA, AID_CENTERS, EMERGENCY_CONTACTS = load_mock_data()

# Simple keyword matching for legal issue classification
def classify_legal_issue(text: str) -> str:
    text_lower = text.lower()
    
    # Land/Property issues
    if any(word in text_lower for word in ['landlord', 'property', 'land', 'rent', 'eviction']):
        return 'property'
    
    # Domestic violence
    if any(word in text_lower for word in ['domestic', 'violence', 'abuse', 'beats', 'husband', 'wife']):
        return 'domestic_violence'
    
    # Labor issues
    if any(word in text_lower for word in ['job', 'salary', 'work', 'employer', 'labor', 'payment', 'paid', 'wage', 'wages']):
        return 'labor'
    
    # General legal
    return 'general'

# API Endpoints

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy", 
        "service": "NyayaSathi Legal Aid API",
        "version": "1.0.0",
        "team": "Equinox",
        "description": "Multilingual Legal Aid Agent for Rural Citizens"
    }

@app.post("/text-query", response_model=LegalResponse)
async def text_query(query: TextQuery):
    """Process text query and return legal advice"""
    try:
        issue_type = classify_legal_issue(query.text)
        
        if issue_type in LEGAL_DATA and query.language in LEGAL_DATA[issue_type]:
            response_data = LEGAL_DATA[issue_type][query.language]
            return LegalResponse(
                issue_type=response_data["issue_type"],
                advice=response_data["advice"],
                next_steps=response_data["next_steps"],
                emergency_contacts=response_data.get("emergency_contacts"),
                language=query.language
            )
        else:
            # Fallback response
            return LegalResponse(
                issue_type="General Legal Query",
                advice="Please contact your nearest legal aid center for assistance.",
                next_steps=["Contact legal aid center", "Gather relevant documents"],
                emergency_contacts=[{"name": "Legal Aid Helpline", "number": "1800-345-4224"}],
                language=query.language
            )
    except Exception as e:
        logger.error(f"Error processing text query: {e}")
        raise HTTPException(status_code=500, detail="Error processing query")

@app.post("/voice-query")
async def voice_query(audio_file: UploadFile = File(...), language: str = "en"):
    """Process voice query - simplified for hackathon"""
    try:
        # For hackathon speed, we'll simulate voice-to-text
        # In a real implementation, you'd use Whisper here
        
        # Mock transcription based on file name or use simple text
        mock_transcriptions = {
            "threat.wav": "My landlord is threatening me",
            "violence.wav": "My husband beats me",
            "salary.wav": "I haven't been paid for 3 months"
        }
        
        # Get mock transcription or use default
        transcribed_text = mock_transcriptions.get(
            audio_file.filename, 
            "I need legal help with my problem"
        )
        
        # Process as text query
        text_query_obj = TextQuery(text=transcribed_text, language=language)
        response = await text_query(text_query_obj)
        
        return {
            "transcribed_text": transcribed_text,
            "legal_response": response
        }
        
    except Exception as e:
        logger.error(f"Error processing voice query: {e}")
        raise HTTPException(status_code=500, detail="Error processing voice query")

@app.get("/legal-aid-centers", response_model=List[LegalAidCenter])
async def get_legal_aid_centers(district: Optional[str] = None):
    """Get list of legal aid centers, optionally filtered by district"""
    try:
        centers = AID_CENTERS.copy()
        
        if district:
            centers = [center for center in centers 
                      if center.get("district", "").lower() == district.lower()]
        
        return centers
    except Exception as e:
        logger.error(f"Error fetching legal aid centers: {e}")
        raise HTTPException(status_code=500, detail="Error fetching legal aid centers")

@app.get("/emergency-contacts")
async def get_emergency_contacts():
    """Get emergency contact numbers"""
    try:
        return EMERGENCY_CONTACTS
    except Exception as e:
        logger.error(f"Error fetching emergency contacts: {e}")
        raise HTTPException(status_code=500, detail="Error fetching emergency contacts")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)