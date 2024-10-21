const React = require("react");
const { useState, useRef } = React;

// function onClickScreen() {}

const ResponseCheck = () => {
  const [colorState, setColorState] = useState("waiting");
  const [message, setMessage] = useState("클릭해서 시작하세요");
  const [result, setResult] = useState([]);

  const timeout = useRef(null);
  const startTime = useRef(null);
  const endTime = useRef(null);

  const onClickScreen = () => {
    if (colorState === "waiting") {
      // 파란화면일때
      timeout.current = setTimeout(() => {
        setColorState("now");
        setMessage("지금!");
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) * 2000);
      setColorState("ready");
      setMessage("초록이 되면 클릭해!");
    } else if (colorState === "ready") {
      // 빨간화면일때
      clearTimeout(timeout.current);
      setColorState("waiting");
      setMessage("너무 성급해요! 다시 클릭해주세요");
    } else if (colorState === "now") {
      // 초록화면일때
      endTime.current = new Date();
      setColorState("waiting");
      setMessage("클릭해서 시작하세요");
      setResult((prev) => {
        [...prev, endTime.current, startTime.current];
      });
    }
  };
  return (
    <>
      <h1>반응속도 체크 게임에 오신걸 환영합니다.</h1>
      <div id="screen" className={colorState} onClick={onClickScreen}>
        {message}
      </div>
      {/*삼항연산자를 사용하여 보여줄지 말지 결정
       * 현재 빈배열이라 reduce를 사용할 수 없으므로 0일때는 null(빈태그)로 실행되지 않도록함
       * false, undefined, null은 jsx에서 태그없음을 의미한다.
       */}
      {result.length === 0 ? null : (
        <div>
          평균시간 :
          {result.reduce((a, c) => {
            a + c;
          }) / result.length}
          ms
        </div>
      )}
    </>
  ); // render에서는 for과 if (반복문과 조건문을 사용 못함 ㅠㅠ)
};

module.exports = ResponseCheck;
