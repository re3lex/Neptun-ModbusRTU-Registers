const BaseRegister = require('./BaseRegister');

/** Количество подключенных беспроводных датчиков  */
class R0006 extends BaseRegister {
  static startReg = 6;

  // Количество датчиков
  wirelessSensorNumber;


  static parse(buffer) {
    const r = new R0006();
    r.wirelessSensorNumber = buffer.readUInt16BE(0);

    return r;
  }
}


module.exports = R0006;