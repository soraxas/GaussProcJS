let nj = require('numjs');

function build_K(obs_pts, kernel) {
    if (!kernel)
        throw_kernel_undefined();
    let shape = obs_pts.shape.concat(obs_pts.shape);
    let K_matrix = nj.zeros(shape);
    for (let i = 0; i < K_matrix.shape[0]; ++i) {
        for (let j = i; j < K_matrix.shape[1]; ++j) {
            let n = kernel(obs_pts.get(i), obs_pts.get(j));
            // the top right block
            K_matrix.set(i, j, n);
            // the bottom left block
            K_matrix.set(j, i, n);
        }
    }
    // console.log(K);
    return K_matrix
}

/**
 * Build covariance matrix for the inferencing points
 * @param  {array} obs_pts observed points (with known value) of the GP
 * @param  {array} inf_pts inference points (ones that we want to infer values)
 * @return {[array,array]} K_1 and K_2 matrix respectively
 */
function build_K_inference(obs_pts, inf_pts, kernel) {
    if (!kernel)
        throw_kernel_undefined();
    let K_1 = nj.zeros(inf_pts.shape.concat(obs_pts.shape));
    let K_2 = nj.zeros(inf_pts.shape.concat(inf_pts.shape));
    // go through each inferencing point and build K_1 matrix
    for (let i = 0; i < inf_pts.shape[0]; ++i) {
        for (let j = 0; j < obs_pts.shape[0]; ++j) {
            let n = kernel(obs_pts.get(j), inf_pts.get(i));
            K_1.set(i, j, n);
        }
    }
    // go through each inferencing point and build K_2 matrix
    for (let i = 0; i < inf_pts.shape[0]; ++i) {
        for (let j = i; j < inf_pts.shape[0]; ++j) {
            let n = kernel(inf_pts.get(i), inf_pts.get(j));
            // the top right block
            K_2.set(i, j, n);
            // the bottom left block
            K_2.set(j, i, n);
        }
    }
    return [K_1, K_2]
}

function throw_kernel_undefined() {
    throw ReferenceError("kernel is not defined");
}

module.exports = {
    build_K: build_K,
    build_K_inference: build_K_inference
}
