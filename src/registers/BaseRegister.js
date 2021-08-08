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

  static getBits(buffer, byteOffset, startBitOffset, length, raw) {
    let bin = '';
    for (let i = length - 1; i >= 0; i--) {
      bin += buffer.readBit(startBitOffset + i, byteOffset) ? '1' : '0';
    }
    return raw ? bin : parseInt(bin, 2);
  }

  getRegValues() {
    throw new Error("Should be implemented in sub-classes!");
  }
}

module.exports = BaseRegister;