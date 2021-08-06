const BaseR0123_R0129 = require('./BaseR0123_R0129');

/** Настройки счетчиков  модуля в слоте 1.  */
class R0123_R0124 extends BaseR0123_R0129 {
  static startReg = 123;

  static getInstance(){
    return new R0123_R0124();
  }

}

module.exports = R0123_R0124;