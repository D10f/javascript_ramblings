// import Renderer from '../../modules/Renderer';
import Registry from '../Registry';
import BaseSystem from './System';

export default class RenderSystem extends BaseSystem {
  constructor(registry: Registry) {
    super(registry);
    this.requireComponents(['transform', 'sprite']);
  }

  // render(renderer: Renderer) {
  render() {
    for (const entity of this.entities) {
      console.log(entity.id);
    }
  }
}
