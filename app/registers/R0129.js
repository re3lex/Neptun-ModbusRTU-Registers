const BaseR0123_R0130 = require('./BaseR0123_R0130');

/** Настройки 1 счетчика в слоте 4.  */
class R0129 extends BaseR0123_R0130 {
  static startReg = 129;

  static getInstance(){
    return new R0129();
  }
}

module.exports = R0129;