const BaseRegister = require('./BaseRegister');

/** 
  Base class for registers R0007 - R0056 

  0007: Параметры беспроводного датчика 1
    ...
  0056: Параметры беспроводного датчика 50
*/
class R0007_R0056 extends BaseRegister {

  static getDescription() {
    const v = this.startReg - 6;
    return `Параметры беспроводного датчика ${v}`;
  }

  static fields = {
    'wirelessSensorEventAffectedGroup': {
      type: 'list',
      options: {
        1: 'первая группа',
        2: 'вторая группа',
        3: 'обе группы',
      },
      description: 'Отработка событий по группам',
      writable: true
    }
  }

  /**
   Отработка событий по группам 
    1 - первая группа; 
    2 - вторая группа; 
    3 - обе группы
  */
  wirelessSensorEventAffectedGroup;


  static parse(buffer) {
    const r = new this();
    r.wirelessSensorEventAffectedGroup = buffer.readUInt8(1);

    return r;
  }

  static getRegClass(reg) {
    if (reg < 7 || reg > 56) {
      throw new Error('Only registers between 7 and 56 are supported!');
    }

    const className = `R00${reg < 10 ? '0' : ''}${reg}`;
    return eval(`(class ${className} extends R0007_R0056 {
      static startReg = ${reg};
    })`);
  }

  getRegValues() {
    const data = [];

    data.push(this.toBin(0, 8));
    data.push(this.toBin(this.wirelessSensorEventAffectedGroup, 8));

    const bin = data.join("");
    return [parseInt(bin, 2)];
  }
}


module.exports = R0007_R0056;