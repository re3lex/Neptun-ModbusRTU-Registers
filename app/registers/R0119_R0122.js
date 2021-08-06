const BaseR0107_R0122 = require('./BaseR0107_R0122');

/** Показания счетчиков модуля в слоте 4 */
class R0119_R0122 extends BaseR0107_R0122 {
  static startReg = 119;

  static getInstance(){
    return new R0119_R0122();
  }
  
}

module.exports = R0119_R0122;