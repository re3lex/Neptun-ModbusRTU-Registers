const dotenv = require('dotenv');
const result = dotenv.config()

if (result.error) {
  throw result.error
}

const NeptunClient = require('./src/client/NeptunClient');
const R0001_R0002 = require("./src/registers/R0001_R0002");

const R0007_R0056 = require("./src/registers/R0007_R0056");
const R0057_R0106 = require("./src/registers/R0057_R0106");



const client = new NeptunClient({
  ip: process.env.NEPTUN_IP,
  id: process.env.NEPTUN_ID,
})


const fn = async () => {
  let reg = await client.read(R0007_R0056.getRegClass(7));
  console.log('reg', reg);
  
  reg = await client.read(R0057_R0106.getRegClass(57));
  console.log('reg', reg);
  
  
  //const regs = await client.readAll();
  //console.log(regs.length);
}


fn();
