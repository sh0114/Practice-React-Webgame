const React = require("react");
const { Component, useState, useRef } = React;

const GuGuDan = () => {
  const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
  // const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = useState("");
  const [result, setResult] = React.useState("");
  const InputRef = useRef(null);

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (parseInt(value) === first * second) {
      setResult("정답!" + value);
      setFirst(Math.ceil(Math.random() * 9));
      setSecond(Math.ceil(Math.random() * 9));
      setValue("");
      InputRef.current.focus;
    } else {
      setResult("땡!!!");
      setValue("");
      InputRef.current.focus;
    }
  };

  return (
    <div>
      <div>함수컴포넌트 채성히 제작 </div>
      <div>
        {" "}
        {first} 곱하기 {second} 는?{" "}
      </div>
      <form onSubmit={onSubmitForm}>
        <input
          ref={InputRef}
          type="number"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <button type="submit"> 제출하기 </button>
      </form>
      <div id="result">{result}</div>
    </div>
  );
};

module.exports = GuGuDan;
