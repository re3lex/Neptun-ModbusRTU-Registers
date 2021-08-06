const BaseRegister = require('./BaseRegister');

/** Base class for registers R0001 - R0002 */
class BaseR0001_R0002 extends BaseRegister {

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
    const r = this.getInstance();
    r.controlingGroupForLine2 = this.getBits(buffer, 1, 0, 2);
    r.inputTypeLine2 = this.getBits(buffer, 1, 2, 2);
    r.controlingGroupForLine1 = this.getBits(buffer, 0, 0, 2);
    r.inputTypeLine1 = this.getBits(buffer, 0, 2, 2);

    return r;
  }

  static getInstance() {
    throw new Error("Should be implemented in sub-classes!");
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


module.exports = BaseR0001_R0002;