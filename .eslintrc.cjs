/* eslint-env node */
module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  overrides: [
    {
      files: [
        '**/__tests__/*.{cy,spec}.{js,ts,jsx,tsx}',
        'cypress/e2e/**.{cy,spec}.{js,ts,jsx,tsx}'
      ],
      'extends': [
        'plugin:cypress/recommended'
      ]
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'no-console': 'warn',
    'no-debugger': 'warn',
    'semi-style': ['error', 'last'],
    'vue/html-closing-bracket-newline': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/attributes-order': 'off',
    'vue/html-indent': ['error', 'tab', {
      'attribute': 1,
      'baseIndent': 0,
      'closeBracket': 0,
      'alignAttributesVertically': true
    }],
    'vue/script-indent': ['error', 'tab', {
      'baseIndent': 0,
      'switchCase': 0
    }],
    'quotes': [2, 'single'],
    'no-tabs': 0,
    'semi': [2, 'always'],
    'template-curly-spacing': 'off',
    'indent': 'off'
  }
};
