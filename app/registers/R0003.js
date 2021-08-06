const BaseRegister = require('./BaseRegister');

/** Статус входов проводных линий */
class R0003 extends BaseRegister{
  static startReg = 3;

  static fields = [
    'wiredSensorLine1State',      // Статус первой линии
    'wiredSensorLine2State',      // Статус второй линии
    'wiredSensorLine3State',      // Статус третьей линии
    'wiredSensorLine4State',      // Статус четвертой линии
  ]

  static parse(buffer) {
    const r = new R0003();

    R0003.fields.forEach((f, idx)=>{
      r[f] = buffer.readBit(idx % 8, 0);
    });
    return r;
  }
}


module.exports = R0003;