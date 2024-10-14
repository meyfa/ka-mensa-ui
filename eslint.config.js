import eslintConfig from '@meyfa/eslint-config'
import eslintConfigJsdoc from '@meyfa/eslint-config/jsdoc'
import pluginVue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import typescriptParser from '@typescript-eslint/parser'

export default [
  ...eslintConfig,
  eslintConfigJsdoc,
  ...pluginVue.configs['flat/recommended'],
  {
    ignores: ['dist', '.idea', '.vscode']
  },
  {
    rules: {
      'vue/html-indent': ['error', 2, { attribute: 2, baseIndent: 1, closeBracket: 0, alignAttributesVertically: false }],
      'vue/max-attributes-per-line': 0,
      'vue/singleline-html-element-content-newline': 0,
      'vue/html-closing-bracket-newline': 0,
      'vue/component-name-in-template-casing': [2, 'PascalCase']
    }
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: typescriptParser,
        extraFileExtensions: ['.vue'],
        project: './tsconfig.lint.json'
      }
    }
  }
]
