import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEventHandler, useState } from "react";
import FilterModel from "src/models/filter.model";

interface IProps {
  onChange: ChangeEventHandler;
  selectedList: FilterModel[];
}

export default function Filter({ onChange, selectedList }: IProps) {
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);

  return (
    <section className="border-t border-gray-600 px-4 lg:px-6 py-1 bg-white dark:bg-gray-800 flex items-center h-12 gap-4">
      <button
        className="flex items-center gap-1 border rounded px-3 w-fit bg-white"
        onClick={() => setIsOpenFilter(!isOpenFilter)}
      >
        <FontAwesomeIcon icon={faSliders} color="black" className="text-base" />
        <p className="text-black text-base">필터</p>
      </button>
      {selectedList.map((filterItem: FilterModel, index: number) => {
        return (
          <button
            className="flex items-center gap-1 border rounded px-3 w-fit bg-white"
            key={`selected_item_${index}`}
          >
            <FontAwesomeIcon
              icon={faSliders}
              color="black"
              className="text-base"
            />
            <p className="text-black text-base">{filterItem.title}</p>
          </button>
        );
      })}
      <div
        className={`fixed top-24 left-0 bg-white border-2 border-gray-600 rounded-md w-[calc(100%-16px)] text-black transition-all ease-in duration-300 py-4 flex flex-col ${
          isOpenFilter
            ? "h-1/2 pointer-events-auto"
            : "h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-full h-1/5 border-b px-4">
          <h2>가격</h2>
        </div>
        <div className="w-full px-4">
          <h2>지역</h2>
          <ul className="flex white-nowrap">
            <li>강원도</li>
            <li>경기도</li>
            <li>경상남도</li>
            <li>경상북도</li>
            <li>광주광역시</li>
            <li>대구광역시</li>
            <li>대전광역시</li>
            <li>부산광역시</li>
            <li>서울특별시</li>
            <li>세종특별시</li>
            <li>울산광역시</li>
            <li>인천광역시</li>
            <li>전라남도</li>
            <li>전라북도</li>
            <li>제주도</li>
            <li>충청남도</li>
            <li>충청북도</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
