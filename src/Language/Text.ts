import dbText from "./dbText.json";
import getCookie from "../Utils/getCookie";

console.log(dbText, "it`s need because eslint think I don`t use dbText (use in string 14)");


export default function T(text: string) {
  let language: string | undefined;
  if (getCookie("language")) {
    language = getCookie("language");
  } else {
    language = "en";
  }
  return eval("dbText." + language)[text];
}
