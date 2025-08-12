import dbText from "./dbText.json";
import getCookie from "../Utils/getCookie";

export default function T(text: string) {
  console.log(dbText, "fix fb");
  let language: string | undefined;
  if (getCookie("language")) {
    language = getCookie("language");
  } else {
    language = "en";
  }
  return eval("dbText." + language)[text];
}
