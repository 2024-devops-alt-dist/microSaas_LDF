import type { Circle, ICircleService } from '../types';

import myCirclesData from '../data/mockMyCircles.json';
import availableCirclesData from '../data/mockAvailableCircles.json';

const USE_MOCK = true;

export class MockCircleService implements ICircleService {
  async getMyCircles(): Promise<Circle[]> {
    return USE_MOCK ? myCirclesData : [];
  }

  async getAvailableCircles(): Promise<Circle[]> {
    return USE_MOCK ? availableCirclesData : [];
  }
  async requestToJoinCircle(circleId: string): Promise<Circle> {
    // Aquí iría la lógica para solicitar unirse a un círculo
    // Por ahora, simplemente devolvemos un círculo simulado
    const circle = availableCirclesData.find((c) => c.id === circleId);
    if (!circle) {
      throw new Error('Circle not found');
    }
    return circle;
  }

  async leaveCircle(circleId: string): Promise<{ success: boolean }> {
    // Aquí iría la lógica para salir de un círculo
    // Por ahora, simplemente devolvemos éxito simulado
    return { success: true };
  }
}
