# NyayaSathi Demo Script

## Introduction
Welcome to **NyayaSathi** - a multilingual legal aid agent designed for rural citizens who face barriers to justice.

## Demo User Flows

### 1. Voice/Text Assistant Demo

**Scenario 1: Property Rights Issue**
- **User Input**: "My landlord is threatening me"
- **Expected Response**: 
  - Issue Type: Property Rights
  - Legal advice about tenant rights
  - Next steps including documentation and legal aid contacts
  - Emergency helpline numbers

**Scenario 2: Domestic Violence**
- **User Input**: "My husband beats me" 
- **Expected Response**:
  - Issue Type: Domestic Violence
  - Immediate safety advice
  - Emergency contacts (100, 181, 1091)
  - Legal protection steps

**Scenario 3: Labor Rights**
- **User Input**: "I haven't been paid for 3 months"
- **Expected Response**:
  - Issue Type: Labor Rights
  - Worker protection information
  - Labor department filing steps
  - Relevant helpline numbers

### 2. Language Support Demo
- Switch between English (EN) and Hindi (हिं) using the language toggle
- All responses are provided in the selected language
- Voice simulation works in both languages

### 3. Legal Aid Centers Demo
- Browse 8 legal aid centers across India
- View detailed contact information and services
- Direct phone calling functionality
- Covers major cities and rural areas

### 4. Emergency Contacts Demo
- Quick access to emergency numbers
- Categorized by type: Emergency, Legal Aid, Specialized
- One-click calling functionality
- Critical numbers like Police (100), Women Helpline (181)

## Key Features Demonstrated

### Multilingual Support
- English and Hindi interface
- Localized legal advice
- Cultural context awareness

### Legal Issue Classification
- Keyword-based classification system
- Covers: Property, Domestic Violence, Labor, General
- Contextual advice delivery

### Rural-Friendly Design
- Simple, large buttons
- Clear typography
- Voice input simulation
- Offline-capable data structure

### Emergency Access
- Prominent emergency tab
- Direct dialing capability
- Categorized contact lists
- Quick response design

## Technical Highlights

### Backend (FastAPI)
- RESTful API design
- JSON-based data storage
- Real-time query processing
- CORS enabled for frontend integration

### Frontend (React)
- Responsive web design
- TypeScript for type safety
- Component-based architecture
- Modern UI/UX patterns

### Mock AI Features
- Simulated voice-to-text conversion
- Keyword-based legal classification
- Bilingual response system
- Real-time processing simulation

## Live Demo Steps

1. **Start Application**
   ```bash
   # Run the start script
   ./start.bat  # Windows
   ./start.sh   # Linux/Mac
   ```

2. **Voice Assistant Test**
   - Enter: "My landlord is threatening me"
   - Click "Send Text"
   - Switch to Hindi and observe translation
   - Try "Voice" button for simulation

3. **Legal Aid Centers**
   - Navigate to "Legal Aid" tab
   - Browse available centers
   - Click phone numbers to test calling

4. **Emergency Contacts**
   - Go to "Emergency" tab
   - Show different contact categories
   - Demonstrate quick-call functionality

5. **Language Toggle**
   - Switch between EN/हिं throughout demo
   - Show consistent language experience

## Success Metrics

- ✅ 3-tab interface working
- ✅ Bilingual support (EN/HI)
- ✅ Legal issue classification
- ✅ Emergency contact integration
- ✅ Mock voice input simulation
- ✅ Responsive design
- ✅ Real API backend
- ✅ One-command startup

## Team Information

**Developed by:** Team Equinox  
**Project:** NyayaSathi - Multilingual Legal Aid Agent  
**Purpose:** Hackathon project for rural justice accessibility  
**Year:** 2025

## Deployment Notes

- **Dependencies**: Python 3.7+, Node.js 14+
- **Startup Time**: ~30 seconds
- **Ports**: Backend (8000), Frontend (3000)
- **Data**: JSON files (no database required)
- **Offline**: Works without internet after initial load