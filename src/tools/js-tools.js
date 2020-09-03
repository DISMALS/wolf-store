(function () {
   Function.prototype.customeCall = function (context, ...args) {
       console.log('执行');
       if (typeof this !== 'function') {
           throw Error('this 不是函数');
       }

       var cxt = context || window;
       cxt.fn = this;
       var ret = cxt.fn(...args);
       delete cxt.fn;
       return ret;
   };

   Function.prototype.customeBind = function (context, ...args) {
       console.log('执行');
       if (typeof this !== 'function') {
           throw Error('bind 不是函数');
       }
       const cxt = context || window;
       const _this = this;
       let Fbind = function () {
           const self = this instanceof Fbind ? this : cxt;
           return _this.call(self, ...args);
       }

       let fn = function() {};
       fn.prototype = _this.prototype;
       Fbind.prototype = new fn();
       return Fbind;
   }

   /**
    * async/await 是generator函数的语法糖
    * 在async/await 内部包装了generator函数和自动执行器
    * 下面是async/await 内部的自动执行器
    */
   // 
   function spawn(genF) {
       return new Promise(function (resolve, reject) {
            var gen = genF();
            function step(nextF){
                try{
                    var next = nextF();
                } catch(err) {
                    return reject(e);
                }
                if (next.done) {
                    return resolve(nex.value);
                }
                Promise.resolve(next.value).then(function (v) {
                    step(function () { return gen.next(v); });
                }, function (err) {
                    step(function () { return gen.throw(err)});
                });
            }
            step(function () { return gen.next()})
       })
   }

})()