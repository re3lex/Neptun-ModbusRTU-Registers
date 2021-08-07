const BaseR0107_R0122 = require('./BaseR0107_R0122');

/** Показания 2 счетчика в слоте 4 */
class R0121_R0122 extends BaseR0107_R0122 {
  static startReg = 121;

  static getInstance(){
    return new R0121_R0122();
  }
  
}

module.exports = R0121_R0122;