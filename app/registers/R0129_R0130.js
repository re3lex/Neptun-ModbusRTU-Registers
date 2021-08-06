const BaseR0123_R0129 = require('./BaseR0123_R0129');

/** Настройки счетчиков  модуля в слоте 4.  */
class R0129_R0130 extends BaseR0123_R0129 {
  static startReg = 129;

  static getInstance(){
    return new R0129_R0130();
  }

}

module.exports = R0129_R0130;