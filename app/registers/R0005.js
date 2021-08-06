const BaseRegister = require('./BaseRegister');

/** Адрес MODBUS и скорость порта */
class R0005 extends BaseRegister {
  static startReg = 5;

  static fields = [
    'portSpeed',              // Скорость порта
    'modbusAddr',             // Адрес модуля для MODBUS
  ]

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