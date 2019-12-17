import React, { useState, useEffect } from "react";
import "./index.css";

const OptionItem = ({ content, handleSelectClick }) => {
  return (
    <div
      className="selector_options-item"
      onClick={() => handleSelectClick(content)}
    >
      {content}
    </div>
  );
};

const Selector = ({ elements = [] }) => {
  const [visiableToggle, setVisiableToggle] = useState(false);
  const [visiableClassExp, setVisiableClassExp] = useState("close");
  const [selectedItem, setSelectedItem] = useState("选择一个元素");
  useEffect(() => {
    if (visiableToggle) setVisiableClassExp("open");
    else setVisiableClassExp("close");
  }, [visiableToggle]);

  const handleSelectClick = content => {
    setSelectedItem(content);
  };

  return (
    <div
      className="selector"
      onClick={() => setVisiableToggle(value => !value)}
    >
      <div>{selectedItem}</div>
      <div className={`selector_options selector_options__${visiableClassExp}`}>
        {elements.map(el => (
          <OptionItem
            content={el.content}
            handleSelectClick={handleSelectClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Selector;
