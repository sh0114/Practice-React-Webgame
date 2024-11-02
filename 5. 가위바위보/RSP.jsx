const React = require("react");
const { useState, useRef, useEffect } = React;

/* 렌더링될때 jsx가 dom에 붙는 순간 할 수 있는 ""동작"" 을 하게하는 것이있다
 * 처음 렌더가 성공적으로 수행될때 사용된다 ->> componentDidMount 첫렌더링 된 후, 비동기 요청을 많이해요
 * 컴포넌트가 리렌더링 될때 실행 ->> componentDidUpdate props 바뀔때
 * 부모 컴포넌트가 자식 컴포넌트 삭제될때, 컴포넌트가 제거되기 직전->> componentWillUnmount 비동기 요청 정리를 많이 해요
 *
 * 클래스의 경우 -> constructor > render > ref > componentDidMount >
 * setState, props 변경 > shouldComponentUpdate(true 리턴 시 리렌더링)> render > componentDidUpdate
 * 부모가 자식 컴포넌트를 없앨때 > componentWillUnmount > 소멸*/

const rspCoords = {
  바위: "0",
  가위: "-142px",
  보: "-284px",
};

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
};

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find(function (v) {
    return v[1] === imgCoord;
  })[0];
};

const RockScissorsPaper = () => {
  const [result, setResult] = useState("");
  const [imgCoord, setImgCoord] = useState(rspCoords.바위);
  const [score, setScore] = useState(0);
  const interval = useRef();

  // useLayoutEffect -- 화면 사이즈가 변경 될때 실행되는 useEffect

  useEffect(() => {
    // componentDidMount, componentDidUpdate 와 비슷!한 역할을 수행한다. 1:1 대응되는 기능은 아님
    interval.current = setInterval(changeHand, 100);
    console.log("다시실행");
    return () => {
      // componentWillUnmount 역할
      clearInterval(interval.current);
      console.log("종료");
    };
  }, [imgCoord]);

  const changeHand = () => {
    if (imgCoord === rspCoords.바위) {
      setImgCoord(rspCoords.가위);
    } else if (imgCoord === rspCoords.가위) {
      setImgCoord(rspCoords.보);
    } else if (imgCoord === rspCoords.보) {
      setImgCoord(rspCoords.바위);
    }
  };

  const onClickBtn = (choice) => () => {
    if (interval.current) {
      clearInterval(interval.current);
      interval.current = null;
      const myScore = scores[choice];
      const cpuScore = scores[computerChoice(imgCoord)];
      const diff = myScore - cpuScore;
      if (diff === 0) {
        setResult("비겼습니다.");
      } else if ([-1, 2].includes(diff)) {
        setResult("이겼습니다");
        setScore((prevScore) => {
          return prevScore + 1;
        });
      } else {
        setResult("졌습니다");
        setScore((prevScore) => {
          return prevScore - 1;
        });
      }
      setTimeout(() => {
        interval.current = setInterval(changeHand, 1000);
      }, 2000);
    }
  };

  return (
    <>
      <h1>가위바위보 게임</h1>
      <p>이기면 1점 비기면 0점 지면 -1점</p>
      <div
        id="computer"
        style={{
          background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`,
        }}
      />
      <div>
        <button id="rock" className="btn" onClick={onClickBtn("바위")}>
          바위
        </button>
        <button id="scissor" className="btn" onClick={onClickBtn("가위")}>
          가위
        </button>
        <button id="paper" className="btn" onClick={onClickBtn("보")}>
          보
        </button>
        <div>{`${result} 당신의 점수는 ? ${score}`}</div>
      </div>
    </>
  );
};

module.exports = RockScissorsPaper;
