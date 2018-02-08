import { fn2  } from "./util";
import '../styles/index.less'; // CommonJS的方式引入css
import $ from "jquery";
import Vue from 'vue'
const print = (str) => {
  return str + fn2()
}
$('#main').text(print('Nice Workk!'))