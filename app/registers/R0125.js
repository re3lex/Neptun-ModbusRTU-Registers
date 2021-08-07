const BaseR0123_R0130 = require('./BaseR0123_R0130');

/** Настройки 1 счетчика в слоте 2.  */
class R0125 extends BaseR0123_R0130 {
  static startReg = 125;

  static getInstance(){
    return new R0125();
  }
}

module.exports = R0125;