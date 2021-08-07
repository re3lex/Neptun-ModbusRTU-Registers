const BaseR0107_R0122 = require('./BaseR0107_R0122');

/** Показания 2 счетчика в слоте 2 */
class R0113_R0114 extends BaseR0107_R0122 {
  static startReg = 113;

  static getInstance(){
    return new R0113_R0114();
  }
  
}

module.exports = R0113_R0114;