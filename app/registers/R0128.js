const BaseR0123_R0130 = require('./BaseR0123_R0130');

/** Настройки 2 счетчика в слоте 3.  */
class R0128 extends BaseR0123_R0130 {
  static startReg = 128;

  static getInstance(){
    return new R0128();
  }
}

module.exports = R0128;