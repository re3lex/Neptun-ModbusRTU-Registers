const BaseRegister = require('./BaseRegister');

/** Конфигурация реле событий */
class R0004 extends BaseRegister {
  static startReg = 4;


  /*
    Переключение по тревоге
    0 – не переключать 
    1 – первая группа  
    2 – вторая группа  
    3 – обе группы
  */
  tapSwitchOnAlert

  /*
    Переключение по закрыванию кранов 
    0 – не переключать  
    1 – первая группа  
    2 – вторая группа  
    3 – обе группы
  */
  tapSwitchOnClosing

  static parse(buffer) {
    const r = new R0004();
    r.tapSwitchOnAlert = this.getBits(buffer, 1, 0, 2);
    r.tapSwitchOnClosing = this.getBits(buffer, 1, 2, 2);

    return r;
  }
}


module.exports = R0004;