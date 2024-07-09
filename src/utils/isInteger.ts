// TODO: We need optimized versions of this functions
export default function isInteger(sector: string) {
  let charmap = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  let result = true;
  sector.split("").forEach((char) => {
    if (!charmap.includes(char)) result = false;
  });
  return result;
}
