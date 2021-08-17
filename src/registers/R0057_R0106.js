const BaseRegister = require('./BaseRegister');

/** 
  Base class for registers R0057 - R0106 

  0057: Статус беспроводного датчика 1
    ...
  0106: Статус беспроводного датчика 50
 */
class R0057_R0106 extends BaseRegister {
  static fields = [
    'alert',
    'lowBat',
    'missed',
    'link',
    'batLevel'
  ]

  //Наличие тревоги 
  alert;    

  //Наличие разряда 
  lowBat;

  //Потеря датчика
  missed;

  /*
    Уровень сигнала от датчика
    0 - нет связи  
    1 – слабый  
    2 - средний 
    3 – хороший  
    4 – отличный
  */
  link;

  // Уровень заряда батареи
  batLevel;

  static parse(buffer) {
    const r = new this();
    r.alert = buffer.readBit(0, 1);
    r.lowBat = buffer.readBit(1, 1);
    r.missed = buffer.readBit(2, 1);
    r.link = this.getBits(buffer, 1, 3, 3);
    r.batLevel = buffer.readUInt8(0);

    return r;
  }

  static getRegClass(reg) {
    if (reg < 57 || reg > 106) {
      throw new Error('Only registers between 57 and 106 are supported!');
    }

    const className = `R0${reg < 100 ? '0' : ''}${reg}`;
    return eval(`(class ${className} extends R0057_R0106 {
      static startReg = ${reg};
    })`);
  }

  getRegValues() {
    const data = [];

    data.push(this.toBin(this.batLevel, 8));
    data.push(this.toBin(this.link, 3));
    data.push(this.toBin(this.missed));
    data.push(this.toBin(this.lowBat));
    data.push(this.toBin(this.alert));

    const bin = data.join("");
    return [parseInt(bin, 2)];
  }
}


module.exports = R0057_R0106;