const BaseRegister = require('./BaseRegister');

/** Количество подключенных беспроводных датчиков  */
class R0006 extends BaseRegister {
  static startReg = 6;

  static getDescription() {
    return `Количество подключенных беспроводных датчиков`;
  }

  static fields = {
    'wirelessSensorNumber': {
      type: 'int',
      description: 'Количество датчиков'
    }
  }

  // Количество датчиков
  wirelessSensorNumber;


  static parse(buffer) {
    const r = new R0006();
    r.wirelessSensorNumber = buffer.readUInt16BE(0);

    return r;
  }
}


module.exports = R0006;