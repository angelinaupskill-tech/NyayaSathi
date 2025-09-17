# NyayaSathi - Multilingual Legal Aid Agent

🏛️ **AI-powered legal aid assistant for rural citizens**

Built for hackathon - prioritizes functionality over perfection!

## Project ID: T3:447 | Project Name: NyayaSathi | Team Equinox | Angelina | Kaggle id: angelinac07

## Team Equinox : Angelina Chatterjee amd Aagman Sharma

## 🚀 Quick Start

### Prerequisites
- Python 3.7+
- Node.js 14+
- npm

### One-Command Setup

**Windows:**
```bash
# Run the startup script
.\start.bat
```

**Linux/Mac:**
```bash
# Make executable and run
chmod +x start.sh
./start.sh
```

**Manual Setup:**
```bash
# Terminal 1 - Backend
cd backend
pip install -r requirements.txt
python main.py

# Terminal 2 - Frontend  
cd frontend
npm install
npm start
```

### Access the Application
- **Frontend UI**: http://localhost:3000
- **Backend API**: http://localhost:8001
- **API Docs**: http://localhost:8001/docs

## 🎯 Core Features

### ✅ Implemented
- **Multilingual Interface**: English/Hindi (EN/हिं)
- **Voice Assistant**: Simulated voice-to-text with mock responses
- **Legal Classification**: Property, Domestic Violence, Labor, General
- **Legal Aid Centers**: 8 centers across India with contact info
- **Emergency Contacts**: Quick-access helpline numbers
- **Rural-Friendly UI**: Large buttons, clear typography, simple navigation

### 🔧 Tech Stack
- **Backend**: FastAPI + Python
- **Frontend**: React + TypeScript
- **Data**: JSON files (no database for speed)
- **AI**: Mock implementation (keyword matching)
- **Voice**: Simulated (real Whisper integration ready)

## 📱 User Interface

### 3-Tab Design
1. **🎤 Voice Assistant**
   - Text/Voice input
   - Legal advice responses
   - Emergency contacts
   - Bilingual support

2. **⚖️ Legal Aid Centers**
   - Center listings with contact info
   - Services offered
   - Direct calling functionality
   - Geographic coverage

3. **🚨 Emergency Contacts**
   - Quick-access emergency buttons
   - Categorized by type
   - One-click calling
   - Critical helplines (100, 181, 1091)

## 📁 Datasets Used
The application uses custom-curated datasets stored in JSON format:

1. Legal Responses Dataset (backend/data/legal_responses.json)

- Contains categorized legal advice for common rural issues
- Manually created with simplified legal information
- Covers 4 categories: Property, Domestic Violence, Labor, General

2. Legal Aid Centers Dataset (backend/data/aid_centers.json)

- Contains information on 8 legal aid centers across India
- Includes contact details, services offered, and jurisdictions
- Manually compiled from public legal aid resources

3. Emergency Contacts Dataset (backend/data/emergency_contacts.json)

- Contains critical helpline numbers for immediate assistance
- Includes national helplines and legal emergency numbers

## 🔍 Demo User Flows

### Scenario 1: Property Dispute
**Input**: "My landlord is threatening me"
**Output**: Property rights advice, next steps, emergency contacts

### Scenario 2: Domestic Violence
**Input**: "My husband beats me"
**Output**: Safety advice, emergency numbers (100, 181), legal steps

### Scenario 3: Labor Issue
**Input**: "I haven't been paid for 3 months"
**Output**: Worker rights info, labor department contacts, filing steps

## 📡 API Endpoints

y### Core Endpoints
```bash
# Health check
GET /health

# Text query processing
POST /text-query
{
  "text": "My landlord is threatening me",
  "language": "en"
}

# Voice query (mock implementation)
POST /voice-query
# Upload audio file + language

# Legal aid centers
GET /legal-aid-centers?district=Delhi

# Emergency contacts
GET /emergency-contacts
```

### Response Format
```json
{
  "issue_type": "Property Rights",
  "advice": "You have legal rights as a tenant...",
  "next_steps": [
    "Document all threats",
    "Contact legal aid center"
  ],
  "emergency_contacts": [
    {"name": "Legal Aid Helpline", "number": "1800-345-4224"}
  ],
  "language": "en"
}
```

## 🎨 Design Philosophy

### Rural-First Design
- **Large touch targets**: Easy for elderly users
- **Clear visual hierarchy**: Important info stands out
- **Minimal text input**: Voice-first approach
- **Offline capability**: Works with cached data

### Cultural Sensitivity
- **Local language support**: Hindi alongside English
- **Familiar terminology**: Uses everyday language
- **Regional awareness**: Location-specific resources
- **Social context**: Understands rural challenges

## 🔒 Simplifications for Hackathon

- **Mock AI**: Keyword matching instead of ML models
- **File Storage**: JSON instead of database
- **Voice Simulation**: Mock instead of real Whisper
- **Basic Auth**: No user authentication
- **Limited Scale**: Designed for demo, not production

## 🚀 Production Readiness Path

### Immediate Improvements
1. **Real AI Integration**: OpenAI Whisper for voice
2. **Database**: PostgreSQL/MongoDB for scalability
3. **Authentication**: User accounts and sessions
4. **Advanced NLP**: Better legal classification
5. **Geolocation**: GPS-based center recommendations

### Advanced Features
1. **Multi-state coverage**: Expand beyond major cities
2. **Document upload**: Photo/PDF legal document analysis
3. **Case tracking**: Follow-up on legal cases
4. **Lawyer matching**: Connect with nearby legal professionals
5. **Community features**: User reviews and recommendations

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐
│   React Web     │    │   FastAPI       │
│   Frontend      │◄──►│   Backend       │
│   (Port 3000)   │    │   (Port 8000)   │
└─────────────────┘    └─────────────────┘
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌─────────────────┐
│   Static        │    │   JSON Data     │
│   Assets        │    │   Files         │
└─────────────────┘    └─────────────────┘
```

## 📝 Development Notes

### File Structure
```
Nyaya-Sathi/
├── backend/
│   ├── main.py              # FastAPI app
│   ├── requirements.txt     # Python dependencies
│   └── data/
│       ├── legal_responses.json
│       ├── aid_centers.json
│       └── emergency_contacts.json
├── frontend/
│   ├── src/
│   │   ├── index.tsx        # Main React app
│   │   └── App.css          # Styling
│   ├── public/
│   │   └── index.html       # HTML template
│   └── package.json         # Node dependencies
├── start.bat                # Windows startup
├── start.sh                 # Linux/Mac startup
├── DEMO_SCRIPT.md          # Demo instructions
└── README.md               # This file
```

### Key Design Decisions
1. **Web over Mobile**: Faster development, easier testing
2. **Mock AI**: Focus on UX over complex ML
3. **JSON Storage**: Eliminate DB setup complexity
4. **TypeScript**: Better development experience
5. **Responsive Design**: Mobile-ready without native app

## ❗ Known Limitations

- **No real voice processing**: Uses mock transcription
- **Limited legal database**: Only 4 issue categories
- **No user persistence**: No saved queries or history
- **English-centric**: Hindi translations may need refinement
- **No geolocation**: Manual district selection

## 🎯 Success Metrics

### Functional
- ✅ All 3 tabs working
- ✅ Bilingual interface
- ✅ API integration
- ✅ Emergency calling
- ✅ Legal aid lookup

### Technical
- ✅ One-command startup
- ✅ Cross-platform compatibility
- ✅ Responsive design
- ✅ API documentation
- ✅ Error handling

### User Experience
- ✅ Intuitive navigation
- ✅ Clear visual feedback
- ✅ Fast response times
- ✅ Accessible design
- ✅ Mobile-friendly layout

---

**Built with ❤️ for rural justice accessibility by Team Equinox**

*© 2025 Team Equinox. All rights reserved.*

*This project demonstrates rapid prototyping capabilities for social impact applications. While simplified for hackathon constraints, it provides a solid foundation for a production legal aid system.*