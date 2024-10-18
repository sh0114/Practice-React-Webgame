const React = require("react");

const Try = ({ tryInfo, index }) => {
  return (
    <>
      <li key={`${index + 1}회 시도`}>
        <b>{tryInfo.try}</b> : {tryInfo.result}
      </li>
    </>
  );
};

module.exports = Try;
