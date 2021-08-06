const BaseR0001_R0002 = require('./BaseR0001_R0002');

/** Конфигурация входа проводной линии датчиков 1 и 2 */
class R0001 extends BaseR0001_R0002 {
  static startReg = 1;

  static getInstance(){
    return new R0001();
  }
}

module.exports = R0001;