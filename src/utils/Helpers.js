export const makeSlug = (strr) => strr?.replaceAll(" ", "_");
export const revertSlug = (strr) => strr?.replaceAll("_", " ");
export const toTitleCase = (strr) =>
  strr
    ?.split(" ")
    ?.map((ele) => ele[0].toUpperCase() + ele.slice(1))
    ?.join(" ");
// export const shortText = (strr, len) =>

export const strArrToStr = (strr) => JSON.parse(strr.replaceAll("'", '"'));

export const citiesNames = [
  "Ahmedabad",
  "Anand",
  "Gandhinagar",
  "Panchmahal",
  "Porbandar",
  "Rajkot",
  "Surat",
  "Vadodara",
  "Bharuch",
  "Navsari",
  "Valsad",
];
