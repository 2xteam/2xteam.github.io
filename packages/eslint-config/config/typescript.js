const airbnbBaseStyleRules =
  require('eslint-config-airbnb-base/rules/style').rules;

const { jsExtensions, tsExtensions } = require('./extensions');

const allExtensions = [...jsExtensions, ...tsExtensions];

// only typescirpt
module.exports = {
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': tsExtensions,
        },
      },
    },
    {
      files: ['*.ts', '*.tsx', '*.d.ts'],
      extends: [
        'airbnb-typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript',
      ],
      parser: '@typescript-eslint/parser',
      rules: {
        /* eslint규칙들중 typescript에서 잘못 작동하는 규칙들 off */
        camelcase: 'off',
        indent: 'off',
        quotes: 'off', // 쿼터 규칙
        'no-array-constructor': 'off',
        'no-unused-vars': 'off',
        'no-dupe-class-members': 'off',
        'no-redeclare': 'off',
        'no-useless-constructor': 'off',
        'no-undef': 'off',
        'no-shadow': 'off',
        'no-use-before-define': 'off',

        /**
         * 아래 @typescript-eslint 로 위 규칙들을 대신해서 적용
         * 참고: https://github.com/typescript-eslint/typescript-eslint/issues/265
         */
        '@typescript-eslint/camelcase': airbnbBaseStyleRules.camelcase,
        '@typescript-eslint/no-array-constructor':
          airbnbBaseStyleRules['no-array-constructor'],
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            vars: 'all',
            args: 'none',
            ignoreRestSiblings: true,
            caughtErrors: 'all',
          },
        ],
        '@typescript-eslint/no-dupe-class-members': 'warn',
        '@typescript-eslint/no-redeclare': 'warn',
        '@typescript-eslint/no-useless-constructor': 'warn',
        '@typescript-eslint/quotes': 'off',

        /* 아래 @typescript-eslint 에 정의된 eslint에는 없는 typescript만의 규칙들 */
        '@typescript-eslint/consistent-generic-constructors': 'off',
        '@typescript-eslint/adjacent-overload-signatures': 'off',
        '@typescript-eslint/class-name-casing': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/member-delimiter-style': 'off',
        '@typescript-eslint/no-angle-bracket-type-assertion': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-misused-new': 'off',
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-object-literal-type-assertion': 'off',
        '@typescript-eslint/no-parameter-properties': 'off',
        '@typescript-eslint/no-triple-slash-reference': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/prefer-interface': 'off',
        '@typescript-eslint/prefer-namespace-keyword': 'off',
        '@typescript-eslint/type-annotation-spacing': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-throw-literal': 'warn',
        '@typescript-eslint/prefer-nullish-coalescing': 'warn',
        '@typescript-eslint/array-type': ['warn', { default: 'array' }],
        '@typescript-eslint/prefer-optional-chain': 'warn', // && 대신 ?. 선택적 체인 표현식은 undefined 객체가 null 인지 여부를 제공 하는 규칙
        // 코드베이스에서 유형 어설션 스타일의 사용을 표준화하는 규칙
        '@typescript-eslint/consistent-type-assertions': [
          'warn',
          { assertionStyle: 'as', objectLiteralTypeAssertions: 'allow' },
        ],
        '@typescript-eslint/no-extra-non-null-assertion': 'warn', // 잘못된 ! ? 연산자를 사용할때 경고 규칙
        '@typescript-eslint/no-for-in-array': 'warn', // for-in 루프를 사용 하지 못하도록 하는 규칙
        // 잘못된 원시타입을 일정한 타입으로 fix 해주는 규칙
        '@typescript-eslint/ban-types': [
          'error',
          {
            types: {
              Number: {
                message: 'Use `number` instead.',
                fixWith: 'number',
              },
              Boolean: {
                message: 'Use `boolean` instead.',
                fixWith: 'boolean',
              },
              Symbol: {
                message: 'Use `symbol` instead.',
                fixWith: 'symbol',
              },
              Object: {
                message: 'Use `object` instead.',
                fixWith: 'object',
              },
              String: {
                message: 'Use `string` instead.',
                fixWith: 'string',
              },
              '{}': {
                message: 'Use `object` instead.',
                fixWith: 'object',
              },
            },
            extendDefaults: false,
          },
        ],

        /* @typescript-eslint/indent 와 prettier 간 충돌이 있어서 disable */
        '@typescript-eslint/indent': 'off',

        /* React Typescript 의 경우 prop-types는 설정하지 않아도 됨. */
        'react/prop-types': 'off',
      },
      settings: {
        'import/extensions': allExtensions,
        'import/parsers': {
          '@typescript-eslint/parser': tsExtensions,
        },
        'import/resolver': {
          node: { extensions: allExtensions },
        },
      },
    },
  ],
};
