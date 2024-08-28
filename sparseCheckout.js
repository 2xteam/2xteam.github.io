#!/usr/bin/env node

import readline from "readline";
import inquirer from "inquirer";
import chalk from "chalk";
import { execSync } from "child_process";

const readLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const initFileArr = [
  ".changeset",
  ".editorconfig",
  "packages",
  ".npmrc",
  ".gitignore",
  "package.json",
  "pnpm-lock.yaml",
  "pnpm-workspace.yaml",
  "README.md",
  "sparseCheckout.js",
  "tsconfig.base.json",
  "docs",
];

const firstQuestion = () =>
  readLine.question(
    "fe 모노레포 작업을 부분 체크아웃할 수 있도록 setting 하시겠습니까? (y/n)",
    programStart
  );

const jobs = [
  {
    type: "input",
    name: "branch",
    message: "작업할 branch를 입력해 주세요.",
    default: "dev",
  },
  {
    type: "checkbox",
    name: "selectDirectory",
    message:
      "checkout 하고 싶은 directory를 스페이스바로 선택해주세요.(복수 선택 가능합니다.)",
    choices: [
      "service_tmon_benefit_ui",
      "service_tmon_deal_mobile_ui",
      "service_tmon_deal_pc_ui",
      "service_tmon_delivery_ui",
      "service_tmon_home_ui",
      "service_tmon_plan_ui",
      "service_tmon_media_ui",
      "service_tmon_search_ui",
      "service_tmon_service_ui",
    ],
  },
  {
    type: "confirm",
    name: "confirm",
    message: "선택하신 설정으로 checkout 하시겠습니까?",
  },
];

console.clear();

const answerCallback = (branch, selectDirectory) => {
  const selectDirectoryArr = selectDirectory.map(
    (repoName) => `projects/${repoName}`
  );

  const exSelectDirectoryArr = selectDirectory.map(
    (repoName) => `! -name 'projects/${repoName}'`
  );

  execSync("git sparse-checkout disable");
  execSync(`git checkout ${branch}`);
  execSync("git sparse-checkout init --cone");
  execSync(
    `git sparse-checkout set --skip-checks ${initFileArr.join(" ")} ${selectDirectoryArr.join(" ")}`
  );
  execSync(`find . ${exSelectDirectoryArr.join(" ")} -name 'projects/*' -type d -prune -print -exec rm -rf {} +`);

  console.log(chalk.bold.blue("node_modules 삭제 후 다시 install 중입니다..."));
  execSync('pnpm clean:force');
  execSync('pnpm i');
  console.log(chalk.bold.blue("install 완료! 🙌"));
};

const programStart = (answer) => {
  if (answer === "y") {
    console.log(chalk.bold.green("yes"));

    inquirer.prompt(jobs).then((answers) => {
      if (answers.confirm) {
        answerCallback(answers.branch, answers.selectDirectory);
        console.log(chalk.bold.blue("터미널을 종료합니다."));
      }
    });
  } else if (answer === "n") {
    console.log(chalk.bold.green("no"));
    console.log("오래걸리겠지만 모든 소스 다 받을꺼야!!");

    execSync("git sparse-checkout disable");

    readLine.close();
  } else {
    console.clear();
    console.log(chalk.bold.green("y 또는 n만 입력하세요."));

    firstQuestion();
  }
};

firstQuestion();


