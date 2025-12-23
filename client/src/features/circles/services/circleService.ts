import type { Circle, ICircleService } from '../types';

import myCirclesData from '../data/mockMyCircles.json';
import availableCirclesData from '../data/mockAvailableCircles.json';

const USE_MOCK = true;
const SIMULATED_DELAY_MS = 500;

export class MockCircleService implements ICircleService {
  async getMyCircles(): Promise<Circle[]> {
    await delay(SIMULATED_DELAY_MS);

    const data = myCirclesData as { my_circles: Circle[] }[];

    return USE_MOCK ? data[0].my_circles : [];
  }

  async getAvailableCircles(): Promise<Circle[]> {
    await delay(SIMULATED_DELAY_MS);
    const data = availableCirclesData as Circle[];
    return USE_MOCK ? data : [];
  }
  async requestToJoinCircle(circleId: string): Promise<Circle> {
    await delay(SIMULATED_DELAY_MS);
    const circle = availableCirclesData.find(
      (c) => c.id === circleId,
    ) as Circle;
    if (!circle) {
      throw new Error('Circle not found');
    }
    return circle;
  }

  async leaveCircle(circleId: string): Promise<{ success: boolean }> {
    // Aquí iría la lógica para salir de un círculo
    // Por ahora, simplemente devolvemos éxito simulado
    await delay(SIMULATED_DELAY_MS);
    return { success: true };
  }
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
