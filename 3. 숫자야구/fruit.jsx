const React = require("react");
const { useState, useRef } = React;

const Fruit = ({ value, index }) => {
  return (
    <>
      <li key={value.fruit}>
        <b>{value.fruit}</b> : {value.taste}
      </li>

      {/**반복문 예제 
      <ul>
        {[
          { fruit: "사과", taste: "아삭아삭" },
          { fruit: "배", taste: "달다" },
          { fruit: "밤", taste: "좋아" },
        ].map((v) => {
          return (
            <li key={value.fruit}>
              {/* 고유한 값을 key로 꼭 지정해줘야한다, 리액트 최적화에 영향
          * key 지정할때 단순 연번 i 로 하면 문제발생 
          ->> 리액트에서는 key를 기준으로 엘리먼트를 추가, 수정, 삭제 판단하기 때문에 배열의 순서가 바뀌면 바로 문제 발생
          ->> 단순하게 계속 추가가 되는 배열의 경우에만 i를 써도되긴하는데 비추 
              <b>{value.fruit}</b> : {value.taste}
            </li>
          );
        })}
        {/* 이차원 배열로 하는 방법 [
      ["사과", "아삭아삭"],
      ["밤", "like"],
      ["배", "달다"],
    ].map((v) => {
      return (
        <li>
          <b>{v[0]}</b> : {v[1]}
        </li>
      );
    })
      </ul>
      */}
    </>
  );
};

module.exports = Fruit;
