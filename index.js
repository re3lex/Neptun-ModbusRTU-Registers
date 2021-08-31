const dotenv = require('dotenv');
const result = dotenv.config()

if (result.error) {
  throw result.error
}

const NeptunClient = require('./src/client/NeptunClient');
const R0001_R0002 = require("./src/registers/R0001_R0002");

const R0007_R0056 = require("./src/registers/R0007_R0056");
const R0057_R0106 = require("./src/registers/R0057_R0106");
const R0107_R0122 = require("./src/registers/R0107_R0122");
const R0123_R0130 = require("./src/registers/R0123_R0130");



const client = new NeptunClient({
  ip: process.env.NEPTUN_IP,
  id: process.env.NEPTUN_ID,
})


const fn = async () => {
  const promise1 = client.read(R0107_R0122.getRegClass(115))
    .then(reg => {
      console.log('reg', reg.toJSON());
    });

  const promise2 = client.read(R0107_R0122.getRegClass(117))
    .then(reg => {
      console.log('reg', reg.toJSON());
    });




/*   const res = await client.write(reg);
  console.log(res);

  reg = await client.read(R0123_R0130.getRegClass(123));
  console.log('reg', reg.toJSON());
 */}


fn();
