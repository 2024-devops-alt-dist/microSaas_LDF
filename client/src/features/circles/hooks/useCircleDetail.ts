import { useState, useEffect } from 'react';
import { CircleService } from '../services/circles.service';
import type { Circle } from '../types';
import { getErrorMessage } from '../../../utils/getErrorMessage';

const circleService = new CircleService();

export const useCircleDetail = (id: string | undefined) => {
  const [circle, setCircle] = useState<Circle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchCircle = async () => {
      setLoading(true);
      try {
        const data = await circleService.getCircleById(id);
        setCircle(data);
        setError(null);
      } catch (err) {
        setError(getErrorMessage(err, 'Could not load circle details'));
      } finally {
        setLoading(false);
      }
    };

    fetchCircle();
  }, [id]);

  return { circle, loading, error };
};
