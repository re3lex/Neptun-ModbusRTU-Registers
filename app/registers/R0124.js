const BaseR0123_R0130 = require('./BaseR0123_R0130');

/** Настройки 2 счетчика в слоте 1.  */
class R0124 extends BaseR0123_R0130 {
  static startReg = 124;

  static getInstance(){
    return new R0124();
  }
}

module.exports = R0124;