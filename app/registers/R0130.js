const BaseR0123_R0130 = require('./BaseR0123_R0130');

/** Настройки 2 счетчика в слоте 4.  */
class R0130 extends BaseR0123_R0130 {
  static startReg = 130;

  static getInstance(){
    return new R0130();
  }
}

module.exports = R0130;