import Pointer from "./class/Pointer";
import Entry from "./parsers/Entry";
import Function from "./parsers/Function";
import isKeyword from "./utils/isKeyword";

export default function Lexer(source: string) {
  const pointer = new Pointer(source.length);

  //const numberRegex = /[0-9]/g;

  // Creating tokenizing loop
  for (
    pointer.position.index = 0;
    pointer.position.index < pointer.contextLength;
    pointer.position.index += 1
  ) {
    pointer.token = source[pointer.position.index];

    if (pointer.current) {
      pointer.current.handleToken();
      if (pointer.current?.isStopped) {
        if (pointer.current instanceof Function) {
          pointer.currentStack = pointer.current;
        }
        pointer.current = undefined;
        pointer.attributes.isParsingKeyword = true;
        pointer.currentKeyword = "";
      }
      continue;
    }

    switch (pointer.token) {
      case " ":
        console.log(pointer.currentKeyword);
        if (pointer.attributes.isParsingKeyword && pointer.currentKeyword) {
          pointer.attributes.isParsingKeyword = false;

          switch (pointer.currentKeyword) {
            case "entry":
              let entry = new Entry(pointer);
              if (pointer.currentStack)
                pointer.currentStack.callStack?.push(entry);
              else pointer.callStack.push(entry);
              pointer.current = entry;
              break;

            case "func":
              let func = new Function(pointer);
              pointer.callStack.push(func);
              pointer.current = func;

            default:
              break;
          }
        }
        break;

      default:
        if (isKeyword(pointer.token)) {
          if (pointer.attributes.isParsingKeyword) {
            pointer.currentKeyword += pointer.token;
          }
        }

        console.log(pointer);
        break;
    }
  }

  console.log(pointer.callStack);
}
