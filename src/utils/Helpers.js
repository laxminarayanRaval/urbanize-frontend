export const makeSlug = (strr) => strr?.replaceAll(" ", "_")?.replaceAll("/", ":");
export const revertSlug = (strr) => strr?.replaceAll(":", "/")?.replaceAll("_", " ");
export const toTitleCase = (strr) =>
  strr
    ?.split(" ")
    ?.map((ele) => ele[0].toUpperCase() + ele.slice(1))
    ?.join(" ");
// export const shortText = (strr, len) =>

export const strArrToStr = (strr) => JSON.parse(strr?.replaceAll("'", '"'));

export const makeAvtarText = (strr) =>
  strr
    ?.split(" ")
    ?.map((ele) => ele?.split("")[0])
    ?.join("");

export const citiesNames = [
  { id: "cty1", name: "Mumbai" },
  { id: "cty2", name: "New Delhi" },
  { id: "cty3", name: "Kolkata" },
  { id: "cty4", name: "Bengaluru" },
  { id: "cty5", name: "Chennai" },
  { id: "cty6", name: "Hyderabad" },
  { id: "cty7", name: "Pune" },
  { id: "cty8", name: "Ahmedabad" },
  { id: "cty9", name: "Surat" },
  { id: "cty10", name: "Visakhapatnam" },
];
