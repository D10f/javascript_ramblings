import Vector2D from '../../common/objects/Vector2D';

export type TransformComponent = {
  position: Vector2D;
};

export type MovementComponent = {
  velocity: Vector2D;
};

export type ShapeComponent = {
  vertices: number;
  color: string;
};

export type SpriteComponent = {
  width: number;
  height: number;
};

type ComponentMap = {
  transform: TransformComponent;
  movement: MovementComponent;
  sprite: SpriteComponent;
  shape: ShapeComponent;
};

export type ComponentType = keyof ComponentMap;

export type ComponentArgs<T extends ComponentType> = ComponentMap[T];

export type Component<T extends ComponentType> = ComponentArgs<T> & IComponent;

export type IComponent = {
  id: number;
  type: string;
};
