import React, { useState, useEffect } from "react";
import clsx from "clsx";
const Select = ({
  children,
  onChange,
  multiple = true,
  selectedResult,
  dispalyRender
}) => {
  const [visiableToggle, setVisiableToggle] = useState(false);
  const [visiableClassExp, setVisiableClassExp] = useState("close");

  useEffect(() => {
    if (visiableToggle) setVisiableClassExp("open");
    else setVisiableClassExp("close");
  }, [visiableToggle]);

  const handleSelectClick = child => event => {
    console.log("select");
    let newSelectedResult;
    if (multiple) {
      if (!Array.isArray(selectedResult)) {
        alert("多选时， selectedResult 必须是一个数组");
        return;
      }
      newSelectedResult = [...selectedResult];
      let itemIndex = selectedResult.indexOf(child.props.value);
      if (itemIndex !== -1) newSelectedResult.splice(itemIndex, 1);
      else {
        newSelectedResult.push(child.props.value);
      }
    } else {
      newSelectedResult = child.props.value;
    }

    if (onChange) {
      event.persist();
      Object.defineProperty(event, "target", {
        writable: true,
        value: {
          selectedResult: newSelectedResult
        }
      });
      onChange(event, child);
    }
  };

  useEffect(() => {
    let data = [];
    children.forEach(option => {
      data.push({ value: option.props.value, text: option.props.children });
    });
  }, [children]);

  const items = React.Children.map(children, child => {
    let selected;
    if (multiple) {
      selected = selectedResult.some(value => value === child.props.value);
    } else {
      selected = selectedResult === child.props.value;
    }
    return React.cloneElement(child, {
      data_value: child.props.value,
      onClick: handleSelectClick(child),
      className: clsx(child.props.className, selected && "selected")
    });
  });

  return (
    <div
      className="selector"
      onClick={() => setVisiableToggle(value => !value)}
    >
      <div>{dispalyRender()}</div>
      <div className={`selector_options selector_options__${visiableClassExp}`}>
        {items}
      </div>
    </div>
  );
};

export default Select;
