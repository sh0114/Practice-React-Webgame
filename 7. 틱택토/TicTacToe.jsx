import React, {
  useState,
  useRef,
  useEffect,
  useReducer,
  useCallback,
} from "react";

import Table from "./table";

const intialState = {
  winner: "",
  turn: "O",
  tableData: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  recentCell: [-1, -1],
};

const SET_WINNER = "SET_WINNER";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_WINNER: {
      // state.winner = action.winner 이렇게 직접 바꾸면 안됨, 새로운 객체를 만들어서 바뀐 값만 바꾸어준다.
      return { ...state, winner: action.winner };
    }
    default:
      return state;
  }
};

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, intialState);
  /*
  const [winner, setWinner] = useState("");
  const [turn, setTurn] = useState("0");
  const [tableData, setTableData] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
*/
  // 부모에서 보이는건 table이지만 우리가 선택하는건 td 컴포넌트임
  // 틱택토게임 - 테이블 - tr - td
  // state가 많아지면 부모~자식 컴포넌트 간 state관리가 힘듦

  //컴포넌트에 넣는 함수들은 useCallback을 쓴다.
  const onClickTable = useCallback(() => {
    console.log("onClickTable");
    dispatch({ type: SET_WINNER, winner: "O" });
    // action을 dispatch함, dispatch할때마다 reducer 실행
    // action을 해석해서 state를 바꿔주는게 reducer
  }, []);

  return (
    <>
      <h1>TicTacToe 게임에 오신걸 환영합니다.</h1>
      <Table onClick={onClickTable} tableData={state.tableData} />
      {state.winner && <div>{state.winner} 님의 승리</div>}
    </>
  );
};

export default TicTacToe;
