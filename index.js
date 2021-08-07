const dotenv = require('dotenv');
const result = dotenv.config()

if (result.error) {
  throw result.error
}

const NeptunClient = require('./app/client/NeptunClient');
const { R0000, R0001, R0002, R0006, R0003, R0005, R0115_R0116, R0127, R0128 } = require("./app/registers/index");
const BaseR0123_R0130 = require("./app/registers/BaseR0123_R0130");
const BaseR0007_R0056 = require("./app/registers/BaseR0007_R0056");




const client = new NeptunClient({
  ip: process.env.NEPTUN_IP,
  id: process.env.NEPTUN_ID,
})



const fn = async () => {
  let reg = await client.read(R0000); 
  console.log('reg', reg);
   reg = await client.read(R0001); 
  console.log('reg', reg);


  const regs = await client.readAll();
  console.log(regs.length);
}


fn();
