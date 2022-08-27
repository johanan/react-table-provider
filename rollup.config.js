import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs';
import visualizer from 'rollup-plugin-visualizer';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from '@rollup/plugin-typescript';

const extensions = ['.js', '.ts', '.tsx']
export default [
    {
        input: 'src/index.ts',
        output: [{
            name: 'react-table-context',
            file: 'dist/react-table-context.js',
            format: 'umd',
            sourcemap: true,
        }],
        external: ['react'],
        plugins: [
            peerDepsExternal(),
            resolve({
                extensions
           }),
           commonjs(),
           typescript({ tsconfig: './tsconfig.json' }),
            terser(),
            visualizer()
        ]
    }
]