import React, { useState, useRef } from "react";
import Draggable from "react-draggable";

import { setCookie, getCookie } from "../util/cookie";

const ProfilerDom = (props) => {
  const componentTree = {};
  const componentList = {};

  const profilerCookie = getCookie("jmProfiler");
  const defaultProfilerSet = {
    selectedComponent: "",
    use: true,
    x: 50,
    y: 50,
    display: true,
    disabled: false,
  };
  const profilerInfo = profilerCookie ? profilerCookie : defaultProfilerSet;

  const [disabled, setDisabled] = useState(profilerInfo.disabled);
  const [display, setDisplay] = useState(profilerInfo.display);
  const use = profilerInfo.use;

  const setDraggable = () => {
    const newDisabled = !disabled;
    setDisabled(newDisabled);
    setCookie(
      "jmProfiler",
      JSON.stringify({ ...getCookie("jmProfiler"), disabled: newDisabled })
    );
  };

  const setUseFunc = () => {
    setCookie(
      "jmProfiler",
      JSON.stringify({ ...getCookie("jmProfiler"), use: !use })
    );

    location.reload();
  };

  const setDisplayFunc = () => {
    const newDisplay = !display;
    setDisplay(newDisplay);
    setCookie(
      "jmProfiler",
      JSON.stringify({ ...getCookie("jmProfiler"), display: newDisplay })
    );
  };

  // check tree
  const checkTree = ({ children, obj, curComp, id }) => {
    const targetComp = curComp ? curComp : obj;

    const checkTreeFunc = (components) => {
      components.map((child) => {
        if (child?.props?.children) {
          //wrapper
          const name = child.type?.name
            ? child.type?.name
            : child.type.toString();
          if (name && !targetComp[name]) targetComp[name] = {};
          if (name && !componentList[name])
            componentList[name] = { type: "wrapper" };
          return checkTree({
            children: child.props.children,
            curComp: targetComp[name],
            id: name,
          });
        }

        if (child && typeof child === "object") {
          const name = child?.type?.name
            ? child.type.name
            : child?.type?.type?.displayName
            ? child.type.type.displayName
            : "C";
          if (name && !targetComp[name]) targetComp[name] = {};
          if (name && !componentList[name]) componentList[name] = {};
        }
      });
    };

    //첫 진입
    if (children.children) {
      if (children.children?.length > 1) {
        // Tree 구조일때
        return checkTreeFunc(children.children);
      }

      // 여기로 유입되면 싱글 or 자식 컴퍼넌트
      const name = children.children?.type?.name
        ? children.children.type.name
        : id;
      if (name && !targetComp[name]) targetComp[name] = {};
      if (name && !componentList[name]) componentList[name] = {};
    }

    if (children) {
      if (children.length > 1) {
        if (id) {
          // Wrapper일 경우
          return checkTreeFunc(children);
        }

        // Tree 구조일때
        return checkTreeFunc(children);
      }

      // 여기로 유입되면 싱글 or 자식 컴퍼넌트
      const name = children.type?.name ? children.type.name : id;
      if (name && !targetComp[name]) targetComp[name] = {};
      if (name && !componentList[name]) componentList[name] = {};
    }
    return null;
  };

  const { childComponents } = props;
  checkTree({ children: childComponents, obj: componentTree });

  const ComponentStructure = () => {
    const Structure = ({ child, id, deps }) => {
      return (
        <>
          <LiComponent key={id} id={id} deps={deps} />
          {child && Object.keys(child).length > 0
            ? Object.keys(child).map((key) => {
                return (
                  <Structure
                    child={child[key]}
                    key={key}
                    id={key}
                    deps={deps + 1}
                  />
                );
              })
            : null}
        </>
      );
    };

    const LiComponent = ({ id, deps }) => {
      const isWrapper = componentList[id]?.type === "wrapper";

      return (
        <li
          key={id}
          {...(!isWrapper && {
            style: {
              cursor: "pointer",
              ...(profilerInfo.selectedComponent === id &&
                profilerInfo.use && { color: "blue" }),
            },
          })}
          {...(!isWrapper && {
            onClick: () => {
              setCookie(
                "jmProfiler",
                JSON.stringify({
                  ...getCookie("jmProfiler"),
                  selectedComponent: id,
                  use: true,
                })
              );

              location.reload();
            },
          })}
        >
          {Array(deps).join("-")} {id}
        </li>
      );
    };

    return (
      <>
        {componentTree && Object.keys(componentTree).length > 0
          ? Object.keys(componentTree).map((key) => {
              return (
                <Structure
                  child={componentTree[key]}
                  key={key}
                  id={key}
                  deps={1}
                />
              );
            })
          : null}
      </>
    );
  };

  const onDragStop = (e, n) => {
    setCookie(
      "jmProfiler",
      JSON.stringify({ ...getCookie("jmProfiler"), x: n.x, y: n.y })
    );
  };

  const draggableNodeRef = useRef(null);

  return (
    <Draggable
      nodeRef={draggableNodeRef}
      enableUserSelectHack={true}
      disabled={!disabled}
      onStop={onDragStop}
      defaultPosition={{ x: profilerInfo.x, y: profilerInfo.y }}
    >
      <div
        ref={draggableNodeRef}
        style={{
          position: "fixed",
          zIndex: 10000000,
          top: `0px`,
          left: `0px`,
          opacity: display ? 1 : 0.3,
        }}
      >
        <div
          style={{
            backgroundColor: "rgb(239, 239, 239)",
            width: display ? "320px" : "170px",
            minHeight: "10px",
            margin: "25px",
            padding: "5px 10px",
            borderRadius: "10px",
            cursor: disabled ? "move" : "",
            boxShadow:
              "0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "20px",
              display: "flex",
              justifyContent: "flex-end",
              textAlign: "right",
            }}
          >
            {disabled && (
              <span style={{ paddingRight: "20px", display: "inline" }}>
                <p style={{ display: "inline" }}>Profiler </p>
              </span>
            )}
            <svg
              focusable="false"
              viewBox="0 0 24 24"
              aria-hidden="true"
              role="presentation"
              style={{ cursor: "pointer" }}
              onClick={setDraggable}
            >
              <path
                d={
                  disabled
                    ? "M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
                    : "M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"
                }
              ></path>
              <path fill="none" d="M0 0h24v24H0z"></path>
            </svg>
          </div>
          <div
            style={{
              display: !disabled ? "block" : "none",
              paddingBottom: "10px",
            }}
          >
            <div style={{ width: "100%" }}>
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                Profiler
              </span>
              <span>
                (use{" "}
                <input
                  type="checkbox"
                  value="test"
                  onChange={setUseFunc}
                  checked={use}
                />
              </span>
              <span>
                {" "}
                hide{" "}
                <input
                  type="checkbox"
                  value="test"
                  onChange={setDisplayFunc}
                  checked={!display}
                />
                )
              </span>
            </div>
            <div style={{ display: display ? "block" : "none" }}>
              <div style={{ display: "inline-block" }}>
                <div style={{ width: "100%", fontSize: "12px", marginTop: "5px" }}>
                  (하위에 Wrapper형 Component가 있으면 UI가 깨져 보일 수 있습니다.
                  Wrapper 하위에서 사용해주세요.)
                </div>
                <br />
                <span>
                  <span style={{ fontWeight: "bold" }}>Component 구조</span>
                  <span>
                    {componentList[profilerInfo.selectedComponent]
                      ? ""
                      : " (Component를 선택해 주세요.) "}
                  </span>
                </span>
                <table style={{ marginTop: "5px", width: "100%" }}>
                  <tbody>
                    <tr>
                      <td style={{ padding: "0px" }}>
                        <div
                          color="primary"
                          style={{
                            width: "98%",
                            paddingLeft: "10px",
                            fontSize: "8pt",
                            backgroundColor: "rgb(221, 221, 221)",
                          }}
                        >
                          <ul
                            id="componentStructure"
                            style={{
                              height: "300px",
                              overflow: "auto",
                              fontSize: "12px",
                            }}
                          >
                            <ComponentStructure />
                          </ul>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <br />

                <span style={{ fontWeight: "bold" }}>Log</span>
                <table style={{ marginTop: "5px", width: "100%"  }}>
                  <tbody>
                    <tr>
                      <td style={{ padding: "0px" }}>
                        <div
                          color="primary"
                          style={{
                            width: "98%",
                            paddingLeft: "10px",
                            fontSize: "8pt",
                            backgroundColor: "rgb(221, 221, 221)",
                          }}
                        >
                          <ul
                            id="profilerLog"
                            style={{
                              height: "150px",
                              overflow: "auto",
                              fontSize: "12px",
                            }}
                          ></ul>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div
                  style={{
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  <input
                    tabIndex="0"
                    type="button"
                    style={{
                      marginTop: "10px",
                      width: "17%",
                      height: "30px",
                      background: "#3f51b5",
                      color: "white",
                      borderRadius: "5px",
                    }}
                    value="Reload"
                    onClick={() => {
                      location.reload();
                    }}
                  />{" "}
                  <input
                    tabIndex="0"
                    type="button"
                    style={{
                      marginTop: "10px",
                      width: "15%",
                      height: "30px",
                      background: "#3f51b5",
                      color: "white",
                      borderRadius: "5px",
                    }}
                    value="Reset"
                    onClick={() => {
                      setCookie("jmProfiler", defaultProfilerSet);
                      location.reload();
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
};
export default ProfilerDom;
