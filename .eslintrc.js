module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    useJSXTextNode: true,
    project: './tsconfig.json',
    tsconfigRootDir: './',
  },
  rules: {
    '@typescript-eslint/rule-name': 'error',
    'prettier/prettier': 'error',
  },
};
