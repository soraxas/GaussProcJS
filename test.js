var nj = require('numjs');
var gp = require('./src/index');

console.log(gp);

// -1.4987884348048819, -1.6485749385749386
// -0.9999397394035547, -1.0985503685503684
// -0.7502898229304469, -0.32828931203931244
// -0.3999004797434065, 0.2209797297297298
// -0.25129057628893037, 0.5522788697788701
// -0.001842871638717547, 0.8785726351351353
// 0.1998375095743503, 0.9540540540540556

var x, y, inf_pt;

x = [-1.4987884348048819,
    -0.9999397394035547,
    -0.7502898229304469,
    -0.3999004797434065,
    -0.25129057628893037,
    -0.001842871638717547,
    0.1998375095743503]
y = [-1.6485749385749386,
    -1.0985503685503684,
    -0.32828931203931244,
    0.2209797297297298,
    0.5522788697788701,
    0.8785726351351353,
    0.9540540540540556]

inf_pt = [
  0.2,
  0.01
]

x      = nj.array(x)
y      = nj.array(y)
inf_pt = nj.array(inf_pt)

kk = new gp.Kernels({
  'sigma_n': 0.3,
  'sigma_f': 1.27,
  'length': 1,
  'include_sigma_n': true
})


// y∗|y ∼ N (K* K^−1 y , K∗∗ − K∗ K^−1 K∗^T):



// let mean =
//
//
//
function m_inverse(matrix){
  // get determinant
  let determinant = 0;



 //  //finding determinant
 //  for(i = 0; i < 3; i++)
 //      determinant = determinant + (mat[0][i] * (mat[1][(i+1)%3] * mat[2][(i+2)%3] - mat[1][(i+2)%3] * mat[2][(i+1)%3]));
 //
 //  printf("\n\ndeterminant: %f\n", determinant);
 //
 //  printf("\nInverse of matrix is: \n");
 //  for(i = 0; i < 3; i++){
 //      for(j = 0; j < 3; j++)
 //          printf("%.2f\t",((mat[(j+1)%3][(i+1)%3] * mat[(j+2)%3][(i+2)%3]) - (mat[(j+1)%3][(i+2)%3] * mat[(j+2)%3][(i+1)%3]))/ determinant);
 //
 //      printf("\n");
 //  }
 //
 // return 0;
}


var util = require('./src/utils');
console.log(util);
var matrix_invert = util.m_inverse;
console.log("IMPORT");




console.log(kk.squ_exp);
// gp.Kernels
var K = gp.core.build_K(x, kk.squ_exp)
// console.log("writing K");
// console.log(K);
// console.log("writing K");
// console.log(K);
var [K_star, K_starstar] = gp.core.build_K_inference(x, inf_pt, kk.squ_exp)

console.log(K);
console.log('HA');
console.log(K.length);
console.log(K.shape);
var K_inv = matrix_invert(K);
console.log(K_inv);
console.log(K.dot(K_inv));
console.log(K_inv.dot(K));








//
