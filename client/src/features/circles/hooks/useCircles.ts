import { useState, useEffect, useMemo } from 'react';
import { CircleService } from '../services/circles.service';
import type { Circle } from '../types';

export const useCircles = () => {
  const [circles, setCircles] = useState<Circle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const circleService = useMemo(() => new CircleService(), []);

  useEffect(() => {
    const fetchCircles = async () => {
      try {
        setLoading(true);
        const data = await circleService.getAvailableCircles();
        setCircles(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching circles');
      } finally {
        setLoading(false);
      }
    };

    fetchCircles().catch((err) => {
      setError(err instanceof Error ? err.message : 'Error fetching circles');
    });
  }, [circleService]);

  return { circles, loading, error };
};
