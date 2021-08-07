const BaseR0107_R0122 = require('./BaseR0107_R0122');

/** Показания 2 счетчика в слоте 1 */
class R0109_R0110 extends BaseR0107_R0122 {
  static startReg = 109;

  static getInstance(){
    return new R0109_R0110();
  }
  
}

module.exports = R0109_R0110;