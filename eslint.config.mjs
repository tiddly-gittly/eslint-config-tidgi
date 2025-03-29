import antfu from '@antfu/eslint-config';

export default antfu(
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['*.js'],
          defaultProject: 'tsconfig.eslint.json',
        },
      },
    },
  },
  {
    // Without `files`, they are general rules for all files
    rules: {
      'style/semi': ['warn', 'always'],
    },
  },
);
