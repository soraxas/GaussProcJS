var nj = require('numjs');

function build_K(obs_pts, kernel = k.squ_exp) {
  var shape = obs_pts.shape.concat(obs_pts.shape);
  var K = nj.zeros(shape);
  for (var i = 0; i < K.shape[0]; ++i) {
    for (var j = i; j < K.shape[1]; ++j) {
      // console.log(K.set(i, j, covariance(obs_pts.get(i), obs_pts.get(j))));
      var n = kernel(obs_pts.get(i), obs_pts.get(j));
      // the top right block
      K.set(i, j, n);
      // the bottom left block
      K.set(j, i, n);
    }
  }
  // console.log(K);
  return K
}

/**
 * Build covariance matrix for the inferencing points
 * @param  {array} obs_pts observed points (with known value) of the GP
 * @param  {array} inf_pts inference points (ones that we want to infer values)
 * @return {[array,array]} K_1 and K_2 matrix respectively
 */
function build_K_inference(obs_pts, inf_pts, kernel = k.squ_exp) {
  var K_1 = nj.zeros(inf_pts.shape.concat(obs_pts.shape));
  var K_2 = nj.zeros(inf_pts.shape.concat(inf_pts.shape));
  // go through each inferencing point and build K_1 matrix
  for (var i = 0; i < inf_pts.shape[0]; ++i) {
    for (var j = 0; j < obs_pts.shape[0]; ++j) {
      var n = kernel(obs_pts.get(j), inf_pts.get(i));
      K_1.set(i, j, n);
    }
  }
  // go through each inferencing point and build K_2 matrix
  for (var i = 0; i < inf_pts.shape[0]; ++i) {
    for (var j = i; j < inf_pts.shape[0]; ++j) {
      var n = kernel(inf_pts.get(i), inf_pts.get(j));
      // the top right block
      K_2.set(i, j, n);
      // the bottom left block
      K_2.set(j, i, n);
    }
  }
  return [K_1, K_2]
}

module.exports = {
  build_K: build_K,
  build_K_inference: build_K_inference
}
