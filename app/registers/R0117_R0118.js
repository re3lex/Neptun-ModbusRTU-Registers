const BaseR0107_R0122 = require('./BaseR0107_R0122');

/** Показания 2 счетчика в слоте 3 */
class R0117_R0118 extends BaseR0107_R0122 {
  static startReg = 117;

  static getInstance(){
    return new R0117_R0118();
  }
  
}

module.exports = R0117_R0118;