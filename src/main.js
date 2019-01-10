import * as age from "./age"
import "./index.pug"

var currentAge = "" + age
for (
  var i = 0, list = document.getElementsByClassName("age");
  i < list.length;
  i += 1
) {
  list[i].innerHTML = currentAge
}
