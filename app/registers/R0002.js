const BaseR0001_R0002 = require('./BaseR0001_R0002');

/** Конфигурация входа проводной линии датчиков 3 и 4 */
class R0002 extends BaseR0001_R0002 {
  static startReg = 2;

  static getInstance(){
    return new R0002();
  }
}

module.exports = R0002;