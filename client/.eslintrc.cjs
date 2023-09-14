module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    "semi": ["error", "always"],
    "comma-dangle": ["error", {
      "arrays": "never",
      "objects": "never",
      "imports": "never",
      "exports": "never",
      "functions": "never"
    }],
    "@typescript-eslint/comma-dangle": ["error", {
      "arrays": "never",
      "objects": "never",
      "imports": "never",
      "exports": "never",
      "functions": "never"
    }],
    "@typescript-eslint/semi": ["error", "always"],
    "@typescript-eslint/strict-boolean-expressions": 0,
    "@typescript-eslint/prefer-ts-expect-error": 0,
    "@typescript-eslint/ban-ts-comment": 0,
    "@typescript-eslint/no-confusing-void-expression": 0,
    "@typescript-eslint/no-floating-promises": 0,
    "@typescript-eslint/no-unused-vars": 0
  },
}
