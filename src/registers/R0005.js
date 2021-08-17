const BaseRegister = require('./BaseRegister');

/** Адрес MODBUS и скорость порта */
class R0005 extends BaseRegister {
  static startReg = 5;

  static getDescription() {
    return `Адрес MODBUS и скорость порта`;
  }

  static fields = {
    'portSpeed': {
      type: 'list',
      options: {
        0: 1200,
        1: 2400,
        2: 4800,
        3: 9600,
        4: 19200,
        5: 38400,
        6: 57600,
        7: 115200,
        8: 230400,
        9: 460800,
        10: 921600,
      },
      description: 'Скорость порта',
      writable: true
    },
    'modbusAddr': {
      type: 'int',
      min: 0,
      max: 247,
      description: 'Адрес модуля для MODBUS',
      writable: true
    },
  }

  // Скорость порта
  portSpeed;

  // Адрес модуля для MODBUS
  modbusAddr;

  static parse(buffer) {
    const r = new R0005();
    r.modbusAddr = buffer.readUInt8(0);

    const portSpeedIdx = buffer.readUInt8(1);
    r.portSpeed = 1200;

    for (let i = 1; i <= portSpeedIdx; i++) {
      r.portSpeed = r.portSpeed * 2;
    }

    return r;
  }
}


module.exports = R0005;