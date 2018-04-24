'use strict';


class Kernels {

  constructor(paras) {
    Kernels.prototype.include_sigma_n = true
    if (paras) {
      if (paras['sigma_f'])
        Kernels.prototype.sigma_f = paras['sigma_f'];
      if (paras['sigma_n'])
        Kernels.prototype.sigma_n = paras['sigma_n'];
      if (paras['length'])
        this.length = paras['length'];
        Kernels.prototype.length = paras['length'];
    }
  }

  set_parameters(paras) {
    // this.paras = paras;
    this.sigma_f = paras['sigma_f'];
    this.sigma_n = paras['sigma_n'];
    this.length = paras['length'];
  }

  get sig() {
    return this.sigma_f;
  }

  squ_exp(a, b, sigma_f, sigma_n, length) {
    var self = Kernels.prototype;
    var diff = a - b;
    var covariance = self.sigma_f * self.sigma_f * Math.exp(-(diff * diff) / (2 * self.length));
    // Incorproate Kronecker delta function
    if (a != b || !self.include_sigma_n)
      return covariance;
    else
      return covariance + self.sigma_n * self.sigma_n;
  }
}

var a = new Kernels();
console.log(a);
console.log(a.squ_exp(2, 4));


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
