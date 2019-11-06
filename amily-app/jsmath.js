/**
 * 加减乘除
 * 解决 0.1 + 0.2 不等于0.3的bug
 */

function add(n1,n2){
  var r1 = 0 , r2 = 0 , m;
  n1 = "" + n1 ,
  n2 = "" + n2;

  if (~n1.indexOf(".")){
    r1 = n1.split(".")[1].length;
  }
  if (~n2.indexOf(".")){
    r2 = n2.split(".")[1].length;
  }
  if (r1 > r2){
    n1 = n1.replace(".","") * 1;
    n2 = n2.replace(".","") * 1 * Math.pow(10,(r1 - r2));
  } else {
    n1 = n1.replace(".","") * 1 * Math.pow(10,(r2 - r1));
    n2 = n2.replace(".","") * 1 ;
  }
  m = Math.pow(10,Math.max(r1,r2));

  return (n2 + n1) / m ;

}
//相乘
function mul(n1,n2) {
  var r1 = 0 , r2 = 0;
  n1 = "" + n1 ,
  n2 = "" + n2;

  if (~n1.indexOf(".")){
    r1 = n1.split(".")[1].length;
  }
  if (~n2.indexOf(".")){
    r2 = n2.split(".")[1].length;
  }

  n1 = n1.replace(".","") * 1;
  n2 = n2.replace(".","") * 1 ;

  return (n1 * n2) / Math.pow(10,r1+ r2);

}
//相除
function div(n1,n2) {
  var r1 = 0 , r2 = 0 , m;
  n1 = "" + n1 ,
  n2 = "" + n2;

  if (~n1.indexOf(".")){
    r1 = n1.split(".")[1].length;
  }
  if (~n2.indexOf(".")){
    r2 = n2.split(".")[1].length;
  }
  n1 = n1.replace(".","") * 1;
  n2 = n2.replace(".","") * 1 ;
  return (n1 / n2) * Math.pow(10,r2-r1);

}

module.exports.add = add;
module.exports.mul = mul;
module.exports.div = div;
//相减
module.exports.sub = function(n1,n2){
  return add(n1,-n2);
}

console.log(mul(-0.17842, 100))