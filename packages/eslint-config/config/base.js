const { jsExtensions } = require('./extensions');

// only js
module.exports = {
  env: {
    browser: true,
    commonjs: true,
    jquery: true,
    es2021: true,
    node: true,
    jest: true,
  },
  globals: {
    TMON: true,
  },
  plugins: ['import'],
  extends: ['airbnb-base', 'plugin:import/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
    },
  },
  ignorePatterns: ['node_modules/', 'public/', '@types/'],
  rules: {
    'no-restricted-globals': 'off',
    'import/export': 'off',

    'no-unused-vars': 'off', // 사용하지 않는 변수에 대한 린트 wran
    'no-useless-escape': 'off', // 불필요한 이스케이프 문자 금지 규칙
    'no-plusplus': 'off', // ++ -- 를 사용하지 못하도록 하는 규칙
    'no-use-before-define': 'off', // 변수 선언 전에 사용하지 못하도록 하는 규칙 (바닐라 javascript 만 사용하는 페이지가 많아서 off)
    'no-alert': 'off', // alert, confirm, prompt 사용할 수 있도록 린트 off
    'linebreak-style': 'off', // OS 별로 다른 방식의 줄바꿈 설정
    'object-curly-newline': 'off', // 오브젝트 선언시 줄바꿈 린트 off
    'class-methods-use-this': 'off', // class 를 사용시에 정적 메소드 처리를 꼭 해야 하는 규칙
    'import/no-extraneous-dependencies': 'off', // 테스트 또는 개발환경을 구성하는 파일에서는 devDependency 사용을 허용
    'import/prefer-default-export': 'off', // 무조건 default export 로 내보내야 하는 규칙
    'import/default': 'off', // 기본 default 로 export 됬는데 참조된 모듈에서 찾을 수 없는 경우 에러 off
    'no-underscore-dangle': 'off', // _변수 이름 허용안하는 규칮 off
    'global-require': 'off', // import, require 은 최상단에 해야하는 규칙 off
    'import/no-dynamic-require': 'off', // import url 내부에 다이나믹한 변수를 넣어서 명시할 수 없는 규칙 off
    'import/namespace': 'off', // 없는 name space 는 사용하지 않겠다는 규칙이나 현재 eslint에서 동작을 안함으로 off

    'switch-colon-spacing': ['warn', { before: false, after: true }], // switch 문 콘론 간격 조절 규칙
    'import/first': 'warn', // import 구문이 제일 먼저 위치해야 하는 규칙
    /* import 구문  정렬 규칙 */
    'import/order': [
      'warn',
      {
        groups: [
          ['builtin', 'external'],
          'internal',
          ['parent', 'index', 'sibling'],
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
        },
      },
    ],

    'import/no-duplicates': 'error', // 확인된 import 경로가 2번 이상일때 체크하는 규칙
    'import/no-unresolved': ['error', { ignore: ['TMON'] }], // import 문이 명시되지 않은 전역 변수는 사용할 수 없는 규칙
    'no-param-reassign': ['error', { props: false }], // 매개변수 재할당 불가하도록 적용
    /** 후행콤마 설정 */
    'comma-dangle': [
      'error',
      {
        arrays: 'never',
        objects: 'never',
        imports: 'never',
        exports: 'never',
        functions: 'never',
      },
    ],
    /* 사용되지 않는 표현식 사용 하기 위한 린트 (.e.g => a && a()) */
    'no-unused-expressions': [
      'error',
      { allowShortCircuit: true, allowTernary: true },
    ],
    /* ts, tsx, js, jsx import시 확장자에 생략 위해 아래 확장자만 off */
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
        jsx: 'never',
        mjs: 'never',
        scss: 'never',
      },
    ],
  },
  settings: {
    'import/extensions': jsExtensions,
    'import/ignore': ['node_modules'],
    'import/resolver': {
      node: { extensions: jsExtensions },
    },
  },
  overrides: [
    {
      files: ['*.d.ts'],
      rules: {
        'import/order': 'off',
      },
    },
  ],
};
