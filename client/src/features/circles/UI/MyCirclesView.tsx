import React, { useEffect, useState } from 'react';
import { MainLayout } from '../../../shared/UI/MainLayout';
import { CircleCard } from './CircleCard';
import { CircleService } from '../services/circleService';
import type { Circle } from '../types';

const circleService = new CircleService();

const MyCirclesView: React.FC = () => {
  const [circles, setCircles] = useState<Circle[]>([]);
  const [loading, setLoading] = useState(true);
  // TODO: Replace with actual userId from auth context or hook
  const userId = '';

  useEffect(() => {
    const fetchCircles = async (userId: string) => {
      try {
        setLoading(true);
        const data = await circleService.getMyCircles(userId);
        setCircles(data);
      } catch (error) {
        console.error('Error fetching circles', error);
      } finally {
        setLoading(false);
      }
    };
    void fetchCircles(userId);
  }, [userId]);

  return (
    <MainLayout>
      {loading ? (
        <div className="flex flex-col gap-4">
          <div className="skeleton h-48 w-full bg-base-200/50 rounded-2xl"></div>
          <div className="skeleton h-48 w-full bg-base-200/50 rounded-2xl"></div>
        </div>
      ) : circles.length > 0 ? (
        <div className="flex flex-col !gap-y-[40px] pb-10">
          {circles.map((circle) => (
            <CircleCard key={circle._id} circle={circle} />
          ))}
        </div>
      ) : (
        // Empty State
        <div className="h-full flex flex-col justify-center pb-10">
          <div className="card bg-base-200/90 backdrop-blur-sm shadow-xl border border-white/50 p-8 items-center text-center">
            <h2 className="text-primary text-xl font-normal font-title mb-8">
              Oops... it looks like you haven’t joined a circle yet!
            </h2>
            <button className="btn btn-primary w-full text-white rounded-xl shadow-lg">
              Join a circle
            </button>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default MyCirclesView;
