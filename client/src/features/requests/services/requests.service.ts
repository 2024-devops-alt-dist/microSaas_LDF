import { client } from '@/shared/api/client';
import type { MatchCriteria } from '../types';

export const requestsService = {
  async createJoinRequest(circleId: string, matchCriteria: MatchCriteria) {
    const response = await client.post('/requests/join', {
      circleId,
      matchCriteria,
    });
    return response.data;
  },

  async getPendingRequests(circleId: string) {
    const response = await client.get(`/requests/circle/${circleId}`);
    return response.data;
  },
};
