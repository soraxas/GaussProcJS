'use strict';

/**
 * Helper function: Given a matrix with the top right
 * corner and diagonals filled, it will mirror the top right
 * to the bottom left (in-place)
 * @param  {2d array} matrix Square matrix to be copy
 * @return {2d array}        Resultant matrix (the original obj)
 */
function mirror_matrix(matrix) {
  for (let i = 0; i < matrix.shape[0]; ++i) {
    // go to index j that's one after the diagonal
    for (let j = i + 1; j < matrix.shape[0]; ++j) {
      // top right block of indices
      matrix.set(j, i, matrix.get(i, j));
    }
  }
  return matrix
}

/**
 * Return an inversed matrix from a 2d ndarray
 * @param  {2darray} M Square matrix to be inverted
 * @return {2darray}   Inverted matrix
 */
function m_inverse(M) {

  let nj = require('numjs');
  let blas1 = require('ndarray-blas-level1');

  function throw_matrix_not_invertible() {
    throw Error("The given matrix is not invertible.");
  }

  if (M.shape[0] !== M.shape[1]) {
    throw_matrix_not_invertible();
  }
  //create the identity matrix (I), and a copy (C) of the original
  let i = 0,
    ii = 0,
    j = 0,
    dim = M.shape[0],
    e = 0,
    t = 0;
  let I = nj.identity(dim);
  let C = M.clone();

  // Perform elementary row operations
  for (i = 0; i < dim; i += 1) {
    // get the element e on the diagonal
    e = C.get(i, i);

    // if we have a 0 on the diagonal (we'll need to swap with a lower row)
    if (e == 0) {
      //look through every row below the i'th row
      for (ii = i + 1; ii < dim; ii += 1) {
        //if the ii'th row has a non-0 in the i'th col
        if (C.get(ii, i) != 0) {
          let row_i, row_ii;
          //it would make the diagonal have a non-0 so swap it
          row_i = C.pick(i);
          row_ii = C.pick(ii);
          blas1.swap(row_i.selection, row_ii.selection);

          row_i = I.pick(i);
          row_ii = I.pick(ii);
          blas1.swap(row_i.selection, row_ii.selection);
          //don't bother checking other rows since we've swapped
          break;
        }
      }
      //get the new diagonal
      e = C.get(i, i);
      //if it's still 0, not invertable (error)
      if (e == 0) {
        throw_matrix_not_invertible();
      }
    }

    // Scale this row down by e (so we have a 1 on the diagonal)
    C.pick(i)
      .divide(e, false);
    I.pick(i)
      .divide(e, false);

    // Subtract this row (scaled appropriately for each row) from ALL of
    // the other rows so that there will be 0's in this column in the
    // rows above and below this one
    for (ii = 0; ii < dim; ii++) {
      // Only apply to other rows (we want a 1 on the diagonal)
      if (ii == i) {
        continue;
      }

      // We want to change this element to 0
      e = C.get(ii, i);

      // Subtract (the row above(or below) scaled by e) from (the
      // current row) but start at the i'th column and assume all the
      // stuff left of diagonal is 0 (which it should be if we made this
      // algorithm correctly)
      C.pick(ii)
        .subtract(C.pick(i)
          .multiply(e), false);
      I.pick(ii)
        .subtract(I.pick(i)
          .multiply(e), false);
    }
  }

  //we've done all operations, C should be the identity
  //matrix I should be the inverse:

  return I;
}

/**
 * [covariance description]
 * @param  {[type]} a [description]
 * @param  {[type]} b [description]
 * @return {[type]}   [description]
 */
function covariance(a, b, k) {
  let k = function() {
    let diff = a - b;
    return sigma_f * sigma_f * Math.exp(-(diff * diff) / (2 * l));
  }

  // Incorproate Kronecker delta function
  if (a != b)
    return k(a, b);
  else
    return k(a, b) + sigma_n * sigma_n;
}

module.exports = {
    mirror_matrix: mirror_matrix,
    m_inverse: m_inverse
}
