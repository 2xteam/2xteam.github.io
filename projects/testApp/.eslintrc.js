const path = require("path");

module.exports = {
  root: true,
  extends: ["@monorepo/eslint-config/jsReact"],
  rules: {
    "prettier/prettier": [
      "warn",
      {
        singleQuote: true,
      },
    ],
    "jsx-a11y/click-events-have-key-events": "off", // onClick 이벤트를 사용시에 마우스를 사용할 수 없는 사용자를 위해 onKeyUp, onKeyDown, onKeyPress 중 하나를 꼭 사용하도록 하는 규칙
    "jsx-a11y/no-static-element-interactions": "off",
    "default-param-last": "off",
  },
};
