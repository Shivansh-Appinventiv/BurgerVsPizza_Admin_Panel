import React from "react";
import Select from "react-select";

export default function DropDown(props) {
  const {
    options,
    setSelectedOption,
    selectedOption,
    containerStyle,
    selectStyle,
    name,
    ...rest
  } = props;

  const handleSelect = (item) => {
    setSelectedOption(item);
    //console.log(item);
  };
  
 // console.log(selectedOption,name);
  return (
    <div className={containerStyle}>
      <Select
        className={selectStyle}
        classNamePrefix={"select"}
        isDisabled={false}
        name={name}
        options={options}
        defaultValue={selectedOption}
        onChange={handleSelect}
        {...rest}
      />
    </div>
  );
}
