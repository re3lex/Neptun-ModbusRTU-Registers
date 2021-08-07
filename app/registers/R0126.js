const BaseR0123_R0130 = require('./BaseR0123_R0130');

/** Настройки 2 счетчика в слоте 2.  */
class R0126 extends BaseR0123_R0130 {
  static startReg = 126;

  static getInstance(){
    return new R0126();
  }
}

module.exports = R0126;