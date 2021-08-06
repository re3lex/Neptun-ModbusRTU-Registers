const BaseRegister = require('./BaseRegister');

/**Конфигурация и статус  модуля */
class R0000 extends BaseRegister {
  static startReg = 0;

  static fields = [
    'floorWash',
    'firstGroupAlert',
    'secondGroupAlert',
    'wirelessSensorLowBat',
    'wirelessSensorLoss',
    'firstGroupTapClosing',
    'secondGroupTapClosing',
    'wirelessSensorPairingMode',
    'firstGroupTapState',
    'secondGroupTapState',
    'twoGroupsMode',
    'tapsClosingOnSensorLoss',
    'keyboardLock',
  ]


  // Флаг состояния режима мойка пола
  floorWash;

  // Флаг наличия тревоги по первой группе
  firstGroupAlert;

  // Флаг наличия тревоги по  второй группе
  secondGroupAlert;

  // Флаг разряда батарей в беспроводных датчиках    
  wirelessSensorLowBat;

  // Флаг потери беспроводных датчиков
  wirelessSensorLoss;

  // Флаг закрытия кранов первой группе по потере датчиков
  firstGroupTapClosing;

  // Флаг закрытия кранов второй группе по потере датчиков
  secondGroupTapClosing;

  // Флаг запуска процедуры  подключения  беспроводных устройств
  wirelessSensorPairingMode;

  // Состояние кранов первой группы
  firstGroupTapState;

  // Состояние кранов второй группы
  secondGroupTapState;

  // Включение группирования
  twoGroupsMode;

  // Закрывания кранов при потере беспроводного датчика протечки
  tapsClosingOnSensorLoss;

  // Блокировки клавиатуры
  keyboardLock;

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