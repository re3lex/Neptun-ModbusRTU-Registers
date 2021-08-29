class BaseRegister {
  static regLength = 1;

  static toBin(data, length) {
    let bin = (data >>> 0).toString(2)

    if (length > 0 && bin.length < length) {
      let pref = '';
      for (let i = 1; i <= length - bin.length; i++) {
        pref += '0';
      }
      bin = pref + bin;
    }
    return bin;
  }

  static getBits(buffer, byteOffset, startBitOffset, length, raw) {
    let bin = '';
    for (let i = length - 1; i >= 0; i--) {
      bin += buffer.readBit(startBitOffset + i, byteOffset) ? '1' : '0';
    }
    return raw ? bin : parseInt(bin, 2);
  }

  static fromJSON({data}) {
    const { fields } = this;

    const reg = new this();
    Object.keys(fields).forEach(f => {
      reg[f] = data[f];
    });

    return reg;
  }

  toBin(data, length) {
    return this.constructor.toBin(data, length);
  }

  toUint16Array(num) {
    const arr = new Uint16Array([
      (num & 0xffff0000) >> 16,
      (num & 0x0000ffff)
    ])
    return arr;
  }

  getRegValues() {
    throw new Error("Should be implemented in sub-classes!");
  }

  toJSON() {
    const { name, startReg, regLength, fields } = this.constructor;
    const description = this.constructor.getDescription();
    const json = { name, startReg, regLength, description, fields, data: {...this} };
    return json;
  }
}

module.exports = BaseRegister;