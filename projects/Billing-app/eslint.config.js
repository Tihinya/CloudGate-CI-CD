export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    // env: {
    //   node: false   // Add this to recognize Node.js globals
    // },
    // rules: {
    //   'no-unused-vars': 'warn',
    //   'no-console': 'off',
    //   'semi': ['error', 'always'],
    //   'quotes': ['error', 'single']
    // },
    // globals: {
    //   process: 'readonly',  // Alternatively, specify globals explicitly
    //   Buffer: 'readonly'
    // }
  }
];
