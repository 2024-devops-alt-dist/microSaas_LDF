import type { Circle, CircleMember, ICircleService } from '../types';
import { client } from '@/shared/api/client';

export class CircleService implements ICircleService {
  // USER ACTION METHODS

  async requestToJoinCircle(
    circleId: string,
    memberData?: Partial<CircleMember>,
  ): Promise<Circle> {
    const { data } = await client.post<Circle>(`/circles/${circleId}/join`, {
      member: memberData,
    });
    return data;
  }

  async leaveCircle(circleId: string): Promise<{ success: boolean }> {
    const { data } = await client.post(`/circles/${circleId}/leave`);
    return data;
  }

  async approveRequest(circleId: string, userId: string): Promise<Circle> {
    const { data } = await client.post<Circle>(`/circles/${circleId}/approve`, {
      userId,
    });
    return data;
  }

  // ******
  async getAvailableCircles(): Promise<Circle[]> {
    const { data } = await client.get<Circle[]>('/circles');
    return data;
  }

  async getMyCircles(): Promise<Circle[]> {
    const { data } = await client.get<Circle[]>('/circles/mycircles');
    return data;
  }

  async getCircleById(id: string): Promise<Circle> {
    const { data } = await client.get<Circle>(`/circles/${id}`);
    return data;
  }

  async getCirclesByType(type: string): Promise<Circle[]> {
    const { data } = await client.get<Circle[]>(`/circles/type/${type}`);
    return data;
  }

  async createCircle(circleData: Partial<Circle>): Promise<Circle> {
    const { data } = await client.post<Circle>('/circles', circleData);
    return data;
  }
}
