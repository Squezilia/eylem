import Pointer from "../../class/Pointer";
import Position from "../../types/Position";

export default class String {
  startPosition: Position;
  pointer: Pointer;

  isParsingValue = true;
  isStopped = false;

  value = "";

  constructor(pointer: Pointer) {
    this.pointer = pointer;
    this.startPosition = {
      ...pointer.position,
    };
  }

  handleToken() {
    switch (this.pointer.token) {
      case '"':
        // stop
        this.isParsingValue = false;
        this.isStopped = true;
        break;

      case ";":
        this.isParsingValue = false;
        this.isStopped = true;
        break;

      default:
        this.value += this.pointer.token;
        break;
    }
  }
}
