- 👋 Hi, I’m @forkyouman
- 👀 I’m interested in ...
- 🌱 I’m currently learning ...
- 💞️ I’m looking to collaborate on ...
- 📫 How to reach me ...

<!---
forkyouman/forkyouman is a ✨ special ✨ repository because its `README.md` (this file) appears on your GitHub profile.
You can click the Preview link to take a look at your changes.
--->
모노레포 프로젝트 입니다.

- **스펙:** node v16.14.2 / pnpm v8.4.0
  > 자세한 스펙은 root 에 있는 package.josn 을 참고 하세요.
- [pnpm 설치](https://pnpm.io/pnpm-cli)

  현재 모노레포에서는 npm 대신 pnpm 패키지 매니져를 사용합니다.

  ```bash
  $ npm i // 최상위에 pnpm 디펜던시가 있어, npm 을 하면 pnpm 가 자동으로 다운로드 됩니다. 
  ```

  > ⚠️pnpm v8 버전을 설치 및 사용하려면 노드 버전이 v14.16.0 이상이어야 하므로 설치 전 노드 버전을 먼저 확인해야 합니다.

## 모노레포란?

---

모노레포와 멀티레포의 차이점은?

간단히 말해서 'monorepo' 는 관리를 위해 여러 프로젝트를 한 레파지토리에 넣어 동일한 구성 프로세스 집합을 공유할 수 있고 코드 사양도 통합할 수 있으며 특히 모듈 간에 상호 참조가 있는 경우 일부에서 경우에 따라 코드 보기, 버그 수정, 디버그 등이 더 편리해집니다.

## pnpm이 무엇인가요?

---

`pnpm`은 npm 과 같은 모노레포 관리에 유용한 패키지 관리 도구입니다. 공식 홈페이지에 따르면 **디스크 공간 절약 및 설치 속도 향상** 과 **node_modules 전역 저장소에서 패키지를 공유하는 구조로 중복 패키지 저장되는 버그 제거** 이라는 두 가지 목표를 달성할 수 있다고 합니다.구체적인 pnpm 사용방법은 [pnpm 공식 홈페이지](https://pnpm.io/en/motivation) 에서 확인 바랍니다.

- `pnpm`을 사용하는 이유는 ?

  - pnpm 패키징이 더 효율적이고 더 많은 디스크 공간을 절약할 수 있습니다.
  - pnpm 자체는 모노 레포에 대한 사전 지원이 있으므로 추가 타사 패키지 지원이 필요하지 않습니다.

## pnpm을 사용하여 메노레포 프로젝트를 빌드하는 방법

---

- 프로젝트 초기화

  1.작업할 projects 파일을 부분 git checkout 합니다.

  ```bash
  $ pnpm sc
  ```

  ![pnpm sc](docs/git-sparscheckout.gif)


  2.모노레포 전역 dependencies를 pnpm-lock.yaml 파일 버전 기준으로 install 해줍니다.

  ```bash
  $ pnpm i
  ```

  만약 프로젝트가 기존에 없다면 helloworld 프로젝트를 기준으로 폴더를 생성하여 작업을 진행합니다.

  ```

    └── helloworld/
        ├── public/
        │   └── template.html   # webapck dev server 실행시 사용하는 퍼블릭 기본 HTML 입니다.
        ├── scripts/
        │   └── fe-start.js     # 해당 서비스 실행문 입니다.
        ├── src/                # src 폴더 아래 서비스 app 작업, 작업 구조는 자유롭게 작업 합니다.
        │   └── index.jsx
        ├── webpack/            # webpack 폴더 아래는 웹팩 설정에 필요한 util폴더와 아래 구조와 같이 core/dev/release 로 나누어 관리 합니다.
        │   ├── addons
        │   ├── util
        │   ├── webapck.core.config.js
        │   ├── webpack.dev.config.js
        │   └── webpack.release.config.js
        ├── tsconfig.json       # typescirpt 프로젝트일 경우만 rootdp tsconfig.base.json 을 extends 하여 구성합니다.
        ├── package.json        # 커밋 허스키 hooks 설정 필수로 추가 합니다.
        ├── .eslintrc.js        # 해당 서비스 eslint 설정 입니다. @monorepo/eslint-config 공통 모듈을 extends 하여 기본 설정하고 해당 프로젝트에서만 더 추가 사용해야 하는 규칙은 rules 에 추가하여 사용합니다.
        ├── .babelrc
        ├── webpack.config.js   # root webpack 설정 파일, 웹팩 환경에 맞게 webapck/ 아래 core/dev/release 를 조합하여 설정하도록 구성한다.
        └── README.md   #프로젝트 안내 사항 입니다.


  ```

- 각 프로젝트 번들링 실행 및 webpack dev server 실행 방법

  ```bash
  $ pnpm -F <프로젝트name> start

  // delivery_my 서비스 예시
  $ pnpm -F @monorepo/testApp start
  ```

  package.json script 에 start 명령문을 기존 프로젝트 프로젝트에 있는 fe-start.js 를 참고하여 추가 설정하여 사용합니다.

  ![pnpm -F @monorepo/testApp start](docs/npm-start-delivery_my.gif)

  > 해당 실행문은 pnpm 필터를 타기때문에 어느 위치에서 실행해도 실행됩니다.

- 디펜던시 추가

  - 모노레포 공통 root 디펜던시 추가 하는 방법

    ```bash
    // root dependencies 추가
    $ pnpm add -w <추가할 dependencies>@<버젼>

    // root devDependencies 추가
    $ pnpm add -wD <추가할 devDependencies>@<버젼>
    ```

  - 개인 프로젝트만 개별 디펜던시 추가 하는 방법

    ```bash
    // 서비스 프로젝트 dependencies 추가
    $ pnpm -F <프로젝트name> add <추가할 dependencies>@<버젼>

    // 서비스 프로젝트 devDependencies 추가
    $ pnpm -F <프로젝트name> add -D <추가할 devDependencies>@<버젼>
    ```

    최대한 고정 디펜던시로 설정하고 ^을 사용하지 않습니다. 실제 import 해서 사용하지 않지만 디펜던시 내부에서 사용하고 있는 디펜던시는 [peerDependencies](https://velog.io/@johnyworld/Peer-Dependencies-%EC%97%90-%EB%8C%80%ED%95%98%EC%97%AC) 에 명시하여 사용합니다. peerDependency 는 러프하게 설정한다 (ex> ^4.0.0 || ^5.0.0 )같이

- pacakge.json script 설명

  현재 chekout 한 모든 프로젝트 번들링 명령문:

  ```json
  {
    "build": "pnpm --filter=@monorepo/* run build-js-bundle"
  }
  ```

  모노레포 내에 모든 node_modules 를 삭제 명령문:

  clean:force 는 node_modeuls 캐시까지 삭제하는 명령문 입니다. 해당 명령문을 자주 사용하면 pnpm install 시에 속도가 매우 저하될 수 있습니다.

  ```json
  {
    "clean": "find ./ -name node_modules -type d -exec rm -rf {} +",
    "clean:force": "find ./ -name node_modules -type d -exec rm -rf {} + && pnpm store prune -w"
  }
  ```

  `changeset`을 실행하는 명령문:

  ```json
  {
    "changeset": "changeset"
  }
  ```

  `changeset version`을 실행하여 릴리스 패키지의 버전을 수정하는 명령문:

  ```json
  {
    "version-packages": "changeset version"
  }
  ```

  git 부분 체크아웃 실행 명령문:

  sc:reset 는 부분 체크 아웃 해제를 하여 모든 코드를 볼 수 있도록 하는 명령문입니다.

  ```json
  {
    "sc": "node ./sparseCheckout.js",
    "sc:reset": "git sparse-checkout disable"
  }
  ```

  npm ci 와 같은 역할을 하는 명령문:

  ```json
  {
    "ci": "pnpm i --frozen-lockfile"
  }
  ```

## 공통 모듈 워크 플로우

---

- changesets 이란?

  공통 모듈만 changesets 로 버젼 관리를 합니다.
  만약 우리의 패키지에 A, B, C 패키지가 있고 모두 변경 사항이 있어서 버전 업을 해야 하는 상황이에요. changesets를 사용하지 않으면 A, B, C 패키지를 일일이 버전을 올려주어야 합니다. (package.json에 version 필드를 변경시켜주는 작업)
  changesets은 이런 패키지 버전을 편리하게 관리해주는 라이브러리 입니다.

- changesets 설정 구성
  초기화 명령을 실행하면 프로젝트의 루트 디렉토리 아래에 .changeset디렉토리가 기본config.json 구성 파일로 사용됩니다 .

  ```json
  {
    "$schema": "https://unpkg.com/@changesets/config@2.3.0/schema.json",
    "changelog": "@changesets/cli/changelog",
    "commit": false,
    "fixed": [],
    "linked": [["@monorepo/*"]],
    "access": "restricted",
    "baseBranch": "dev",
    "updateInternalDependencies": "patch",
    "ignore": [],
    "___experimentalUnsafeOptions_WILL_CHANGE_IN_PATCH": {
      "onlyUpdatePeerDependentsWhenOutOfRange": true
    }
  }
  ```

  해당 changesets 설정은 다음과 같이 설명합니다.

  - changelog: changelog 생성 방법
  - commit: `publish` 할 때 `changeset`이 `git add`를 수행 하지 않도록 합니다.
  - linked: 버전을 공유할 패키지 구성
  - access: 공개 및 비공개 보안 설정, 인트라넷에는 제한 권장, 오픈 소스는 공개 사용
  - baseBranch: 프로젝트의 메인 브랜치
  - updateInternalDependencies: 패키지가 종속된 패키지가 업그레이드되었는지 확인하고 패키지도 버전 업그레이드 단위(크기)로 측정해야 합니다.
  - ignore: 버전을 변경할 필요가 없는 패키지
  - \_\_\_experimentalUnsafeOptions_WILL_CHANGE_IN_PATCH: 주요 우선 순위가 업데이트되지 않도록 하기 위해 버전이 변경될 때마다 그에 의존하는 패키지의 버전을 패치하고 업그레이드할 이유가 없어야 합니다.

- changesets 사용방법

  1.packages/ 아래 공통 패키지를 수정하여 공통 패키지 버전을 올려야 하는 경우 공통 패키지 작업을 완료한 뒤에 changeset cli 를 실행 합니다.

  ```bash
  $ pnpm changeset
  ```

  2..changeset 폴더 아래 cli 에 설정했던 버전 정보에 대한 문서가 생성됩니다.

  3.문서 내용이 맞으면 해당 버전 정보를 바탕으로 공통 패키지 버젼 update 합니다.

  ```bash
  $ pnpm version-packages
  ```

  ![changeset 사용법](docs/changeset-start.gif)

## 코드 사양 관리

---

- 코드 style 설정([공통 eslint 모듈](packages/eslint-config/)로 관리)

- 허스키 적용

  package.json에 다음 구성을 추가합니다.

  ```json
  "lint-staged": {
    // typescript 일경우 ts, tsx 모두 섞여 있을 경우 js, jsx, ts, tsx
    "src/**/*.{js,jsx}": [
      "eslint --ext .js,jsx src/ --fix"
    ]
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  ```
