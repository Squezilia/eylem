import Pointer from "../class/Pointer";
import Position from "../types/Position";
import isKeyword from "../utils/isKeyword";
import Entry from "./Entry";

export default class Function {
  startPosition: Position;
  pointer: Pointer;

  isParsingKey = true;
  isParsingParameters = false;
  isStopped = false;

  key = "";
  parameters: string[] = [];

  callStack: Array<Entry | Function> | undefined;

  parameterIndex = 0;

  constructor(pointer: Pointer) {
    this.pointer = pointer;
    this.startPosition = {
      ...pointer.position,
    };
  }

  handleToken() {
    switch (this.pointer.token) {
      case "(":
        this.isParsingKey = false;
        this.isParsingParameters = true;
        break;

      case ",":
        if (this.isParsingParameters) this.parameterIndex++;
        break;

      case ")":
        this.isParsingParameters = false;
        break;

      case "{":
        this.callStack = [];
        this.isStopped = true;

      default:
        if (isKeyword(this.pointer.token)) {
          if (this.isParsingKey) {
            this.key += this.pointer.token;
          }
          if (this.isParsingParameters) {
            let param = this.parameters[this.parameterIndex];
            if (!param) this.parameters.push("");
            this.parameters[this.parameterIndex] += this.pointer.token;
          }
        }
        break;
    }
  }
}
