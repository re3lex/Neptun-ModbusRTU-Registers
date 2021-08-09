const BaseRegister = require('./BaseRegister');

/** 
  Base class for registers R0001 - R0002 

  0001: Конфигурация входа проводной линии датчиков 1 и 2
  0002: Конфигурация входа проводной линии датчиков 3 и 4
*/
class R0001_R0002 extends BaseRegister {
  static fields = [
    'controlingGroupForLine2',
    'inputTypeLine2',
    'controlingGroupForLine1',
    'inputTypeLine1'
  ]
  
  /**
   Управление линиями кранов 2
    1 – краны первой группы; 
    2 – краны второй группы; 
    3 – краны обеих групп
  */
  controlingGroupForLine2;
  /*
      Конфигурация типа входа линии 2
      0 – датчики ; 
      1 – кнопка 
    */
  inputTypeLine2;

  // Управление линиями кранов 1
  controlingGroupForLine1;

  // Конфигурация типа входа линии 1
  inputTypeLine1;

  static parse(buffer) {
    const r = new this();
    r.controlingGroupForLine2 = this.getBits(buffer, 1, 0, 2);
    r.inputTypeLine2 = this.getBits(buffer, 1, 2, 2);

    r.controlingGroupForLine1 = this.getBits(buffer, 0, 0, 2);
    r.inputTypeLine1 = this.getBits(buffer, 0, 2, 2);

    return r;
  }

  static getRegClass(reg) {
    if (reg < 1 || reg > 2) {
      throw new Error('Only registers 1 and 2 are supported!');
    }

    const className = `R000${reg}`;
    return eval(`(class ${className} extends R0001_R0002 {
      static startReg = ${reg};
    })`);
  }

  getRegValues() {
    const data = [];

    data.push(this.toBin(this.inputTypeLine1, 2));
    data.push(this.toBin(this.controlingGroupForLine1, 2));

    data.push(this.toBin(this.inputTypeLine2, 6));
    data.push(this.toBin(this.controlingGroupForLine2, 2));


    const bin = data.join("");
    return [parseInt(bin, 2)];
  }
}


module.exports = R0001_R0002;