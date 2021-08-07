const BaseRegister = require('./BaseRegister');

/** Base class for registers R0107 - R0122 */
class BaseR0107_R0122 extends BaseRegister {
  static regLength = 2;

  value;

  static parse(buffer) {
    const r = new this();
    r.value = buffer.readUInt32BE(0);
    return r;
  }

  static getInstance() {
    throw new Error("Should be implemented in sub-classes!");
  }

  getRegValues() {
    const arr1 = this.toUint16Array(this.value);
    
    return [...arr1];
  }
}


module.exports = BaseR0107_R0122;