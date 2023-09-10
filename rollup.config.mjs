// eslint-disable-next-line
import commonjs from '@rollup/plugin-commonjs'
import { babel } from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'

export default {
  external: [],
  input: 'examples/simple/index.js',
  output: {
    file: 'examples/simple/bundle.js',
    format: 'iife',
  },
  plugins: [
    babel({ babelHelpers: 'bundled' }),
    commonjs(),
    resolve({
      browser: true,
      dedupe: ['react', 'react-dom'],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
}
