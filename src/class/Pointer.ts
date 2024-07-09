import Entry from "../parsers/Entry";
import Function from "../parsers/Function";
import PointerAttributes from "../types/PointerAttributes";
import Position from "../types/Position";

export default class Pointer {
  token: string = "";
  position: Position = {
    col: 1,
    row: 1,
    index: 0,
  };
  contextLength: number;
  callStack: Array<Entry | Function> = [];
  cache = [];

  attributes = CreateOptimizedDefaults();

  current: Entry | Function | undefined;
  currentStack: Function | undefined;

  currentKeyword: string = "";

  constructor(context_length: number) {
    this.contextLength = context_length;
  }
}

export function CreateOptimizedDefaults(): PointerAttributes {
  return {
    isParsingCodeBlock: false,
    isParsingKeyword: true,

    isParsingEntryKey: false,
    isParsingEntryValue: false,
  };
}
