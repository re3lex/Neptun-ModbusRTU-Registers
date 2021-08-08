const BaseRegister = require('./BaseRegister');

/** 
  Base class for registers R0123 - R0130 

  0123: Настройки 1 счетчика в слоте 1
  0124: Настройки 2 счетчика в слоте 1
  0125: Настройки 1 счетчика в слоте 2
  0126: Настройки 2 счетчика в слоте 2
  0127: Настройки 1 счетчика в слоте 3
  0128: Настройки 2 счетчика в слоте 3
  0129: Настройки 1 счетчика в слоте 4
  0130: Настройки 2 счетчика в слоте 4
 
*/
class R0123_R0130 extends BaseRegister {

  // Статус счетчика 
  enabled;

  // Тип подключения счетчика
  type;

  // Наличие ошибок при типе подключения Namur 
  namurError;

  // Шаг счета
  step;

  static parse(buffer) {
    const r = new this();

    r.enabled = buffer.readBit(0, 1);
    r.type = buffer.readBit(1, 1) ? 1 : 0;

    r.namurError = this.getBits(buffer, 1, 2, 2);
    r.step = buffer.readUInt8(0);

    return r;
  }

  getRegValues() {
    const data = [];

    data.push(this.toBin(this.step, 8));

    data.push(this.toBin(this.namurError, 6));
    data.push(this.toBin(this.type));
    data.push(this.toBin(this.enabled));

    const bin = data.join("");
    return [parseInt(bin, 2)];
  }

  static getRegClass(reg) {
    if(reg < 123 || reg > 130) {
      throw new Error('Only registers between 123 and 130 are supported!');
    }
    
    return eval(`(class R0${reg} extends R0123_R0130 {
      static startReg = ${reg};
    })`);
  }
}


module.exports = R0123_R0130;