import type { Circle, CircleMember, ICircleService } from '../types';

const CURRENT_USER_ID = '695bbcae94835a46dc227863';
const API_URL = 'http://localhost:3000';

export class CircleService implements ICircleService {
  private async request<T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(
        `Error HTTP: ${response.status} - ${response.statusText}`,
      );
    }

    if (response.status === 204) return null as T;

    const text = await response.text();
    return text ? (JSON.parse(text) as T) : (null as T);
  }

  async getMyCircles(): Promise<Circle[]> {
    // when Auth is ready, replace with actual user ID
    //return this.request<Circle[]>(`/circles/mycircles?userId=${userId}`);
    return this.request<Circle[]>(
      `/circles/mycircles?userId=${CURRENT_USER_ID}`,
    );
  }

  async getAvailableCircles(): Promise<Circle[]> {
    return this.request<Circle[]>('/circles');
  }

  async getCircleById(id: string): Promise<Circle> {
    return this.request<Circle>(`/circles/${id}`);
  }

  async getCirclesByType(type: string): Promise<Circle[]> {
    return this.request<Circle[]>(`/circles/type/${type}`);
  }

  async createCircle(circleData: Partial<Circle>): Promise<Circle> {
    return this.request<Circle>('/circles', {
      method: 'POST',
      body: JSON.stringify(circleData),
    });
  }

  // USER ACTION METHODS

  async requestToJoinCircle(
    circleId: string,
    memberData?: Partial<CircleMember>,
  ): Promise<Circle> {
    const memberPayload = memberData || {
      userId: CURRENT_USER_ID,
      role: 'member',
    };

    return this.request(`/circles/${circleId}/join`, {
      method: 'POST',
      body: JSON.stringify({
        member: memberPayload,
      }),
    });
  }

  async leaveCircle(
    circleId: string,
    userId: string = CURRENT_USER_ID,
  ): Promise<{ success: boolean }> {
    return this.request(`/circles/${circleId}/leave`, {
      method: 'POST',
      body: JSON.stringify({ userId: userId }),
    });
  }

  async approveRequest(circleId: string, userId: string): Promise<Circle> {
    return this.request(`/circles/${circleId}/approve`, {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });
  }
}
