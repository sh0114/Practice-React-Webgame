const React = require("react");
const { PureComponent } = React;

// state가 props가 바뀌어야 렌더링이 된다
// 그런데 setState만 호출해도 렌더링이 되는 상황 발생
// 리액트가 멍청하기 때문에 어떤경우에 렌더링이 되어야하는지 리액트한테 알려줄수 있는 함수가 있음
// shouldComponentUpdate 함수! ->>> 이걸 알아서 구현한 게 PureComponent
// PureComponent의 단점은 배열이나 객체 등 복잡한 값이있으면 얘도 판단하기
// -> 항상 새로운 배열 ...this.state.array을 통해 새로운 객체나 배열을 만들어야함
// {a : 1}에서 setState로 {a : 1}을 하면 새로 렌더링 되므로 state에는 웬만하면 객체구조를 안쓰는 것이 좋음

// +)) 부모 컴포넌트가 렌더링되어도 자식 컴포넌트가 같이 렌더링 되어 억울함
// purecomponent가 이것을 막아줌
// 그런데, purecomponent는 class에만해당함 -> 함수컴포넌트에는 리액트에서 제공하는 memo라는 기능이 있음!

// 성능문제 있을때만써도 무방하다
class Test extends PureComponent {
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
