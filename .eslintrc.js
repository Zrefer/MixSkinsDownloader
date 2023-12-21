module.exports = {
  extends: ['react-app', 'airbnb', 'airbnb-typescript', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'react/button-has-type': 'off',
    'react/jsx-props-no-spreading': 'off',
  },
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatuers: {
      jsx: true,
    },
  },
  ignorePatterns: ['/node_modules/', '/build/'],
};
