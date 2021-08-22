const BaseRegister = require('./BaseRegister');

/** 
  Base class for registers R0107 - R0122 
  
  107: Показания 1 счетчика в слоте 1 
  109: Показания 2 счетчика в слоте 1 
  111: Показания 1 счетчика в слоте 2 
  113: Показания 2 счетчика в слоте 2 
  115: Показания 1 счетчика в слоте 3 
  117: Показания 2 счетчика в слоте 3 
  119: Показания 1 счетчика в слоте 4 
  121: Показания 2 счетчика в слоте 4 
*/
class R0107_R0122 extends BaseRegister {
  static regLength = 2;

  static getDescription() {
    let counter;
    let slot;

    switch (this.startReg) {
      case 107:
        counter = 1;
        slot = 1
        break;
      case 109:
        counter = 2;
        slot = 1
        break;
      case 111:
        counter = 1;
        slot = 2
        break;
      case 113:
        counter = 2;
        slot = 2
        break;
      case 115:
        counter = 1;
        slot = 3
        break;
      case 117:
        counter = 2;
        slot = 3
        break;
      case 119:
        counter = 1;
        slot = 4
        break;
      case 121:
        counter = 2;
        slot = 4
        break;
    }
    return `Показания ${counter} счетчика в слоте ${slot}`;
  }

  static fields = {
    'value': {
      type: 'int',
      max: 99999999,
      description: 'Показания',
      writable: true
    }
  }

  value;

  static parse(buffer) {
    const r = new this();
    r.value = buffer.readUInt32BE(0);
    return r;
  }

  static getRegClass(reg) {
    if (reg < 107 || reg > 122) {
      throw new Error('Only registers between 107 and 122 are supported!');
    }

    const className = `R0${reg}`;
    return eval(`(class ${className} extends R0107_R0122 {
      static startReg = ${reg};
    })`);
  }

  getRegValues() {
    const arr1 = this.toUint16Array(this.value);

    return [...arr1];
  }
}


module.exports = R0107_R0122;