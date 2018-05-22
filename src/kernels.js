'use strict';


class Kernels {

  constructor(paras) {

    this.set_parameters = (paras) => {
      this.sigma_f = paras['sigma_f'];
      this.sigma_n = paras['sigma_n'];
      this.length = paras['length'];
      this.include_sigma_n = paras['include_sigma_n'];
    }

    this.squ_exp = (a, b, sigma_f, sigma_n, length) => {
      let diff = a - b;
      let covariance = this.sigma_f * this.sigma_f * Math.exp(-(diff * diff) / (2 * this.length));
      // Incorproate Kronecker delta function
      if (a != b || !this.include_sigma_n)
        return covariance;
      else
        return covariance + this.sigma_n * this.sigma_n;
    }

    this.include_sigma_n = true;
    if (paras)
      this.set_parameters(paras)
  }
}

module.exports = Kernels;
// 'use strict';
//
// var kernels;
//
// (function() {
//   "use strict";
//   var Vol = global.Vol; // convenience
//   var _kernels = function(paras) {
//     this.paras = {
//       include_sigma_n : true
//     };
//     if (paras) {
//       if (paras['sigma_f'])
//         this.paras['sigma_f'] = paras['sigma_f'];
//       if (paras['sigma_n'])
//         this.paras['sigma_n'] = paras['sigma_n'];
//       if (paras['length'])
//         this.paras['length'] = paras['length'];
//     }
//   };
//
//   _kernels.prototype = {
//     set_parameters: function(paras) {
//       // this.paras = paras;
//       this.sigma_f = paras['sigma_f'];
//       this.sigma_n = paras['sigma_n'];
//       this.length = paras['length'];
//     },
//     squ_exp: function(a, b) {
//       var diff = a - b;
//       console.log(this, '++++++++++++++++=');
//       console.log(_kernels(), '++++++++++++++++=');
//       var covariance = this.paras.sigma_f * this.paras.sigma_f * Math.exp(-(diff * diff) / (2 * this.paras.length));
//       // Incorproate Kronecker delta function
//       if (a != b || !include_sigma_n)
//         return covariance;
//       else
//         return covariance + this.paras.sigma_n * this.paras.sigma_n;
//     }
//   }
//   kernels = _kernels;
// })();
//
// module.exports = kernels;
