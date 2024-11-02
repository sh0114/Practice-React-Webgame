import React, { useState, useRef, useEffect } from "react";
import Ball from "./Ball";

function getWinNumbers() {
  console.log("getWinNumbers"); // 반복실행 여부 체크
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

const Lotto = () => {
  const [winNumbers, setWinNumbers] = useState(getWinNumbers());
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeout = useRef([]);

  useEffect(() => {
    for (let i = 0; winNumbers.length - 1; i++) {
      timeout.current[i] = setTimeout(() => {
        setWinBalls((prevWinBalls) => {
          return [...prevWinBalls, winNumbers[i]];
        });
      }, (i + 1) * 1000);
    }
    setTimeout(() => {
      setBonus(winBalls[6]);
      setRedo(true);
    }, 7000);
  }, []);

  const onClickRedo = () => {
    console.log("onClickRedo");
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeout.current = [];
  };

  return (
    <>
      <h1>로또추첨기</h1>
      <div>당첨 숫자</div>
      <div id="resultWindow">
        {winBalls.map((v) => (
          <Ball key={v} number={v} />
        ))}
      </div>
      <div>보너스!</div>
      {bonus && <Ball number={bonus} onClick={onClickRedo} />}
      {redo && <button onClick={onClickRedo}>한 번 더!</button>}
    </>
  );
};

export default Lotto;
