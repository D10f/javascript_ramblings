import Renderer from '../../modules/Renderer';
import BaseSystem from './System';

export default class RenderSystem extends BaseSystem {
  constructor() {
    super();
    this.requireComponents(['transform', 'sprite']);
  }

  render(renderer: Renderer) {
    for (const entity of this.getEntities()) {
      //
    }
  }
}
