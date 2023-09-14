import Vector2D from '../objects/Vector2D';

export type TransformComponent = {
  type: 'Transform';
  position: Vector2D;
};

export type MovementComponent = {
  type: 'Movement';
  velocity: Vector2D;
};

export type ShapeComponent = {
  type: 'Shape';
  vertices: number;
  color: string;
};

export type SpriteComponent = {
  type: 'Sprite';
  width: number;
  height: number;
};

export type ComponentTypes =
  | TransformComponent
  | MovementComponent
  | ShapeComponent
  | SpriteComponent;

export type Component<T extends ComponentTypes> = T & IComponent;

export type IComponent = {
  id: number;
  type: string;
};
