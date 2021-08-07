
const ModbusRTU = require("modbus-serial");
const registers = require("../registers/index");

const STATES = {
  INIT: "State init",
  IDLE: "State idle",
  NEXT: "State next",
  GOOD_READ: "State good (read)",
  FAIL_READ: "State fail (read)",
  GOOD_CONNECT: "State good (port)",
  FAIL_CONNECT: "State fail (port)",
};

class NeptunClient {

  constructor({ id, ip }) {
    this.id = id;
    this.ip = ip;
    this.port = 503;

    this.timeout = 5000;
    this.maxConnectionAttemps = 5;

    this.state = STATES.INIT;
    this.client = new ModbusRTU();
  }

  connectClient() {
    // close port (NOTE: important in order not to create multiple connections)
    this.client.close(() => { });

    // set requests parameters
    this.client.setID(this.id);
    this.client.setTimeout(this.timeout);

    // try to connect
    return this.client.connectTCP(this.ip, { port: this.port })
      .then(() => {
        const mbsStatus = "Connected, wait for reading...";
        console.log(mbsStatus);
        return STATES.GOOD_CONNECT;
      })
      .catch((e) => {
        console.error(e);
        return STATES.FAIL_CONNECT;;
      });
  }

  async read(regCls) {
    let connectionAttemp = 0;
    do {
      connectionAttemp++;
      console.log('Connection attemp', connectionAttemp);
      this.state = await this.connectClient();
    } while (this.state != STATES.GOOD_CONNECT && connectionAttemp < this.maxConnectionAttemps);

    if (this.state != STATES.GOOD_CONNECT) {
      throw new Error("Unable to connect to Neptun Smart");
    }

    const { data, buffer } = await this.client.readHoldingRegisters(regCls.startReg, regCls.regLength)
      .catch((e) => {
        this.state = STATES.FAIL_READ;
        this.client.close(() => { });
        throw e;
      });
    this.state = STATES.GOOD_READ;

    console.log('buffer', buffer);
    console.log('data', data);

    const reg = regCls.parse(buffer);
    this.client.close(() => { });
    return reg;
  }

  async readAll() {
    
  }
}

module.exports = NeptunClient;