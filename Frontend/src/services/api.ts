import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_id');
      localStorage.removeItem('isAuthenticated');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export interface UserRegistration {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  location: string;
  gender: string;
  age: number;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface TextAnalysisRequest {
  text: string;
  user_id: string;
}

export interface BehavioralDataRequest {
  user_id: string;
  social_media_posts?: string[];
  sleep_hours?: number;
  activity_level?: number;
  mood_rating?: number;
  stress_level?: number;
}

export interface RiskAssessmentResponse {
  risk_score: number;
  risk_level: string;
  factors: Record<string, number>;
  recommendations: string[];
  timestamp: string;
}

export const authAPI = {
  register: (userData: UserRegistration) => 
    api.post('/auth/register', userData),
  
  login: (credentials: UserLogin) => 
    api.post('/auth/login', credentials),
};

export const aiAPI = {
  analyzeText: (text: string, userId: string) => 
    api.post<{
      sentiment: any;
      mental_health_indicators: any;
      analysis_id: string;
    }>('/ai/analyze-text', { text, user_id: userId }),
  
  performRiskAssessment: (data: BehavioralDataRequest) => 
    api.post<RiskAssessmentResponse>('/ai/risk-assessment', data),
  
  getUserAssessments: () => 
    api.get<{ assessments: any[] }>('/user/assessments'),
};

export const userAPI = {
  getProfile: () => 
    api.get<{ user: any }>('/user/profile'),
};

export default api;