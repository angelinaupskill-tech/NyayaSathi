import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';

// API Configuration
const API_BASE_URL = 'http://localhost:8002';

// Log the API URL for debugging
console.log('API Base URL:', API_BASE_URL);

interface LegalResponse {
  issue_type: string;
  advice: string;
  next_steps: string[];
  emergency_contacts?: Array<{name: string, number: string}>;
  language: string;
}

interface LegalAidCenter {
  id: number;
  name: string;
  address: string;
  phone: string;
  services: string[];
  latitude: number;
  longitude: number;
  district: string;
}

interface EmergencyContact {
  name: string;
  number: string;
  description: string;
  category: string;
}

// Main App Component
function App() {
  const [activeTab, setActiveTab] = useState<'voice' | 'aid' | 'emergency'>('voice');
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const tabs = [
    { id: 'voice', label: language === 'en' ? 'Voice Assistant' : 'आवाज सहायक', icon: '🎤' },
    { id: 'aid', label: language === 'en' ? 'Legal Aid' : 'कानूनी सहायता', icon: '⚖️' },
    { id: 'emergency', label: language === 'en' ? 'Emergency' : 'आपातकाल', icon: '🚨' }
  ];

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="hero-section">
            <h1>🏛️ NyayaSathi</h1>
            <p className="hero-tagline">
              {language === 'en' ? 'Your trusted legal companion for justice and rights' : 'न्याय और अधिकारों के लिए आपका विश्वसनीय कानूनी साथी'}
            </p>
          </div>
          <div className="language-toggle">
            <button 
              className={language === 'en' ? 'active' : ''}
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
            <button 
              className={language === 'hi' ? 'active' : ''}
              onClick={() => setLanguage('hi')}
            >
              हिं
            </button>
          </div>
        </div>
      </header>

      <nav className="tabs">
        <div className="tabs-container">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id as any)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <main className="content">
        {activeTab === 'voice' && <VoiceAssistant language={language} />}
        {activeTab === 'aid' && <LegalAid language={language} />}
        {activeTab === 'emergency' && <Emergency language={language} />}
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p className="copyright">
            © 2025 Team Equinox. All rights reserved. | Built for social impact and justice accessibility.
          </p>
        </div>
      </footer>
    </div>
  );
}

// Voice Assistant Component
function VoiceAssistant({ language }: { language: 'en' | 'hi' }) {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<LegalResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const handleTextQuery = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      console.log('Sending text query to:', `${API_BASE_URL}/text-query`);
      const res = await fetch(`${API_BASE_URL}/text-query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: query, language })
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      console.log('Text query response:', data);
      setResponse(data);
    } catch (error) {
      console.error('Error processing text query:', error);
      alert(`Error processing query: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`);
    }
    setLoading(false);
  };

  const simulateVoiceRecording = () => {
    setIsRecording(true);
    // Simulate recording for 2 seconds
    setTimeout(() => {
      setIsRecording(false);
      const mockQueries = [
        'My landlord is threatening me',
        'My husband beats me', 
        'I haven\'t been paid for 3 months'
      ];
      const randomQuery = mockQueries[Math.floor(Math.random() * mockQueries.length)];
      setQuery(randomQuery);
    }, 2000);
  };

  return (
    <div className="voice-assistant">
      <h2>{language === 'en' ? 'Ask Your Legal Question' : 'अपना कानूनी प्रश्न पूछें'}</h2>
      
      <div className="input-section">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={language === 'en' ? 'Describe your legal issue...' : 'अपनी कानूनी समस्या बताएं...'}
          rows={4}
          disabled={loading}
        />
        
        <div className="buttons">
          <button onClick={handleTextQuery} disabled={loading || !query.trim()}>
            {loading ? '⏳' : '📝'} {language === 'en' ? 'Send Text' : 'टेक्स्ट भेजें'}
          </button>
          <button 
            onClick={simulateVoiceRecording} 
            disabled={loading || isRecording}
            className="voice-btn"
          >
            {isRecording ? '🔴' : '🎤'} {language === 'en' ? 'Voice' : 'आवाज'}
          </button>
        </div>
      </div>

      {response && (
        <div className="response">
          <h3>{response.issue_type}</h3>
          <div className="advice">
            <h4>{language === 'en' ? 'Legal Advice:' : 'कानूनी सलाह:'}</h4>
            <p>{response.advice}</p>
          </div>
          
          <div className="next-steps">
            <h4>{language === 'en' ? 'Next Steps:' : 'अगले कदम:'}</h4>
            <ul>
              {response.next_steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>

          {response.emergency_contacts && (
            <div className="emergency-contacts">
              <h4>{language === 'en' ? 'Emergency Contacts:' : 'आपातकालीन संपर्क:'}</h4>
              {response.emergency_contacts.map((contact, index) => (
                <div key={index} className="contact">
                  <strong>{contact.name}:</strong> 
                  <a href={`tel:${contact.number}`}>{contact.number}</a>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Legal Aid Component
function LegalAid({ language }: { language: 'en' | 'hi' }) {
  const [centers, setCenters] = useState<LegalAidCenter[]>([]);
  const [loading, setLoading] = useState(false);

  const loadCenters = async () => {
    setLoading(true);
    try {
      console.log('Fetching legal aid centers from:', `${API_BASE_URL}/legal-aid-centers`);
      const res = await fetch(`${API_BASE_URL}/legal-aid-centers`);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      console.log('Legal aid centers data:', data);
      setCenters(data);
    } catch (error) {
      console.error('Error loading legal aid centers:', error);
      alert(`Error loading legal aid centers: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    loadCenters();
  }, []);

  return (
    <div className="legal-aid">
      <div className="section-header">
        <h2>{language === 'en' ? 'Legal Aid Centers' : 'कानूनी सहायता केंद्र'}</h2>
        <p className="section-subtitle">
          {language === 'en' 
            ? 'Find experienced legal professionals and aid centers near you'
            : 'अपने नजदीक अनुभवी कानूनी पेशेवर और सहायता केंद्र खोजें'}
        </p>
      </div>
      
      {loading ? (
        <div className="loading">Loading legal aid centers...</div>
      ) : (
        <div className="centers-list">
          {centers.map(center => (
            <div key={center.id} className="center-card">
              <h3>{center.name}</h3>
              <p><strong>{language === 'en' ? 'Address:' : 'पता:'}</strong> {center.address}</p>
              <p><strong>{language === 'en' ? 'Phone:' : 'फोन:'}</strong> 
                <a href={`tel:${center.phone}`}>{center.phone}</a>
              </p>
              <div className="services">
                <strong>{language === 'en' ? 'Services:' : 'सेवाएं:'}</strong>
                <ul>
                  {center.services.map((service, index) => (
                    <li key={index}>{service}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Emergency Component
function Emergency({ language }: { language: 'en' | 'hi' }) {
  const [contacts, setContacts] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const loadContacts = async () => {
    setLoading(true);
    try {
      console.log('Fetching emergency contacts from:', `${API_BASE_URL}/emergency-contacts`);
      const res = await fetch(`${API_BASE_URL}/emergency-contacts`);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      console.log('Emergency contacts data:', data);
      setContacts(data);
    } catch (error) {
      console.error('Error loading emergency contacts:', error);
      alert(`Error loading emergency contacts: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    loadContacts();
  }, []);

  const makeCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="emergency">
      <div className="section-header">
        <h2>{language === 'en' ? 'Emergency Contacts' : 'आपातकालीन संपर्क'}</h2>
        <p className="section-subtitle">
          {language === 'en' 
            ? 'Quick access to emergency helplines and immediate assistance'
            : 'आपातकालीन हेल्पलाइन और तत्काल सहायता तक त्वरित पहुंच'}
        </p>
      </div>
      
      {loading ? (
        <div className="loading">Loading emergency contacts...</div>
      ) : (
        <div className="contacts-grid">
          {Object.keys(contacts).map(category => (
            <div key={category} className="contact-category">
              <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
              <div className="contacts">
                {contacts[category]?.map((contact: EmergencyContact, index: number) => (
                  <button
                    key={index}
                    className="emergency-button"
                    onClick={() => makeCall(contact.number)}
                  >
                    <div className="contact-name">{contact.name}</div>
                    <div className="contact-number">{contact.number}</div>
                    <div className="contact-desc">{contact.description}</div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);