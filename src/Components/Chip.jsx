import React from "react";

const Chip = ({
  item,
  index,
  handleItemClick,
  isSelected,
  handleChipRemove,
  highlight,
}) => {
  return (
    <div
      key={index}
      onClick={() => {
        if (!isSelected) handleItemClick(item);
      }}
      className={`${
        isSelected ? " rounded-full bg-slate-200" : "cursor-pointer"
      } flex gap-2 items-center p-2 transition-all ${
        highlight && " bg-red-200"
      } `}
    >
      <div className="rounded-full bg-green-700 w-[2rem] h-[2rem] flex justify-center items-center">
        {" "}
        {item.icon}
      </div>
      <p className="whitespace-nowrap">{item?.tech}</p>
      {isSelected && (
        <span
          onClick={() => handleChipRemove(item)}
          className="px-2 cursor-pointer"
        >
          X
        </span>
      )}
    </div>
  );
};

export default Chip;
