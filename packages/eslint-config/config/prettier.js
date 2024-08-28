module.exports = {
  extends: ['plugin:prettier/recommended'],
  rules: {
    /* TODO: 기존 소스들이 모노레포 이전으로 error 로 설정하면 코드 수정이 많아 질 것을 감안하여 warn 으로 설정 추후, error 설정 */
    'prettier/prettier': [
      'warn',
      {
        printWidth: 80, //  줄 바꿈 할 폭 길이
        tabWidth: 2, // 탭 너비
        semi: true, // 세미콜론 사용 여부
        jsxSingleQuote: false, // JSX에 singe 쿼테이션 사용 여부
        trailingComma: 'es5', // 여러 줄을 사용할 때, 후행 콤마 사용 방식
        endOfLine: 'auto', // EoF 방식, OS별로 처리 방식이 다름 auto 는 각 OS 에 맞춰 자동 설정
        quoteProps: 'as-needed', // 객체 속성에 쿼테이션 적용 방식 (쿼터를 감싸지 않아도 되는 것은 자동으로 쿼터 제거)
        /* 특정 파일별로 옵션을 다르게 지정함, ESLint 방식 사용 */
        overrides: [
          {
            files: '*.json',
            options: {
              printWidth: 200,
            },
          },
        ],
      },
    ],
  },
};
