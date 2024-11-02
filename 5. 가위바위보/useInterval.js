import { useRef, useEffect } from "react";

// 직접 hook을 만든다! custom hook
// 호출 예
/* useInterval(() => {
    console.log('hello');
    }, isRunning?1000:null);
    */
function useInterval(callback, delay) {
  const savedCallback = useRef();
  // callback이 바뀌어도 setInterval이 안되고 최신 callback만 항상 참조함!
  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current(); // 콜백함수를 저장해놨다가 실행함
    } // 왜 한번 함수로 감싸느냐??? 미묘하게 타이밍이 어긋남, 딜레이발생때문
    if (delay !== null) {
      let id = setInterval(tick, delay); // setInterval은 호출되고 딜레이된 후 callback 함수 실행
      return () => clearInterval(id);
    }
  }, [delay]);
  return savedCallback.current;
}

export default useInterval;
