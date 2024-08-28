import { Profiler } from "react";
import { getCookie } from "../util/cookie";

const Tree = (childComponents) => {
  const profilerCookie = getCookie("jmProfiler");
  const profilerInfo = profilerCookie
    ? profilerCookie
    : {
        selectedComponent: "",
        use: true,
        x: 50,
        y: 50,
        display: true,
        disabled: true,
      };

  const callBack = (
    id, // 방금 커밋된 Profiler 트리의 "id"
    phase, // "mount" (트리가 방금 마운트가 된 경우) 혹은 "update"(트리가 리렌더링된 경우)
    actualDuration, // 커밋된 업데이트를 렌더링하는데 걸린 시간
    baseDuration, // 메모이제이션 없이 하위 트리 전체를 렌더링하는데 걸리는 예상시간
    startTime, // React가 언제 해당 업데이트를 렌더링하기 시작했는지
    commitTime, // React가 해당 업데이트를 언제 커밋했는지
    interactions // 업데이트가 계획되었을 때 추적하고 있던 “상호작용”의 집합 (e.g. render 혹은 setState가 호출되었을 때).
  ) => {
    const getPhaseHtml = (phase, colorUse) => {
      let color = "";
      if (colorUse) {
        switch (phase) {
          case "mount":
            color = "green";
            break;
          case "update":
            color = "blue";
            break;
        }
      }

      return `<em style="color:${color};">${phase}</em>`;
    };

    const getDurationHtml = (duration, colorUse) => {
      let color = "";
      if (colorUse) {
        color = duration >= 10 ? "red" : "darkblue";
      }

      return `<em style="color:${color};">${duration.toFixed(1)}</em>`;
    };

    const logStr = `Phase: ${getPhaseHtml(phase, actualDuration > 0)},
                    Actual Duration: ${getDurationHtml(
                      actualDuration,
                      actualDuration > 0
                    )},
                    Base Duration: ${getDurationHtml(
                      baseDuration,
                      actualDuration > 0
                    )}
                    ${interactions ? `, Interactions: ${interactions}` : ""}`;

    const liHtml = `<li data-id="p_${id}" ${
      actualDuration <= 0 ? 'style="color:darkgray;' : ""
    }">${logStr}</li>`;

    addLog(liHtml);
  };

  const addLog = (liHtml) => {
    const targetElem = document.querySelector("#profilerLog");
    if (targetElem !== null) {
      targetElem.innerHTML = targetElem.innerHTML + liHtml;
      targetElem.scrollTo(0, 100000);
    }
  };

  const TreeFunc = (components) => {
    return components.map((child) => {
      if (child?.props?.children) {
        //wrapper
        const name = child.type?.name
          ? child.type?.name
          : child.type.toString();

        return (
          <Tree key={name} id={name}>
            {child.props.children}
          </Tree>
        );
      }

      if (child && typeof child === "object") {
        const name = child?.type?.name
          ? child.type.name
          : child?.type?.type?.displayName
          ? child.type.type.displayName
          : "C";

        if (profilerInfo.selectedComponent === name) {
          return (
            <Profiler id={name} onRender={callBack}>
              {child}
            </Profiler>
          );
        }

        return child;
      }
    });
  };

  if (!profilerInfo.use) {
    return childComponents.children;
  }

  if (childComponents.children) {
    if (childComponents.children?.length > 1) {
      if (childComponents.id) {
        // Wrapper일 경우
        return TreeFunc(childComponents.children);
      }

      // Tree 구조일때
      return TreeFunc(childComponents.children);
    }

    // 여기로 유입되면 싱글 or 자식 컴퍼넌트
    const name = childComponents.children?.type?.name
      ? childComponents.children.type.name
      : childComponents.id
      ? childComponents.id
      : "what";

    if (profilerInfo.selectedComponent === name) {
      return (
        <Profiler id={name} onRender={callBack}>
          {childComponents.children}
        </Profiler>
      );
    }
    return childComponents.children;
  }
};

export default Tree;
