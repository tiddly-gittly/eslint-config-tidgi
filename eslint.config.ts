import type { Linter } from "eslint";
import eslint from '@eslint/js';
import format from 'eslint-plugin-format';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import securityPlugin from 'eslint-plugin-security';
import securityNodePlugin from 'eslint-plugin-security-node';
import typescriptSortKeys from 'eslint-plugin-typescript-sort-keys';
import unicornPlugin from 'eslint-plugin-unicorn';
import unusedImports from 'eslint-plugin-unused-imports';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const tseslintConfig = tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.strictTypeChecked,
  {
    files: ['**/*.json', '**/tiddlywiki.info', '**/*.md', 'wiki/tiddlers/**/*.json'],
    extends: [tseslint.configs.disableTypeChecked],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: {
          allowDefaultProject: ['./*.js', './*.mjs'],
        },
        tsconfigRootDir: __dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: '18.2.0',
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      'import/no-unresolved': [2, { ignore: ['\\$:/'] }],
      'unicorn/prevent-abbreviations': [
        'error',
        {
          allowList: {
            mod: true,
            Mod: true,
            props: true,
            Props: true,
            i18n: true,
            i18next: true,
            i18nMainBindings: true,
            'i18next-electron-fs-backend': true,
          },
        },
      ],
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: false,
        },
      ],
      'unicorn/prefer-dom-node-text-content': 'off',
      'unicorn/prefer-modern-dom-apis': 'off',
      'react/react-in-jsx-scope': 'off',
      'security-node/detect-unhandled-async-errors': 'off',
      'unicorn/prefer-node-protocol': 'off',
      'unicorn/prefer-module': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      'security-node/detect-insecure-randomness': 'off',
      '@typescript-eslint/method-signature-style': 'off',
      'unicorn/prefer-string-slice': 'off',
      'unicorn/no-array-reduce': 'off',
      'no-undef': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/no-await-expression-member': 'off',
      'security/detect-object-injection': 'off',
      'security/detect-non-literal-fs-filename': 'off',
      'unicorn/filename-case': [
        0,
        {
          case: 'camelCase',
          ignore: [/tsx$/],
        },
      ],
      'unicorn/consistent-function-scoping': [0],
      'no-void': [0],
      'unicorn/prefer-ternary': 'off',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': ['warn', { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/consistent-type-imports': 'off',
      'unicorn/prefer-dom-node-remove': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      'unicorn/no-useless-undefined': 'off',
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react: reactPlugin,
      unicorn: unicornPlugin,
      import: importPlugin,
      'react-hooks': reactHooksPlugin,
      security: securityPlugin,
      'security-node': securityNodePlugin,
      'unused-imports': unusedImports,
      'typescript-sort-keys': typescriptSortKeys,
    },
  },
);

export default [
  // 基础配置，适用于所有文件
  {
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    ignores: [
      'wiki/',
      'resources/',
      'settings-dev/',
      'out/',
      'logs/',
      'template/',
      '.webpack/',
      'node_modules/',
      'localization/',
      'build-resources/',
      '.vscode/',
      '.github/',
    ],
  },

  // TypeScript/JavaScript 配置
  ...tseslintConfig,

  // JSON 文件配置
  {
    files: ['**/*.json', '**/tiddlywiki.info'],
    ignores: ['package-lock.json', 'wiki/tiddlers/**/*.json'],
    plugins: { format },
    languageOptions: {
      parser: format.parserPlain,
    },
    rules: {
      'format/dprint': ['error', {
        language: 'json',
        languageOptions: { lineWidth: 180, indentWidth: 2 },
      }],
    },
  },

  // Markdown 文件配置
  {
    files: ['**/*.md'],
    plugins: { format },
    languageOptions: {
      parser: format.parserPlain,
    },
    rules: {
      'format/dprint': ['error', {
        language: 'markdown',
        languageOptions: { lineWidth: 180, indentWidth: 2 },
      }],
    },
  },

  // DPrint TypeScript/JavaScript 格式化配置
  {
    files: ['**/*.{mjs,js,jsx,ts,tsx}'],
    ignores: ['wiki/tiddlers/**/*.js'],
    plugins: { format },
    rules: {
      'format/dprint': ['error', {
        language: 'typescript',
        languageOptions: { lineWidth: 180, indentWidth: 2, quoteProps: 'asNeeded', quoteStyle: 'preferSingle', 'binaryExpression.operatorPosition': 'sameLine' },
      }],
    },
  },
] as Linter.Config[];
