import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser'
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import visualizer from 'rollup-plugin-visualizer';
import externalDeps from 'rollup-plugin-peer-deps-external'

const extensions = ['.js', '.ts', '.tsx']
export default [
    {
        input: 'src/index.ts',
        output: {
            name: 'react-table-context',
            file: 'dist/react-table-context.js',
            format: 'umd',
            sourcemap: true,
        },
        plugins: [
            resolve({
                extensions
           }),
           commonjs(),
           babel({
            exclude: 'node_modules/**',
            extensions,
            babelHelpers: 'runtime'
            }),
            externalDeps(),
            terser(),
            visualizer()
        ]
    }
]