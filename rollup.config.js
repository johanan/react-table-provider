import { terser } from 'rollup-plugin-terser'
import visualizer from 'rollup-plugin-visualizer';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from '@rollup/plugin-typescript';

export default [
    {
        input: 'src/index.ts',
        output: [{
            name: 'react-table-context',
            file: 'dist/react-table-context.js',
            format: 'es',
            sourcemap: true,
        }],
        external: ['react'],
        plugins: [
            peerDepsExternal(),
           typescript({ tsconfig: './tsconfig.json' }),
            terser(),
            visualizer()
        ]
    }
]