require('dotenv').config();
var ModbusRTU = require("modbus-serial");
const R0107_R0122 = require("./src/registers/R0107_R0122");


var client = new ModbusRTU();

var mbsStatus = "Initializing...";    // holds a status of Modbus

// Modbus 'state' constants
var MBS_STATE_INIT = "State init";
var MBS_STATE_IDLE = "State idle";
var MBS_STATE_NEXT = "State next";
var MBS_STATE_GOOD_READ = "State good (read)";
var MBS_STATE_FAIL_READ = "State fail (read)";
var MBS_STATE_GOOD_CONNECT = "State good (port)";
var MBS_STATE_FAIL_CONNECT = "State fail (port)";

// Modbus TCP configuration values
var mbsId = process.env.NEPTUN_ID;
var mbsPort = 503;
var mbsHost = process.env.NEPTUN_IP;
var mbsScan = 3000;
var mbsTimeout = 5000;
var mbsState = MBS_STATE_INIT;


//==============================================================
var connectClient = function () {
  // close port (NOTE: important in order not to create multiple connections)
  client.close(() => { });

  // set requests parameters
  client.setID(mbsId);
  client.setTimeout(mbsTimeout);

  // try to connect
  client.connectTCP(mbsHost, { port: mbsPort })
    .then(function () {
      mbsState = MBS_STATE_GOOD_CONNECT;
      mbsStatus = "Connected, wait for reading...";
      console.log(mbsStatus);
    })
    .catch(function (e) {
      mbsState = MBS_STATE_FAIL_CONNECT;
      mbsStatus = e.message;
      console.log(e);
    });

};

const regCls = R0107_R0122.getRegClass(115);
let write = false;
//==============================================================
var readModbusData = function () {
  // try to read data
  client.readHoldingRegisters(regCls.startReg, regCls.regLength)
    .then(function ({ data, buffer }) {
      mbsState = MBS_STATE_GOOD_READ;
      mbsStatus = "success";
      console.log('buffer', buffer);
      console.log('data', data);

      const reg = regCls.parse(buffer);
      console.log(reg);


      if (write) {
        write = false;
        reg.meter1Value = 99999999;
        reg.meter2Value = 1234;

        const vals = reg.getRegValues();
        console.log('write', vals);
        if (1) {
          const writeArr = [];
          for (let i = 0; i < regCls.regLength; i++) {
            writeArr.push(client.writeRegister(regCls.startReg + i, vals[i]));
          }

          const runPromisesSequence = async (promises) => {
            try {
              for (const x of promises) {
                const d = await x;
                console.log("Write to discrete input", d);
                await new Promise((resolve, reject) => setTimeout(resolve, 1000));
              }
            } catch (e) {
              console.log(e.message);
              return;
            }

          }
          runPromisesSequence(writeArr);
        }
      }
    })
    .catch(function (e) {
      mbsState = MBS_STATE_FAIL_READ;
      mbsStatus = e.message;
      console.log(e);
    });
};


//==============================================================
var runModbus = function () {
  var nextAction;

  switch (mbsState) {
    case MBS_STATE_INIT:
      nextAction = connectClient;
      break;

    case MBS_STATE_NEXT:
      nextAction = readModbusData;
      break;

    case MBS_STATE_GOOD_CONNECT:
      nextAction = readModbusData;
      break;

    case MBS_STATE_FAIL_CONNECT:
      nextAction = connectClient;
      break;

    case MBS_STATE_GOOD_READ:
      nextAction = readModbusData;
      break;

    case MBS_STATE_FAIL_READ:
      if (client.isOpen) {
        mbsState = MBS_STATE_NEXT;
      }
      else {
        nextAction = connectClient;
      }
      break;

    default:
    // nothing to do, keep scanning until actionable case
  }

  console.log();
  console.log(nextAction);

  // execute "next action" function if defined
  if (nextAction !== undefined) {
    nextAction();
    mbsState = MBS_STATE_IDLE;
  }

  // set for next run
  setTimeout(runModbus, mbsScan);
};

//==============================================================
runModbus();