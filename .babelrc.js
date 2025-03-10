module.exports = {
  presets: [
    process.env['ES6'] ? null : '@babel/env',
    '@babel/react',
    '@babel/flow',
  ].filter(Boolean),
  plugins: [['babel-plugin-syntax-hermes-parser', { flow: 'detect' }]],
}
