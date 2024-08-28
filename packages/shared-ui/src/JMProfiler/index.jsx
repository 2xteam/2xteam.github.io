import { createPortal } from "react-dom";

import ProfilerDom from "./Component/ProfilerDom";
import Tree from "./Component/Tree";

const JMProfiler = (childComponents) => {
  return (
    <>
      <Tree {...childComponents} />
      {createPortal(
        <ProfilerDom childComponents={childComponents} />,
        document.body
      )}
    </>
  );
};

export default JMProfiler;
