// only react
module.exports = {
  extends: ['plugin:react/recommended'],
  plugins: ['react', 'react-hooks'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    /* jsx 구문을 js, ts, tsx에서도 허용 */
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.js', '.ts', '.jsx', '.tsx'],
      },
    ],
    'react/no-array-index-key': 'warn', // map key 를 유효하고 유일한 값으로 설정 규칙
    'react/jsx-props-no-spreading': 'off', // jsx.Element에 Spread Props 전달하기 위해 off (.e.g => <El {...props} />)
    'react/prop-types': 'off', // react props type체크 여부 off
    'react/require-default-props': 'off', // react defaultProps 값 필수 선언 여부 off
    'jsx-a11y/interactive-supports-focus': 'off', // 마우스 또는 키 누르기가 있는 요소는 포커스 효과를 주도록 하는 린트 off (디자인적인 요소로 마우스 표시를 안할 수도 있음으로..)
    'jsx-a11y/click-events-have-key-events': 'warn', // onClick 이벤트를 사용시에 마우스를 사용할 수 없는 사용자를 위해 onKeyUp, onKeyDown, onKeyPress 중 하나를 꼭 사용하도록 하는 규칙
    'jsx-a11y/anchor-is-valid': 'off', //  <a>태그는 href 로 하이퍼링크를 정의 하는 규칙 (디자인 적으로 <a> 태그를 버튼처럼 사용하는 경우가 많아서 off)
    'react/jsx-uses-react': 'off', // jsx 에서 import React from 'react' 를 선언하지 않으면 안되는 규칙 off
    'react/react-in-jsx-scope': 'off', // jsx 에서 import React from 'react' 를 선언하지 않으면 안되는 규칙 off
    /* <div> 와 같이 의미가 모호한 태그는 role을 지정해 줘야하는 규칙 */
    'jsx-a11y/no-static-element-interactions': [
      'warn',
      {
        handlers: [
          'onClick',
          'onMouseDown',
          'onMouseUp',
          'onKeyPress',
          'onKeyDown',
          'onKeyUp',
        ],
        allowExpressionValues: true,
      },
    ],
    /* react-hooks 규칙 */
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',
  },
  settings: {
    react: { version: 'detect' }, // eslint-plugin-react에게 사용하고 있는 리액트의 버전을 알아서 탐지하도록 한다.
  },
};
