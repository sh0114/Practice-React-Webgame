// import React, { memo } from "react";
const React = require("react");
const { memo, useState } = React;
// memo의 역할 : 부모가 리렌더링됐을때 자식도 같이 렌더링되는것을막아줌 (state나 props가 바뀌었을때는 제외)

const Try = memo(({ tryInfo, index }) => {
  // props는 부모에서 바꿔야하지, 자식에서 바꾸면 안된다
  // state로 넣어서 해결

  // const [result, setResult] = useState(tryInfo.result);
  // setResult("test");
  // context로 조부모가 손자에게 전달 가능, 나중에는 redux 활용
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
