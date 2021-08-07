const BaseR0107_R0122 = require('./BaseR0107_R0122');

/** Показания 1 счетчика в слоте 3 */
class R0115_R0116 extends BaseR0107_R0122 {
  static startReg = 115;

  static getInstance(){
    return new R0115_R0116();
  }
  
}

module.exports = R0115_R0116;