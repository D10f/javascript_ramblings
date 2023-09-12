import BitField from 'bitfield';

console.log('hellll');
export default class ComponentSignature {
  signature: BitField;

  constructor(size: number) {
    this.signature = new BitField(size);
  }

  compare(s1: ComponentSignature, s2: ComponentSignature) {
    return s1.signature.buffer;
  }
}
