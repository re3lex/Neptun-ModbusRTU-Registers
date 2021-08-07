const BaseR0123_R0130 = require('./BaseR0123_R0130');

/** Настройки 1 счетчика в слоте 3.  */
class R0127 extends BaseR0123_R0130 {
  static startReg = 127;

  static getInstance(){
    return new R0127();
  }
}

module.exports = R0127;