class TestPlugin {
    apply(compiler) {
        compiler.hooks.emit.tapAsync('TestPlugin', (compilation, callback) => {
            console.log('this is a webpcak plugin!');

            // using the plugin api provided by webpack
            compilation.addModule();


            callback();
        });
    }
}

module.exports = TestPlugin;