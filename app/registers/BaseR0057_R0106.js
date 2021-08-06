const BaseRegister = require('./BaseRegister');

/** Base class for registers R0057 - R0106 */
class BaseR0057_R0106 extends BaseRegister {

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
    const r = this.getInstance();
    r.alert = buffer.readBit(0, 1);
    r.lowBat = buffer.readBit(1, 1);
    r.missed = buffer.readBit(2, 1);
    r.link = this.getBits(buffer, 3, 3);
    r.batLevel = buffer.readUInt8(0);

    return r;
  }

  static getInstance() {
    throw new Error("Should be implemented in sub-classes!");
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


module.exports = BaseR0057_R0106;