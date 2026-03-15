import { useState, useEffect } from 'react';
import { CircleService } from '../services/circles.service';
import type { Circle } from '../types';

const circlesService = new CircleService();

export const useMyCircles = () => {
  const [circles, setCircles] = useState<Circle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    circlesService
      .getMyCircles()
      .then(setCircles)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { circles, loading };
};
