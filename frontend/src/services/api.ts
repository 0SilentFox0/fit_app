import { API_CONFIG } from '../config/api';

let currentApiUrl = API_CONFIG.BASE_URL;

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      email: string;
      role: string;
    };
    accessToken: string;
    refreshToken: string;
  };
}

export interface SignupRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'client' | 'trainer';
}

export interface SignupResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      email: string;
      role: string;
    };
    accessToken: string;
    refreshToken: string;
  };
}

export interface ProgressData {
  userStats: number[];
  averageStats: number[];
  labels: string[];
  userPercentile: number;
  trending: number;
  timeRange: string;
}

export interface AnalyticsResponse {
  success: boolean;
  message: string;
  data: ProgressData;
}

export interface TrainingSession {
  id: string;
  date: string;
  duration: number;
  totalCalories: number;
  exercises: Exercise[];
  trainerName: string;
  sessionType: string;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  calories: number;
  date: string;
}

export interface TrainingHistoryResponse {
  success: boolean;
  message: string;
  data: TrainingSession[];
}

export interface Client {
  id: string;
  name: string;
  email: string;
  avatar: string;
  lastSession: string;
  totalSessions: number;
  progress: {
    strength: number;
    cardio: number;
    flexibility: number;
    balance: number;
  };
  paymentStatus: 'paid' | 'to_pay' | 'subscription';
  subscriptionRemaining?: number;
  nextSession?: string;
}

export interface TrainerClientsResponse {
  success: boolean;
  message: string;
  data: Client[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  clientName: string;
  startTime: string;
  endTime: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  sessionType: string;
  location?: string;
}

export interface BookingRequest {
  id: string;
  clientName: string;
  clientEmail: string;
  requestedDate: string;
  requestedTime: string;
  sessionType: string;
  duration: number;
  message?: string;
}

export interface CalendarResponse {
  success: boolean;
  message: string;
  data: CalendarEvent[];
}

export interface BookingRequestsResponse {
  success: boolean;
  message: string;
  data: BookingRequest[];
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${currentApiUrl}${endpoint}`;
    
    console.log('🌐 Making API request to:', url);
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      console.log('📡 Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ API Error:', errorData);
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ API Response:', data);
      return data;
    } catch (error) {
      console.error('❌ API request failed:', error);
      console.error('🔗 URL attempted:', url);
      throw error;
    }
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async signup(userData: SignupRequest): Promise<SignupResponse> {
    return this.request<SignupResponse>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    return this.request<LoginResponse>('/auth/refresh-token', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  }

  async getHealth(): Promise<{ status: string; timestamp: string }> {
    return this.request<{ status: string; timestamp: string }>('/health');
  }

  async getProgress(): Promise<AnalyticsResponse> {
    return this.request<AnalyticsResponse>('/analytics/progress');
  }

  async getClientProgress(): Promise<AnalyticsResponse> {
    return this.request<AnalyticsResponse>('/clients/progress');
  }

  async getTrainingHistory(): Promise<TrainingHistoryResponse> {
    return this.request<TrainingHistoryResponse>('/workouts/history/detailed');
  }

  async getExerciseProgress(exerciseName: string): Promise<any> {
    return this.request<any>(`/workouts/progress/${encodeURIComponent(exerciseName)}`);
  }

  async getTrainerClients(): Promise<TrainerClientsResponse> {
    return this.request<TrainerClientsResponse>('/trainers/clients');
  }

  async getTrainerCalendarEvents(): Promise<CalendarResponse> {
    return this.request<CalendarResponse>('/trainers/calendar/events');
  }

  async getTrainerBookingRequests(): Promise<BookingRequestsResponse> {
    return this.request<BookingRequestsResponse>('/trainers/calendar/requests');
  }

  async respondToBookingRequest(requestId: string, approved: boolean): Promise<any> {
    return this.request<any>(`/trainers/calendar/requests/${requestId}/respond`, {
      method: 'POST',
      body: JSON.stringify({ approved }),
    });
  }

  // Test API connectivity and switch URLs if needed
  async testConnection(): Promise<boolean> {
    try {
      await this.getHealth();
      console.log('✅ API connection successful');
      return true;
    } catch (error) {
      console.log('❌ API connection failed, trying fallback URLs...');
      
      for (const fallbackUrl of API_CONFIG.FALLBACK_URLS) {
        try {
          currentApiUrl = fallbackUrl;
          console.log('🔄 Trying fallback URL:', fallbackUrl);
          await this.getHealth();
          console.log('✅ Fallback URL working:', fallbackUrl);
          return true;
        } catch (fallbackError) {
          console.log('❌ Fallback URL failed:', fallbackUrl);
        }
      }
      
      // Reset to original URL
      currentApiUrl = API_CONFIG.BASE_URL;
      return false;
    }
  }
}

export const apiService = new ApiService(); 