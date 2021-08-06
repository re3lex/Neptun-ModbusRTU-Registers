const BaseRegister = require('./BaseRegister');

/** Base class for registers R0107 - R0122 */
class BaseR0107_R0122 extends BaseRegister {

  static regLength = 4;

  meter1Value;
  meter2Value;

  static parse(buffer) {
    //const r = this.getInstance();
    const r = new this();
    r.meter1Value = buffer.readUInt32BE(0);
    r.meter2Value = buffer.readUInt32BE(4);
    return r;
  }

  static getInstance() {
    throw new Error("Should be implemented in sub-classes!");
  }

  getRegValues() {
    const arr1 = this.toUint16Array(this.meter1Value);
    const arr2 = this.toUint16Array(this.meter2Value);
    
    return [...arr1, ...arr2];
  }
}


module.exports = BaseR0107_R0122;