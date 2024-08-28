# @monorepo/eslint-config

프론트개발팀 Lint configs 모듈입니다.

## Installation

```sh
pnpm add @monorepo/eslint-config -F <추가할 패키지 name> -D
```

## Usage

(공통 코드컨벤션을 위해 프로젝트 lint 설정에 공통 lint 모듈만 extends 하여 사용하고 특수한 경우에만 프로젝트 개인적인 lint 규칙을 더 확장해서 사용합니다.)
`extends` 옵션을 사용하여 이 구성을 자신의 ESLint 구성으로 가져오십시오. ESLint는 구성을 위해 `package.json` 및 `.eslintrc.*` 파일을 모두 확인합니다.

### package.json

```js
{
  "eslintConfig": {
    // Choose from @monorepo/eslint-config/jsBase, @monorepo/eslint-config/jsReact, @monorepo/eslint-config/jsReactTypescript, @monorepo/eslint-config/jsTypescript
    "extends": "@monorepo/eslint-config/jsBase"
  }
}
```

### .eslintrc.js

```js
// js 로만 프로젝트 구성시
module.exports = {
  extends: ['@monorepo/eslint-config/jsBase'],
};

// react or js + react 만 프로젝트 구성시
module.exports = {
  extends: ['@monorepo/eslint-config/jsReact'],
};

// typescript or js + typescript 만 프로젝트 구성시
module.exports = {
  extends: ['@monorepo/eslint-config/jsTypescript'],
};

// js + react + typescript 만 프로젝트 구성시
module.exports = {
  extends: ['@monorepo/eslint-config/jsReactTypescript'],
};
```

## Customizing Prettier

Prettier 설정을 사용자 정의하려면 프로젝트 디렉토리에 `.prettierrc`라는 파일을 만드십시오. Prettier 구성 파일의 예:

```json
{
  "printWidth": 100,
  "tabWidth": 2,
  "singleQuote": true,
  "bracketSameLine": true,
  "trailingComma": "es5"
}
```

Read more about [configuring `prettier`](https://prettier.io/docs/en/configuration.html) and [all of the available options](https://prettier.io/docs/en/options.html).

## Support for Different Languages

(공통 코드컨벤션 을 위해 커스텀 하지 않고 사용하고 특수한 경우에만 확장하여 사용합니다.)
다양한 언어에 대한 몇 가지 구성이 있습니다. :

- `jsBase`: js 언어로만 프로젝트 구성이 되어 있을 경우 사용.
- `jsReact`: js, react 언어가 섞여 있거나 react로만 프로젝트가 구성되어 있는 경우 사용.
- `jsTypescript`: js, typescript 언어가 섞여 있거나 typescript로만 프로젝트가 구성되어 있는 경우 사용.
- `jsReactTypescript`: js, react, typescript 언어가 섞여 있거나 react, typescript 언어로만 프로젝트가 구성되어 있는 경우 사용.
