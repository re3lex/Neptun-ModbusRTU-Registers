const BaseRegister = require('./BaseRegister');

/**Конфигурация и статус  модуля */
class R0000 extends BaseRegister {
  static startReg = 0;

  static fields = [
    'floorWash',                  // Флаг состояния режима мойка пола
    'firstGroupAlert',            // Флаг наличия тревоги по первой группе
    'secondGroupAlert',           //
    'wirelessSensorLowBat',       //    
    'wirelessSensorLoss',         //  
    'firstGroupTapClosing',       //Флаг закрытия кранов первой группе по потере датчиков
    'secondGroupTapClosing',      // Флаг закрытия кранов второй группе по потере датчиков
    'wirelessSensorPairingMode',  //Флаг запуска процедуры  подключения  беспроводных устройств
    
    'firstGroupTapState',         //Состояние кранов первой группы
    'secondGroupTapState',        //Состояние кранов второй группы
    'twoGroupsMode',              // Включение группирования
    'tapsClosingOnSensorLoss',     // Закрывания кранов при потере беспроводного датчика протечки
    'keyboardLock',               //Блокировки клавиатуры
  ]

  static parse(buffer) {
    const r = new R0000();

    R0000.fields.forEach((f, idx) => {
      const byteOffset = idx < 8 ? 1 : 0;

      r[f] = buffer.readBit(idx % 8, byteOffset);
    });
    return r;
  }

  getRegValues() {
    const data = [];

    R0000.fields.forEach((f) => {
      data.push(this[f] ? '1' : '0');
    });

    const bin = data.reverse().join("");
    return [parseInt(bin, 2)];
  }
}


module.exports = R0000;