class BaseRegister {
  static regLength = 1;

  static toBin(data) {
    return (data >>> 0).toString(2)
  }

  static getBits(buffer, byteOffset, startBitOffset, length, raw) {
    let bin = '';
    for (let i = length -1 ; i >= 0 ; i--) {
      bin += buffer.readBit(startBitOffset + i, byteOffset) ? '1' : '0';
    }
    return raw ? bin : parseInt(bin, 2);
  }
}

module.exports = BaseRegister;