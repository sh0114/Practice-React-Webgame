const React = require("react");
const { Component } = React;

// state가 props가 바뀌어야 렌더링이 된다
// 그런데 setState만 호출해도 렌더링이 되는 상황 발생
// 리액트가 멍청하기 때문에 어떤경우에 렌더링이 되어야하는지 리액트한테 알려줄수 있는 함수가 있음
// shouldComponentUpdate 함수!

class Test extends Component {
  state = {
    counter: 0,
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (this.state.counter !== nextState.counter) {
      return true;
    }
    return false;
  }

  onClick = () => {
    this.setState({});
  };

  render() {
    console.log("렌더링", this.state);
    return (
      <>
        <h1>렌더링 테스트</h1>
        <button onClick={this.onClick}>클릭</button>
      </>
    );
  }
}

module.exports = Test;
