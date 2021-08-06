const BaseR0123_R0129 = require('./BaseR0123_R0129');

/** Настройки счетчиков  модуля в слоте 3.  */
class R0127_R0128 extends BaseR0123_R0129 {
  static startReg = 127;

  static getInstance(){
    return new R0127_R0128();
  }

}

module.exports = R0127_R0128;