import Pointer from "../../class/Pointer";
import Position from "../../types/Position";
import isKeyword from "../../utils/isKeyword";

// true veya false olarak iki nitelendiricimiz var bunlar maksimum 5 karakter (true 4 karakter false 5 karakter)
// parserı tehlikeye atmamak için boolean type parserı 5 karakter olarak sınırlandırıcam
// ve ayrıca bu sefer token kontrolu yerine keyword kontrolü yapıcaz

export default class Boolean {
  startPosition: Position;
  pointer: Pointer;

  isParsingValue = true;
  isStopped = false;

  value = "";
  result: boolean | undefined;

  constructor(pointer: Pointer) {
    this.pointer = pointer;
    this.startPosition = {
      ...pointer.position,
    };
  }

  handleToken() {
    // çok anlamlı bir kod oldu evet
    if (this.value.length > 5) {
      this.isParsingValue = false;
      this.isStopped = true;
    }
    if (this.value == "true") {
      this.result = true;
      this.isParsingValue = false;
      this.isStopped = true;
    }
    if (this.value == "false") {
      this.result = false;
      this.isParsingValue = false;
      this.isStopped = true;
    }

    switch (this.pointer.token) {
      case " ":
        // stop
        this.isParsingValue = false;
        this.isStopped = true;
        break;

      case ";":
        this.isParsingValue = false;
        this.isStopped = true;
        break;

      default:
        if (isKeyword(this.pointer.token)) {
          if (this.isParsingValue) {
            this.value += this.pointer.token;
          }
        }

        break;
    }
  }
}
