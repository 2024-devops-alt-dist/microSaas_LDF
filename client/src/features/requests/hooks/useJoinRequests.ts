import { useState } from 'react';
import { requestsService } from '../services/requests.service';
import type { MatchCriteria } from '../types';
import { getErrorMessage } from '../../../utils/getErrorMessage';

export const useJoinRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetError = () => setError(null);

  const sendJoinRequest = async (circleId: string, criteria: MatchCriteria) => {
    setIsLoading(true);
    setError(null);
    try {
      await requestsService.createJoinRequest(circleId, criteria);
      return { success: true };
    } catch (err: unknown) {
      const message = getErrorMessage(err, 'Error sending join request');
      setError(message);
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  };

  return { sendJoinRequest, isLoading, error, resetError };
};
