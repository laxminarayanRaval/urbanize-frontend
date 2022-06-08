export const makeSlug = (strr) => strr?.replaceAll(" ", "_");
export const revertSlug = (strr) => strr?.replaceAll("_", " ");
export const titleCase = (strr) =>
  strr
    ?.split(" ")
    ?.map((ele) => ele[0].toUpperCase() + ele.slice(1))
    ?.join(" ");
// export const shortText = (strr, len) => 