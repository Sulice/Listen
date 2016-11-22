import rollup      from 'rollup'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs    from 'rollup-plugin-commonjs';
import uglify      from 'rollup-plugin-uglify'

export default {
    entry: 'app/main.js',
    dest: 'dist/build.js', // output a single application bundle
    sourceMap: true,
    format: 'iife',
    plugins: [
        nodeResolve({jsnext: true, module: true}),
            commonjs({
                include: ['node_modules/rxjs/**', "node_modules/ng2-bootstrap/**"],
            }),
        uglify({keep_fnames:true})
    ]
}
