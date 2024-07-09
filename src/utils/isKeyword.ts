// TODO: We need optimized versions of this functions
export default function isKeyword(sector: string) {
  let charmap = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];
  let result = true;
  sector
    .toLowerCase()
    .split("")
    .forEach((char) => {
      if (!charmap.includes(char)) result = false;
    });
  return result;
}
