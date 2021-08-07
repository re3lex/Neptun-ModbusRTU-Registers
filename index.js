const dotenv = require('dotenv');
const result = dotenv.config()

if (result.error) {
  throw result.error
}

const NeptunClient = require('./app/client/NeptunClient');
const { R0000, R0001, R0002, R0004, R0003, R0005, R0115_R0116, R0127, R0128 } = require("./app/registers/index");

const client = new NeptunClient({
  ip: process.env.NEPTUN_IP,
  id: process.env.NEPTUN_ID,
})

const fn = async () => {
  let reg = await client.read(R0115_R0116); 
  console.log('reg', reg);

  reg = await client.read(R0127); 
  console.log('reg', reg);

  reg = await client.read(R0128); 
  console.log('reg', reg);
}


fn();