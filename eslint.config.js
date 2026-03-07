import eslintConfig from '@meyfa/eslint-config'
import eslintConfigJsdoc from '@meyfa/eslint-config/jsdoc'
import pluginVue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import typescriptParser from '@typescript-eslint/parser'

const browserGlobals = {
  window: 'readonly',
  document: 'readonly',
  navigator: 'readonly',
  location: 'readonly',
  localStorage: 'readonly',
  sessionStorage: 'readonly',
  fetch: 'readonly'
}

export default [
  ...eslintConfig,
  eslintConfigJsdoc,
  ...pluginVue.configs['flat/recommended'],
  {
    ignores: ['dist', '.idea', '.vscode']
  },
  {
    files: ['src/**/*.{js,ts,vue}'],
    languageOptions: {
      globals: browserGlobals
    }
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
      globals: browserGlobals,
      parserOptions: {
        parser: typescriptParser,
        extraFileExtensions: ['.vue'],
        project: './tsconfig.lint.json'
      }
    }
  }
]
