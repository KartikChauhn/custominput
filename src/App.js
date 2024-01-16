import { useEffect, useRef } from "react";
import { useState } from "react";
import Chip from "./Components/Chip";
import { allItems } from "./Utilities/LIst";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [backSpaceCount, setBackspaceCount] = useState(0);
  const inputRef = useRef(null);
  const chipsWrapper = useRef(null);

  useEffect(() => {
    if (chipsWrapper.current) {
      chipsWrapper.current.scrollLeft = chipsWrapper.current.scrollWidth;
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [selectedItems]);

  const updateFilteredItems = () => {
    const filtered = allItems.filter(
      (item) =>
        item.tech.toLowerCase().includes(inputValue.toLowerCase()) &&
        !selectedItems.some((selectedItem) => selectedItem.id === item.id)
    );
    setFilteredItems(filtered);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    updateFilteredItems();
  };

  const handleItemClick = (item) => {
    setSelectedItems([...selectedItems, item]);
    setInputValue("");
    updateFilteredItems();
  };

  const handleChipRemove = (itemToRemove) => {
    const updatedItems = selectedItems.filter((item) => item !== itemToRemove);
    setSelectedItems(updatedItems);
    updateFilteredItems();
  };

  const handleBackSpace = (e) => {
    if (e.key === "Backspace") {
      if (selectedItems.length > 0 && !inputValue) {
        console.log("back space presssssssssssssssssssssssss");
        if (backSpaceCount === 0) {
          setBackspaceCount(1);
        } else {
          handleChipRemove(selectedItems[selectedItems.length - 1]);
          setBackspaceCount(0);
        }
        console.log(inputValue, "Backspace key pressed");
      }
    }
  };

  return (
    <div className="w-full pt-20 px-4 sm:px-24 flex flex-col sm:flex-row">
      <div className="sm:w-[50%] p-4 sm:pr  -20">
        <p>
          Kartik Chauhan's multi-select component is a stylish and user-friendly
          React solution. It offers a seamless experience for selecting multiple
          items with dynamic filtering and smooth chip animations.{" "}
        </p>
      </div>
      <div className=" mt-8 sm:mt-0 sm:w-[50%]">
        <div
          className="flex gap-2 items-center border-b border-black px-2 overflow-x-scroll no-scrollbar w-full  "
          ref={chipsWrapper}
        >
          {selectedItems.map((item, index) => (
            <Chip
              handleChipRemove={handleChipRemove}
              item={item}
              index={index}
              isSelected={true}
              highlight={
                selectedItems.length - 1 === index && backSpaceCount === 1
              }
            />
          ))}
          <input
            type="text"
            autoFocus
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type here.."
            ref={inputRef}
            className="border-none outline-none h-[3.5rem] mr-9 "
            onKeyDown={handleBackSpace}
          />
        </div>

        {filteredItems.length > 0 && inputValue && (
          <div className="max-h-[16rem] overflow-y-scroll mt-2 shadow-lg bg-slate-50 w-full no-scrollbar sm:ml-2">
            {filteredItems.map((item, index) => (
              <Chip
                handleItemClick={handleItemClick}
                item={item}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
