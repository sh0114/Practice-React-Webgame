const React = require("react");
const { Component } = React;

class WordRelay extends Component {
  state = {
    word: "여름",
    value: "",
    result: "",
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
      this.setState({
        result: "딩동댕",
        word: value,
        value: "",
      });
    } else {
      this.setState({
        result: "땡땡땡",
        value: "",
      });
    }
  };

  onChange = (e) => {
    this.setState({ value: e.target.value });
  };

  onRefInput = (c) => {
    this.input = c;
  };

  render() {
    return (
      <>
        <div>{this.state.word}</div>
        <form onSubmit={this.onSubmitForm}>
          <input
            ref={this.onRefInput}
            value={this.state.value}
            onChange={this.onChangeInput}
          />
          <button>입력하기!</button>
        </form>
        <div>{result}</div>
      </>
    );
  }
}

module.exports = WordRelay;
