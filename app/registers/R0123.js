const BaseR0123_R0130 = require('./BaseR0123_R0130');

/** Настройки 1 счетчика в слоте 1.  */
class R0123 extends BaseR0123_R0130 {
  static startReg = 123;

  static getInstance(){
    return new R0123();
  }
}

module.exports = R0123;