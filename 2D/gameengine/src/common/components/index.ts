import Vector2D from '../objects/Vector2D';

type ComponentMap = {
  transform: TransformComponent;
  movement: MovementComponent;
  sprite: SpriteComponent;
  shape: ShapeComponent;
};

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

export type ComponentType = keyof ComponentMap;

export type ComponentArgs<T extends ComponentType> = ComponentMap[T];

export type Component<T extends ComponentType> = T & IComponent;

export type IComponent = {
  id: number;
  type: string;
};
