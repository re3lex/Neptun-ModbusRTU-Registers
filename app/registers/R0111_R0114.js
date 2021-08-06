const BaseR0107_R0122 = require('./BaseR0107_R0122');

/** Показания счетчиков модуля в слоте 2 */
class R0111_R0114 extends BaseR0107_R0122 {
  static startReg = 111;

  static getInstance(){
    return new R0111_R0114();
  }
  
}

module.exports = R0111_R0114;