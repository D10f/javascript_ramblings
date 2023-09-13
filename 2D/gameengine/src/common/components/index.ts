import Vector2D from '../objects/Vector2D';

export type TransformComponent = {
  type: 'Transform';
  position: { x: number; y: number };
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
