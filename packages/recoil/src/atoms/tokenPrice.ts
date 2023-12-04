import { atom } from "recoil";
export const textState = atom({
  key: "textState", // unique ID (with respect to other atoms/selectors)
  default: 40525, // default value (aka initial value)
});
