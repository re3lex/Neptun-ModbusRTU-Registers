const BaseR0107_R0122 = require('./BaseR0107_R0122');

/** Показания 1 счетчика в слоте 1 */
class R0107_R0108 extends BaseR0107_R0122 {
  static startReg = 107;

  static getInstance(){
    return new R0107_R0108();
  }
  
}

module.exports = R0107_R0108;