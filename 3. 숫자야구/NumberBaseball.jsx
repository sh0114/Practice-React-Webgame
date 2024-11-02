// import React, { useState, useRef } from "react";
const React = require("react");
const { useState, useRef, createRef, useNavigate } = React;
const Try = require("./Try");
const Fruit = require("./fruit");
// import React from 'react';
// exports되는게 객체나 배열이면 구조분해 가능
// createRef로 useRef 처럼 쓸 수 있다.

function getNumbers() {
  // 숫자 4개를 겹치지 않게 랜덤하게 뽑는 함수!
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

const NumberBaseball = () => {
  const [result, setResult] = useState("");
  const [value, setValue] = useState("");
  const [answer, setAnswer] = useState(getNumbers);
  // lazy init
  // getNumbers() ()호출함 -> 첫번째 리턴값을 answer에 넣어줌, 렌더링 될때마다 실행은 되지만 answer값업뎃 되지않음
  // 함수가 항상 실행될 필요가 없는데도 실행이 되므로, 비효율적
  // getNumbers ()호출안함 -> 처음 실행 후에는 렌더링 되어도 호출을 안해서 실행 되지 않음
  const [tries, setTries] = useState([]);
  // const InputRef = useRef(null);
  // const InputRef = createRef();
  const InputRef = useRef(null);

  const onSubmitForm = (e) => {
    console.log(answer);
    e.preventDefault();
    if (value === answer.join("")) {
      setResult("홈런~~~");
      setTries((prev) => {
        return [...prev, { try: value, result: "홈런~!" }];
      });
      // 리액트에서는 배열에 PUSH 쓰면안됨! 리액트가 무엇이 바뀌었는지 감지를 못함 (참조가 바뀌어야한다.)
      // 배열앞에 ... 으로 새로운 객체를 생성해준다
      // 이전 값으로 현재 값을 넣어줄 경우에는 함수형으로 만들어줘야한다!!
      alert("게임을 다시 시작합니다");
      setValue("");
      setAnswer(getNumbers());
      setTries([]);
      InputRef.current.focus;
    } else {
      const answerArray = value.split("").map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        setResult(
          `10회 넘어서 실패입니다 ㅠㅠ 정답은 ${answer.join(",")} 였습니다!`
        );
        alert("게임을 다시 시작합니다");
        setValue("");
        setAnswer(getNumbers());
        setTries([]);
      } else {
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === answer[i]) {
            console.log("strike", answerArray[i], answer[i]);
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            console.log("ball", answerArray[i], answer.indexOf(answerArray[i]));
            ball += 1;
          }
        }
        setTries((prev) => {
          return [
            ...prev,
            { try: value, result: `${strike} 스트라이크 ${ball} 볼 ` },
          ];
        });
        setValue("");
        InputRef.current.focus;
      }
    }
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
      <div>시도 횟수 : {tries.length} </div>
      <ul>
        {tries.map((v, i) => {
          return (
            <>
              <Try key={`${i + 1}회 시도, ${v.try}`} tryInfo={v} index={i} />
            </>
          );
        })}
      </ul>
      <ul>
        {[
          { fruit: "사과", taste: "아삭아삭" },
          { fruit: "배", taste: "달다" },
          { fruit: "밤", taste: "좋아" },
        ].map((v2, i) => {
          return (
            <>
              <Fruit key={v2.fruit} value={v2} index={i} />
            </>
          );
        })}
      </ul>
    </>
  );
};

module.exports = NumberBaseball;

// export const hello = 'hello'; ->> export const는 여러번 사용 가능
// export default hello = 'hello'; ->> export default는 한번만 사용 가능
