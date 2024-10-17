const React = require("react");
const { useState, useRef } = React;

const WordRelay = () => {
  const [word, setWord] = useState("여름이");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const InputRef = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (word[word.length - 1] === value[0]) {
      setResult("딩동댕!");
      setWord(value);
      setValue("");
      InputRef.current.focus;
    } else {
      setResult("땡땡땡~~!");
      setValue("");
      InputRef.current.focus;
    }
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <label htmlFor="wordInput">"글자를 입력하세요!"</label>
        <input
          id="wordInput"
          className="wordInput"
          ref={InputRef}
          value={value}
          onChange={onChangeInput}
        />
        {/** uncotroled input -> 단순 입력하여 submit만 하는경우,
         * uncontroled input에서 초기값을 넣고 싶은경우 defaultValue 만 허용
         * 대부분은 onChange 함수 활용하여 입력값을 control한다.
         * onSubmit 함수에서 e.target.children.word.value 으로 value 대체*/}
        <button>입력하기!</button>
      </form>
      <div>{result}</div>
    </>
  );
};

module.exports = WordRelay;
