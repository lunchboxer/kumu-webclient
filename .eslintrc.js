module.exports = {
  extends: ['standard', 'plugin:unicorn/recommended'],
  plugins: ['svelte3'],
  rules: {
    "unicorn/filename-case": 0,
    "no-labels": 0,
    "import/first": 0
  },
  env: {
    browser: true
  }
}
