const BaseRegister = require('./BaseRegister');

/** 
  Base class for registers R0123 - R0130 

  0123: Настройки 1 счетчика в слоте 1
  0124: Настройки 2 счетчика в слоте 1
  0125: Настройки 1 счетчика в слоте 2
  0126: Настройки 2 счетчика в слоте 2
  0127: Настройки 1 счетчика в слоте 3
  0128: Настройки 2 счетчика в слоте 3
  0129: Настройки 1 счетчика в слоте 4
  0130: Настройки 2 счетчика в слоте 4
 
*/
class R0123_R0130 extends BaseRegister {

  static getDescription() {
    let counter;
    let slot;

    switch (this.startReg) {
      case 123:
        counter = 1;
        slot = 1
        break;
      case 124:
        counter = 2;
        slot = 1
        break;
      case 125:
        counter = 1;
        slot = 2
        break;
      case 126:
        counter = 2;
        slot = 2
        break;
      case 127:
        counter = 1;
        slot = 3
        break;
      case 128:
        counter = 2;
        slot = 3
        break;
      case 129:
        counter = 1;
        slot = 4
        break;
      case 130:
        counter = 2;
        slot = 4
        break;
    }
    return `Настройки ${counter} счетчика в слоте ${slot}`;
  }

  static fields = {
    'enabled': {
      type: 'boolean',
      description: 'Статус счетчика',
      writable: true
    },
    'type': {
      type: 'list',
      options: {
        0: 'обычное',
        1: 'Namur',
      },
      description: 'Тип подключения счетчика',
      writable: true
    },
    'namurError': {
      type: 'list',
      options: {
        0: 'нет ошибок',
        1: 'КЗ линии',
        2: 'обрыв линии',
      },
      description: 'Наличие ошибок при типе подключения Namur'
    },
    'step': {
      type: 'list',
      options: {
        1: 1,
        10: 10,
        100: 100
      },
      description: 'Шаг счета',
      writable: true
    },
  }

  // Статус счетчика 
  enabled;

  // Тип подключения счетчика
  type;

  // Наличие ошибок при типе подключения Namur 
  namurError;

  // Шаг счета
  step;

  static parse(buffer) {
    const r = new this();

    r.enabled = buffer.readBit(0, 1);
    r.type = buffer.readBit(1, 1) ? 1 : 0;

    r.namurError = this.getBits(buffer, 1, 2, 2);
    r.step = buffer.readUInt8(0);

    return r;
  }

  getRegValues() {
    const data = [];

    data.push(this.toBin(this.step, 8));

    data.push(this.toBin(this.namurError, 6));
    data.push(this.toBin(this.type));
    data.push(this.toBin(this.enabled));

    const bin = data.join("");
    return [parseInt(bin, 2)];
  }

  static getRegClass(reg) {
    if (reg < 123 || reg > 130) {
      throw new Error('Only registers between 123 and 130 are supported!');
    }

    return eval(`(class R0${reg} extends R0123_R0130 {
      static startReg = ${reg};
    })`);
  }
}


module.exports = R0123_R0130;