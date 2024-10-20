// import React, { memo } from "react";
const React = require("react");
const { memo } = React;
// memo의 역할 : 부모가 리렌더링됐을때 자식도 같이 렌더링되는것을막아줌 (state나 props가 바뀌었을때는 제외)

const Try = memo(({ tryInfo, index }) => {
  return (
    <>
      <li key={`${index + 1}회 시도`}>
        <b>{tryInfo.try}</b> : {tryInfo.result}
      </li>
    </>
  );
});

module.exports = Try;

// export default Try = "Try";
