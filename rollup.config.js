import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';

export default [
  {
    input: 'src/blockcerts-verifier/index.js',
    output: [
      {
        file: 'dist/main.js',
        format: 'iife',
        name: 'BlockcertsVerifier'
      }
    ],
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      resolve({
        browser: true,
        preferBuiltins: true
      })// ,
      // terser()
    ]
  }
];
