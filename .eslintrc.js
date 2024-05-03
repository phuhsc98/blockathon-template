module.exports = {
  root: true,
  env: {
    node: true,
  },

  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-console':
      process.env.NODE_ENV === 'production'
        ? ['warn', { allow: ['error'] }]
        : ['warn', { allow: ['error'] }],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'jsx-a11y/alt-text': 'off',
    'react-hooks/rules-of-hooks': 'warn',
    'react-hooks/exhaustive-deps': 'off',
    'javascript.autoClosingTags': 'off',
    'no-unused-vars': 'off',
    'no-param-reassign': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'warn',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript.autoClosingTags': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@next/next/no-img-element': 'off',
    'react/no-unescaped-entities': 'off',
    // curly: 'error',
  },
  extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
  plugins: ['@typescript-eslint', 'react-hooks'],
};
