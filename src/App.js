import { useEffect, useRef } from "react";
import { useState } from "react";
import Chip from "./Components/Chip";
import { allItems } from "./Utilities/LIst";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const inputRef = useRef(null);
  const chipsWrapper = useRef(null);

  useEffect(() => {
    if (chipsWrapper.current) {
      chipsWrapper.current.scrollLeft = chipsWrapper.current.scrollWidth;
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
      // Handle backspace key press
      if (selectedItems.length > 0 && inputValue) {
        console.log(inputValue, "Backspace key pressed");
      }
    }
  };

  return (
    <div className="w-full pt-20 px-44">
      <div
        className="flex gap-2 items-center border-b border-black px-2 overflow-x-scroll no-scrollbar  w-[50%] "
        ref={chipsWrapper}
      >
        {selectedItems.map((item, index) => (
          <Chip
            handleChipRemove={handleChipRemove}
            item={item}
            index={index}
            isSelected={true}
          />
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type here.."
          ref={inputRef}
          className="border-none outline-none h-[3.5rem] mr-9"
          onKeyDown={handleBackSpace}
        />
      </div>

      {filteredItems.length > 0 && inputValue && (
        <div className="max-h-[16rem] overflow-y-scroll mt-2 shadow-lg bg-slate-50 w-[50%]  no-scrollbar ml-2">
          {filteredItems.map((item, index) => (
            <Chip handleItemClick={handleItemClick} item={item} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
