import dbText from "./dbText.json";
import getCookie from "../Utils/getCookie";

void dbText

export default function T(text: string) {
  return eval("dbText." + getCookie("language"))[text];
}
