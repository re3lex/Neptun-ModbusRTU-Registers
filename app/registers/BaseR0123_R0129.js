const BaseRegister = require('./BaseRegister');

/** Base class for registers R0123 - R0130 */
class BaseR0123_R0129 extends BaseRegister {
  static regLength = 2;

  // Статус счетчика 
  meter1State;

  // Тип подключения счетчика
  meter1Type;

  // Наличие ошибок при типе подключения Namur 
  meter1NamurError;

  // Шаг счета
  meter1Step;

  // Статус счетчика 
  meter2State;

  // Тип подключения счетчика
  meter2Type;

  // Наличие ошибок при типе подключения Namur 
  meter2NamurError;

  // Шаг счета
  meter2Step;



  static parse(buffer) {
    const r = this.getInstance();

    r.meter1State = buffer.readBit(0, 1);
    r.meter1Type = buffer.readBit(1, 1) ? 1 : 0;

    r.meter1NamurError = this.getBits(buffer, 1, 2, 2);
    r.meter1Step = buffer.readUInt8(0);

    r.meter2State = buffer.readBit(0, 3);
    r.meter2Type = buffer.readBit(1, 3) ? 1 : 0;
    r.meter2NamurError = this.getBits(buffer, 2, 2, 2);
    r.meter2Step = buffer.readUInt8(2);

    return r;
  }

  static getInstance() {
    throw new Error("Should be implemented in sub-classes!");
  }

}


module.exports = BaseR0123_R0129;