const BaseRegister = require('./BaseRegister');

/** Статус входов проводных линий */
class R0003 extends BaseRegister {
  static startReg = 3;

  static getDescription() {
    return `Статус входов проводных линий`;
  }

  static fields = {
    'wiredSensorLine1State': {
      type: 'boolean',
      description: 'Статус первой линии'
    },
    'wiredSensorLine2State': {
      type: 'boolean',
      description: 'Статус второй линии'
    },
    'wiredSensorLine3State': {
      type: 'boolean',
      description: 'Статус третьей линии'
    },
    'wiredSensorLine4State': {
      type: 'boolean',
      description: 'Статус четвертой линии'
    },
  }


  // Статус первой линии
  wiredSensorLine1State;

  // Статус второй линии
  wiredSensorLine2State;

  // Статус третьей линии
  wiredSensorLine3State;

  // Статус четвертой линии
  wiredSensorLine4State;

  static parse(buffer) {
    const r = new R0003();

    Object.keys(R0003.fields).forEach((f, idx) => {
      r[f] = buffer.readBit(idx % 8, 0);
    });
    return r;
  }
}


module.exports = R0003;