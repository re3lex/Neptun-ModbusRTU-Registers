const BaseR0123_R0129 = require('./BaseR0123_R0129');

/** Настройки счетчиков  модуля в слоте 2.  */
class R0125_R0126 extends BaseR0123_R0129 {
  static startReg = 125;

  static getInstance() {
    return new R0125_R0126();
  }

}

module.exports = R0125_R0126;