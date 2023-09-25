import Registry from '../Registry';
import RenderSystem from './RenderSystem';
import { SystemType } from './types';

export default class SystemFactory {
  constructor(private readonly registry: Registry) { }

  create(system: SystemType) {
    switch (system) {
      case 'render':
        return new RenderSystem(this.registry);
      default:
        throw new Error('Invalid system specified.');
    }
  }
}
