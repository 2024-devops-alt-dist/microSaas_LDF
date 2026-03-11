import { useState, useEffect, useMemo } from 'react';
import { UserService } from '../services/users.service';
import type { UserProfile } from '../types/index';

export const useExchangePartners = () => {
  const [partners, setPartners] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const userService = useMemo(() => new UserService(), []);

  useEffect(() => {
    userService
      .getAvailableExchangePartners()
      .then(setPartners)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [userService]);

  return { partners, loading };
};
