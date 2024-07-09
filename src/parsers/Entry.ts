import Pointer from "../class/Pointer";
import Position from "../types/Position";
import isInteger from "../utils/isInteger";
import isKeyword from "../utils/isKeyword";
import Boolean from "./types/Boolean";
import Integer from "./types/Integer";
import String from "./types/String";

export default class Entry {
  startPosition: Position;
  pointer: Pointer;

  isParsingKey = true;
  isParsingValue = false;
  isStopped = false;

  key = "";
  value: undefined | Integer | String;

  constructor(pointer: Pointer) {
    this.pointer = pointer;
    this.startPosition = {
      ...pointer.position,
    };
  }

  handleToken() {
    if (this.isParsingValue && this.value) {
      this.value?.handleToken();
      if (!this.value?.isStopped) return;
    }

    switch (this.pointer.token) {
      case '"':
        // Start parsing String
        if (this.isParsingValue && typeof this.value == "undefined") {
          this.value = new String(this.pointer);
        }
        break;

      case "=":
        this.isParsingKey = false;
        this.isParsingValue = true;
        break;

      case " ":
        this.isParsingKey = false;
        break;

      case ";":
        this.isParsingValue = false;
        this.isStopped = true;
        break;

      default:
        if (isKeyword(this.pointer.token)) {
          if (this.isParsingKey) {
            this.key += this.pointer.token;
          }
          if (this.isParsingValue && typeof this.value == "undefined") {
            this.value = new Boolean(this.pointer);
            this.value.handleToken();
          }
        }

        // the value instance must be undefined when its triggered.
        // if its no undefined we will throw an error later.
        if (this.isParsingValue && !this.value) {
          if (
            isInteger(this.pointer.token) &&
            typeof this.value == "undefined"
          ) {
            this.value = new Integer(this.pointer);
          }
          this.value?.handleToken();
        }

        /* if (
          isInteger(this.pointer.token) &&
          this.isParsingValue &&
          (this.value instanceof Integer || typeof this.value == "undefined")
        ) {
          // Start parsing Integer
          if (typeof this.value == "undefined") {
            this.value = new Integer(this.pointer);
          }
          this.value.handleToken();
        }
 */
        break;
    }
  }
}
