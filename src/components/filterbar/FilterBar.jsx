import React from "react";
import Multiselect from "multiselect-react-dropdown";
import "./FilterBar.css";

const FilterBar = (event) => {
  const onSelect = (selectedList, selectedItem) => {
    console.log("on select", selectedItem);
    console.log("selected list", selectedList);
  };

  return (
    <div>
      <Multiselect
        className="multiselect"
        displayValue="key"
        onKeyPressFn={function noRefCheck() {}}
        onRemove={function noRefCheck() {}}
        onSearch={function noRefCheck() {}}
        onSelect={onSelect}
        // selectedValues={selectedValue}
        options={[
          {
            cat: "Group 1",
            key: "Female",
          },
          {
            cat: "Group 1",
            key: "Male",
          },
          {
            cat: "Group 1",
            key: "Domestic Short Hair",
          },
          {
            cat: "Group 2",
            key: "Domestic Medium Hair",
          },
          {
            cat: "Group 2",
            key: "Domestic Long Hair",
          },
          {
            cat: "Group 2",
            key: "Baby",
          },
          {
            cat: "Group 2",
            key: "Young",
          },
          {
            cat: "Group 2",
            key: "Adult",
          },
          {
            cat: "Group 2",
            key: "Senior",
          },
        ]}
        showCheckbox
      />
    </div>
  );
};

export default FilterBar;
