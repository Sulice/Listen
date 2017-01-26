// used to specify the path of the root directory
// as seen in : https://angular.io/docs/ts/latest/guide/webpack.html

var path = require('path');
var _root = path.resolve(__dirname, '..');
function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [_root].concat(args));
}
exports.root = root;
