import Lexer from "./Lexer";

async function Main() {
  await Lexer(`
  entry variable = nofalse;
`);
}

Main();
