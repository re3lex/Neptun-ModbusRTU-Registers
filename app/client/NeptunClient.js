
const ModbusRTU = require("modbus-serial");
const registers = require("../registers/index");
const BaseR0057_R0106 = require("../registers/BaseR0057_R0106");
const BaseR0007_R0056 = require("../registers/BaseR0007_R0056");

const STATES = {
  INIT: "State init",
  IDLE: "State idle",
  NEXT: "State next",
  GOOD_READ: "State good (read)",
  FAIL_READ: "State fail (read)",
  GOOD_CONNECT: "State good (port)",
  FAIL_CONNECT: "State fail (port)",
};

const regClsMap =
{
  0: registers.R0000,
  1: registers.R0001,
  2: registers.R0002,
  3: registers.R0003,
  4: registers.R0004,
  5: registers.R0005,
  6: registers.R0006,

  107: registers.R0107_R0108,
  109: registers.R0109_R0110,
  111: registers.R0111_R0112,
  113: registers.R0113_R0114,
  115: registers.R0115_R0116,
  117: registers.R0117_R0118,
  119: registers.R0119_R0120,
  121: registers.R0121_R0122,

  123: registers.R0123,
  124: registers.R0124,
  125: registers.R0125,
  126: registers.R0126,
  127: registers.R0127,
  128: registers.R0128,
  129: registers.R0129,
  130: registers.R0130,
}

const getGeneratedCls = (reg) => {
  if (reg >= 7 && reg <= 56) {
    return BaseR0007_R0056.getRegClass(reg);
  }
  else if (reg >= 57 && reg <= 106) {
    return BaseR0057_R0106.getRegClass(reg);
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
      let regCls = regClsMap[reg];
      if (!regCls) {
        regCls = getGeneratedCls(reg);
      }
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