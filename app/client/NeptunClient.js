const ModbusRTU = require("modbus-serial");
const R0000 = require("../registers/R0000");
const R0001_R0002 = require("../registers/R0001_R0002");
const R0003 = require("../registers/R0003");
const R0004 = require("../registers/R0004");
const R0005 = require("../registers/R0005");
const R0006 = require("../registers/R0006");
const R0007_R0056 = require("../registers/R0007_R0056");
const R0057_R0106 = require("../registers/R0057_R0106");
const R0107_R0122 = require("../registers/R0107_R0122");
const R0123_R0130 = require("../registers/R0123_R0130");

const STATES = {
  INIT: "State init",
  IDLE: "State idle",
  NEXT: "State next",
  GOOD_READ: "State good (read)",
  FAIL_READ: "State fail (read)",
  GOOD_CONNECT: "State good (port)",
  FAIL_CONNECT: "State fail (port)",
};


const getRegisterClass = (reg) => {
  switch (reg) {
    case 0:
      return R0000;
    case 3:
      return R0003;
    case 4:
      return R0004;
    case 5:
      return R0005;
    case 6:
      return R0006;
  }

  if (reg === 1 || reg === 2) {
    return R0001_R0002.getRegClass(reg);
  }
  else if (reg >= 7 && reg <= 56) {
    return R0007_R0056.getRegClass(reg);
  }
  else if (reg >= 57 && reg <= 106) {
    return R0057_R0106.getRegClass(reg);
  }
  else if (reg >= 107 && reg <= 122) {
    return R0107_R0122.getRegClass(reg);
  }
  else if (reg >= 123 && reg <= 130) {
    return R0123_R0130.getRegClass(reg);
  }
}

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
        return STATES.FAIL_CONNECT;
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
    const regs0_106 = await this.readRegisters(0, 107);
    const regs107_130 = await this.readRegisters(107, 24);
    this.client.close(() => { });

    return [...regs0_106, ...regs107_130];
  }

  async readRegisters(readStartReg, readLength) {
    let connectionAttemp = 0;
    do {
      connectionAttemp++;
      console.log('Connection attemp', connectionAttemp);
      this.state = await this.connectClient();
    } while (this.state != STATES.GOOD_CONNECT && connectionAttemp < this.maxConnectionAttemps);

    if (this.state != STATES.GOOD_CONNECT) {
      throw new Error("Unable to connect to Neptun Smart");
    }

    const regsClsToRead = [];
    for (let reg = readStartReg; reg < readStartReg + readLength; reg++) {
      const regCls = getRegisterClass(reg);
      
      if (!regCls) {
        throw new Error(`Unable to get register class for ${reg}`);
      }
      if (regCls.regLength > 1) {
        reg += regCls.regLength - 1
      }
      regsClsToRead.push(regCls);
    }

    const { data, buffer } = await this.client.readHoldingRegisters(readStartReg, readLength)
      .catch((e) => {
        this.state = STATES.FAIL_READ;
        this.client.close(() => { });
        throw e;
      });
    this.state = STATES.GOOD_READ;

    const result = [];
    let dataStartIdx = 0;
    for (const regCls of regsClsToRead) {
      const { regLength } = regCls;
      const offset = dataStartIdx + regLength * 2;

      const subBuffer = buffer.subarray(dataStartIdx, offset);
      const reg = regCls.parse(subBuffer);
      result.push(reg);

      dataStartIdx = offset;
    }
    return result;
  }
}

module.exports = NeptunClient;