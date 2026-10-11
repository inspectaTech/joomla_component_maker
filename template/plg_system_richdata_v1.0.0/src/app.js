
import test_ie from './lib/test_es2015';
import test_ic from './lib/test_common';

const test_re = require('./lib/test_es2015');
const test_rc = require('./lib/test_common');

document.addEventListener('DOMContentLoaded', function () {

  //initiate here

  try{console.log("test_es2015 = ", test_es2015);}catch(err){console.log(err)}/* this works */
  try{console.log("test_common = ", test_common);}catch(err){console.log(err)}/* this works */

	try{console.log("test_ie = ", test_ie);}catch(err){console.log(err)}/* this works */
	try{console.log("test_ic = ", test_ic);}catch(err){console.log(err)}/* this works */

  try{console.log("test_re = ", test_re);}catch(err){console.log(err)}/* this works */
  try{console.log("test_rc = ", test_rc);}catch(err){console.log(err)}/* this works */

});
