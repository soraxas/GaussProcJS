'use strict';

var gaussprocjs = gaussprocjs || {
  REVISION: 'ALPHA'
};

var nj = require('numjs');

var Kernels = require('./kernels');
var core = require('./core');
var _ = require('./utils');







module.exports = {
  Kernels: Kernels,
  core: core
}





//
//
//
// (function(global) {
//   "use strict";
//   var Vol = global.Vol; // convenience
//
//   // a bit experimental layer for now. I think it works but I'm not 100%
//   // the gradient check is a bit funky. I'll look into this a bit later.
//   // Local Response Normalization in window, along depths of volumes
//   var LocalResponseNormalizationLayer = function(opt) {
//     var opt = opt || {};
//
//
//     // computed
//     this.out_sx = opt.in_sx;
//     this.out_sy = opt.in_sy;
//     this.out_depth = opt.in_depth;
//     this.layer_type = 'lrn';
//
//     // checks
//     if(this.n%2 === 0) { console.log('WARNING n should be odd for LRN layer'); }
//   }
//   LocalResponseNormalizationLayer.prototype = {
//     forward: function(V, is_training) {
//       this.in_act = V;
//
//
//       this.out_act = A;
//       return this.out_act; // dummy identity function for now
//     },
//     backward: function() {
//       // evaluate gradient wrt data
//       var V = this.in_act; // we need to set dw of this
//       V.dw = global.zeros(V.w.length); // zero out gradient wrt data
//       var A = this.out_act; // computed in forward pass
//
//     },
//     getParamsAndGrads: function() { return []; },
//     toJSON: function() {
//       var json = {};
//       json.k = this.k;
//       json.n = this.n;
//       json.alpha = this.alpha; // normalize by size
//
//       return json;
//     },
//     fromJSON: function(json) {
//       this.k = json.k;
//       this.n = json.n;
//
//     }
//   }
//
// Math.pow(S,this.beta-1)*this.alpha/this.n*2*aj;
//               if(j===i) g+= SB;
//               g /= SB2;
//               g *= chain_grad;
//               V.add_grad(x,y,j,g);
//             }
//
//           }
//         }
//       }
//     },
//     getParamsAndGrads: function() { return []; },
//     toJSON: function() {
//       var json = {};
//       json.k = this.k;
//
//       return json;
//     },
//     fromJSON: function(json) {
//       this.k = json.k;
//       this.n = json.n;
//
//     }
//   }
//
//
//   global.LocalResponseNormalizationLayer = LocalResponseNormalizationLayer;
// })(convnetjs);
//
//
//
// (function(global) {
//   "use strict";
//   var Vol = global.Vol; // convenience
//
//   // Net manages a set of layers
//   // For now constraints: Simple linear order of layers, first layer input last layer a cost layer
//   var Net = function(options) {
//     this.layers = [];
//   }
//
//   Net.prototype = {
//
//     // takes a list of layer definitions and creates the network layer objects
//     makeLayers: function(defs) {
//
//       // few checks for now
//       if(defs.length<2) {console.log('ERROR! For now at least have input and softmax layers.');}
//       this.layers = [];
//       for(var i=0;i<defs.length;i++) {
//         var def = defs[i];
//         if(i>0) {
//           var prev = this.layers[i-1];
//           def.in_sx = prev.out_sx;
//           def.in_sy = prev.out_sy;
//           def.in_depth = prev.out_depth;
//         }
//
//         switch(def.type) {
//           case 'fc': this.layers.push(new global.FullyConnLayer(def)); break;
//           case 'lrn': this.layers.push(new global.LocalResponseNormalizationLayer(def)); break;
//           case 'dropout': this.layers.push(new global.DropoutLayer(def)); break;
//           case 'input': this.layers.push(new global.InputLayer(def)); break;
//           case 'softmax': this.layers.push(new global.SoftmaxLayer(def)); break;
//           case 'regression': this.layers.push(new global.RegressionLayer(def)); break;
//           case 'conv': this.layers.push(new global.ConvLayer(def)); break;
//           case 'pool': this.layers.push(new global.PoolLayer(def)); break;
//           case 'relu': this.layers.push(new global.ReluLayer(def)); break;
//           case 'sigmoid': this.layers.push(new global.SigmoidLayer(def)); break;
//           case 'tanh': this.layers.push(new global.TanhLayer(def)); break;
//           case 'maxout': this.layers.push(new global.MaxoutLayer(def)); break;
//           case 'quadtransform': this.layers.push(new global.QuadTransformLayer(def)); break;
//           case 'svm': this.layers.push(new global.SVMLayer(def)); break;
//           default: console.log('ERROR: UNRECOGNIZED LAYER TYPE!');
//         }
//       }
//     },
//
//     // forward prop the network. A trainer will pass in is_training = true
//     forward: function(V, is_training) {
//       if(typeof(is_training)==='undefined') is_training = false;
//
//       return act;
//     },
//
//     getCostLoss: function(V, y) {
//       this.forward(V, false);
//
//       return loss;
//     },
//
//     // backprop: compute gradients wrt all parameters
//     backward: function(y) {
//       var N = this.layers.length;
//
//       return loss;
//     },
//     getParamsAndGrads: function() {
//       // accumulate parameters and gradients for the entire network
//       var response = [];
//
//       return response;
//     },
//     getPrediction: function() {
//       var S = this.layers[this.layers.length-1]; // softmax layer
//
//       return maxi;
//     },
//     toJSON: function() {
//       var json = {};
//
//       return json;
//     },
//     fromJSON: function(json) {
//       this.layers = [];
//       for(var i=0;i<json.layers.length;i++) {
//         var Lj = json.layers[i]
//         var t = Lj.layer_type;
// formLayer(); }
//         if(t==='svm') { L = new global.SVMLayer(); }
//         L.fromJSON(Lj);
//         this.layers.push(L);
//       }
//     }
//   }
//
//
//   global.Net = Net;
// })(convnetjs);
