// import React, { useState, useRef } from "react";
const React = require("react");
const { useState, useRef } = React;
const Try = require("./Try");

// import React from 'react';
// exports되는게 객체나 배열이면 구조분해 가능
//

const NumberBaseball = () => {
  const getNumbers = () => {
    // 숫자 4개를 겹치지 않게 랜덤하게 뽑는 함수!
    return ["1", "2", "3", "4"];
  };

  const { result, setResult } = useState("");
  const { value, setValue } = useState("");
  const { answer, setAnswer } = useState("");
  const ans = getNumbers();
  // setAnswer(ans); // 맞춰야할 숫자 4자리
  const { tries, setTries } = useState([]);
  const InputRef = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <label>숫자야구에 오신걸 환영합니다.</label>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input
          maxLength={4}
          ref={InputRef}
          value={value}
          onChange={onChangeInput}
        />
        <button>입력하기</button>
      </form>
      <div>시도 횟수 : {tries} </div>
      <ul>
        {[
          { fruit: "사과", taste: "아삭아삭" },
          { fruit: "배", taste: "달다" },
          { fruit: "밤", taste: "좋아" },
        ].map((v, i) => {
          return <Try key={v.fruit} value={v} index={i} />;
        })}
      </ul>
    </>
  );
};

module.exports = NumberBaseball;

// export const hello = 'hello'; ->> export const는 여러번 사용 가능
// export default hello = 'hello'; ->> export default는 한번만 사용 가능
