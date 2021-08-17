const BaseRegister = require('./BaseRegister');

/**Конфигурация и статус  модуля */
class R0000 extends BaseRegister {
  static startReg = 0;

  static getDescription() {
    return 'Конфигурация и статус  модуля';
  }

  static fields = {
    'floorWash': {
      type: 'boolean',
      description: 'Флаг состояния режима мойка пола',
      writable: true
    },
    'firstGroupAlert': {
      type: 'boolean',
      description: 'Флаг наличия тревоги по первой группе',
    },
    'secondGroupAlert': {
      type: 'boolean',
      description: 'Флаг наличия тревоги по  второй группе',
    },
    'wirelessSensorLowBat': {
      type: 'boolean',
      description: 'Флаг разряда батарей в беспроводных датчиках',
    },
    'wirelessSensorLoss': {
      type: 'boolean',
      description: 'Флаг потери беспроводных датчиков',
    },
    'firstGroupTapClosing': {
      type: 'boolean',
      description: 'Флаг закрытия кранов первой группе по потере датчиков',
    },
    'secondGroupTapClosing': {
      type: 'boolean',
      description: 'Флаг закрытия кранов второй группе по потере датчиков',
    },
    'wirelessSensorPairingMode': {
      type: 'boolean',
      description: 'Флаг запуска процедуры  подключения  беспроводных устройств',
      writable: true
    },
    'firstGroupTapState': {
      type: 'boolean',
      description: 'Состояние кранов первой группы',
      writable: true
    },
    'secondGroupTapState': {
      type: 'boolean',
      description: 'Состояние кранов второй группы',
      writable: true
    },
    'twoGroupsMode': {
      type: 'boolean',
      description: 'Включение группирования',
      writable: true
    },
    'tapsClosingOnSensorLoss': {
      type: 'boolean',
      description: 'Закрывания кранов при потере беспроводного датчика протечки',
      writable: true
    },
    'keyboardLock': {
      type: 'boolean',
      description: 'Блокировки клавиатуры',
      writable: true
    },
  }


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

    Object.keys(R0000.fields).forEach((f, idx) => {
      const byteOffset = idx < 8 ? 1 : 0;

      r[f] = buffer.readBit(idx % 8, byteOffset);
    });
    return r;
  }

  getRegValues() {
    const data = [];

    Object.keys(R0000.fields).forEach((f) => {
      data.push(this[f] ? '1' : '0');
    });

    const bin = data.reverse().join("");
    return [parseInt(bin, 2)];
  }
}


module.exports = R0000;