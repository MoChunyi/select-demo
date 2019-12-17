import React, { useState } from "react";
import ReactDOM from "react-dom";
import Selector from "./components/selector";
import "./styles.css";

import Select from "./components/selctor2/Selector";
import Options from "./components/selctor2/Options";

const elements = [
  { id: 0, content: "唐僧" },
  { id: 1, content: "沙僧" },
  { id: 2, content: "猪八戒" },
  { id: 3, content: "孙悟空" }
];

function App() {
  const handleOnchange = event => {
    setSelectedResult(event.target.selectedResult);
  };
  const [multiple, setMultiple] = useState(true);
  const [selectedResult, setSelectedResult] = useState([]);

  const displayRender = () => {
    let renderText;
    if (!selectedResult) renderText = "请选择";
    else if (Array.isArray(selectedResult))
      renderText = selectedResult.join(",");
    else renderText = selectedResult;
    return <strong>{renderText}</strong>;
  };
  return (
    <div className="App">
      <Selector elements={elements} />
      <Select
        onChange={handleOnchange}
        selectedResult={selectedResult}
        dispalyRender={displayRender}
      >
        <Options value="唐僧">{"唐僧"}</Options>
        <Options value="沙僧">{"沙僧"}</Options>
        <Options value="猪八戒">{"猪八戒"}</Options>
        <Options value="孙悟空">{"孙悟空"}</Options>
      </Select>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
