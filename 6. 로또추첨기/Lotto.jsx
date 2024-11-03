import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
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
  const lottoNumbers = useMemo(() => getWinNumbers(), []);
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);

  // useMemo 복잡한 함수의 결과값을 기억해줄때 쓰는 hooks, 이경우는 뽑은 로또번호를 메모함, 배열에있는 값이 바뀌기전까지 기억
  // useRef 일반 값을 기억할때 주로 사용
  // useEffect는 배열에 있는 값이 바뀔때 함수를 실행한다
  // useCallback 함수 자체를 기억, 배열에있는 값이 바뀌기전까지 기억

  /* hooks는 순서가 매우 중요!
   * 조건문안에는 절대 넣으면안됨!
   * 함수나 반복문안에도 hooks 넣는 것은 비추천
   * 예를 들어 useEffect useState안에 쓰면안된다
   * -->> hooks들은 최상위로 빼서 실행순서가 같게끔만들어주는 것이 중요함
   */

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      //ajax 실행
    }
  }, [winBalls]); // ComponentDidUpdate만 하고 싶을때, componentDidMount는 실행안하고싶을때 패턴처럼사용

  useEffect(() => {
    console.log("useEffect");
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
      }, (i + 1) * 1000);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);
    return () => {
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      });
    };
  }, [timeouts.current]);
  // 빈 배열이면 componentDidMount와 동일
  // 배열에 요소가 있으면 componentDidMount랑 componentDidUpdate 둘 다 수행

  useEffect(() => {
    console.log("당첨숫자를 생성합니다.");
  }, [winNumbers]);

  const onClickRedo = useCallback(() => {
    // 자식컴포넌트에서는 useCallback 필수, 부모로부터 전달받은 함수가 사실 같은거라는 것을 인지하게 해줌
    console.log("onClickRedo");
    console.log(winNumbers);
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = []; // current에 직접적으로 넣어주는거라 바뀜
  }, [winNumbers]);

  return (
    <>
      <h1>로또추첨기</h1>
      <div>당첨 숫자</div>
      <div id="결과창">
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
