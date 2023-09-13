import {
  TransformComponent,
  ShapeComponent,
  MovementComponent,
  SpriteComponent,
} from '../../common/components';

type Component<T extends ComponentTypes> = T & {
  id: number;
  type: string;
};

type ComponentTypes =
  | TransformComponent
  | MovementComponent
  | ShapeComponent
  | SpriteComponent;

class ComponentBase {
  private readonly _id: number;
  private readonly _type: string;

  constructor(id: number, { type, ...args }: any) {
    this._id = id;
    this._type = type;
    Object.assign(this, args);
  }

  get id() {
    return this._id;
  }

  get type() {
    return this._type;
  }
}

export function componentFactory() {
  let counter = 0;
  const ref = new Map<string, number>();

  return function <T extends ComponentTypes>(args: T) {
    let id = ref.get(args.type);
    if (id === undefined) {
      id = counter;
      ref.set(args.type, counter++);
    }
    return new ComponentBase(id, args) as unknown as Component<T>;
  };
}
