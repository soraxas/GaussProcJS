'use strict';

/**
 * Helper function: Given a matrix with the top right
 * corner and diagonals filled, it will mirror the top right
 * to the bottom left (in-place)
 * @param  {2d array} matrix Square matrix to be copy
 * @return {2d array}        Resultant matrix (the original obj)
 */
function mirror_matrix(matrix) {
  for (var i = 0; i < matrix.shape[0]; ++i) {
    // go to index j that's one after the diagonal
    for (var j = i + 1; j < matrix.shape[0]; ++j) {
      // top right block of indices
      matrix.set(j, i, matrix.get(i, j));
    }
  }
  return matrix
}

/**
 * [covariance description]
 * @param  {[type]} a [description]
 * @param  {[type]} b [description]
 * @return {[type]}   [description]
 */
function covariance(a, b, k) {
  var k = function() {
    var diff = a - b;
    return sigma_f * sigma_f * Math.exp(-(diff * diff) / (2 * l));
  }

  // Incorproate Kronecker delta function
  if (a != b)
    return k(a, b);
  else
    return k(a, b) + sigma_n * sigma_n;
}
