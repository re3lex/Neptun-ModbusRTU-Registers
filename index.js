const dotenv = require('dotenv');
const result = dotenv.config()

if (result.error) {
  throw result.error
}

const NeptunClient = require('./app/client/NeptunClient');
const R0001_R0002 = require("./app/registers/R0001_R0002");

const R0123_R0130 = require("./app/registers/R0123_R0130");


const client = new NeptunClient({
  ip: process.env.NEPTUN_IP,
  id: process.env.NEPTUN_ID,
})


const fn = async () => {
  let reg = await client.read(R0001_R0002.getRegClass(1));
  console.log('reg', reg);
  
  reg = await client.read(R0001_R0002.getRegClass(2));
  console.log('reg', reg);
  
  
  const regs = await client.readAll();
  console.log(regs.length);
}


fn();
