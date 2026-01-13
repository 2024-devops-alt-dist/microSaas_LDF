import React, { useEffect, useState } from 'react';
import { MainLayout } from '../../../shared/UI/MainLayout';
import { CircleCard } from './CircleCard';
import type { Circle } from '../types';
import { CircleService } from '../services/circleService';

const circleService = new CircleService();

const AvailableCirclesView: React.FC = () => {
  const [circles, setCircles] = useState<Circle[]>([]);
  const [loading, setLoading] = useState(true);

  const [joiningId, setJoiningId] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvailableCircles = async () => {
      try {
        setLoading(true);
        const data = await circleService.getAvailableCircles();
        setCircles(data);
      } catch (error) {
        console.error('Error fetching available circles', error);
      } finally {
        setLoading(false);
      }
    };
    void fetchAvailableCircles();
  }, []);

  const handleJoinRequest = async (circleId: string) => {
    try {
      setJoiningId(circleId);
      await circleService.requestToJoinCircle(circleId);

      alert('Request sent successfully! 🎉');
    } catch (error) {
      console.error('Error joining circle', error);
      alert('Failed to join circle. Try again.');
    } finally {
      setJoiningId(null);
    }
  };

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
            <CircleCard
              key={circle._id}
              circle={circle}
              onRequestJoin={handleJoinRequest}
              isJoining={joiningId === circle._id}
            />
          ))}
        </div>
      ) : (
        <div className="h-full flex flex-col justify-center pb-10">
          <div className="card bg-base-200/90 backdrop-blur-sm shadow-xl border border-white/50 p-8 items-center text-center">
            <h2 className="text-primary text-xl font-normal font-title mb-8">
              No new circles available right now.
            </h2>
            <p className="text-neutral/70">Check back later!</p>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default AvailableCirclesView;
