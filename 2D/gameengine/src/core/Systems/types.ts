import BitField from 'bitfield';
import { IEntity } from '../Entities/Entity';

export type SystemType = 'render';

export type ISystem = {
  entities: IEntity[];
  systemComponentSignature: BitField;
  addEntity(entity: IEntity): void;
  removeEntity(entity: IEntity): void;
};
