import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { faRefresh } from "@fortawesome/free-solid-svg-icons/faRefresh";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddressSelector from "components/selector/address";
import MultiRangeSlider from "components/slider/multiRangeSlider";
import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import { AddressDto } from "src/dto/address.dto";
import FilterModel from "src/models/filter.model";

interface IProps {
  addressList: AddressList;
  onChangePrice: ChangeEventHandler;
  // onChangePrice: ({ min, max }: { min: number; max: number }) => void;
  onChangeAddress: ChangeEventHandler;
  selectedList: FilterModel;
  onClick: MouseEventHandler;
}

export interface AddressList {
  sidoList: AddressDto[];
  gunguList: AddressDto[];
  dongList: AddressDto[];
}

export default function Filter({
  addressList,
  onChangePrice,
  onChangeAddress,
  selectedList,
  onClick,
}: IProps) {
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);

  return (
    <section className="border-t border-gray-600 px-4 lg:px-6 py-1 bg-white dark:bg-gray-800 flex items-center h-12 gap-4">
      <button
        className="flex items-center gap-1 border rounded px-2 w-fit bg-white"
        onClick={() => setIsOpenFilter(!isOpenFilter)}
      >
        <FontAwesomeIcon
          icon={faSliders}
          color="black"
          className="text-[14px]"
        />
        <p className="text-black text-[14px]">필터</p>
      </button>
      {(selectedList.min > 0 || selectedList.max < 1000000) && (
        <button className="flex items-center gap-1 border rounded px-2 w-fit bg-white">
          <p className="text-black text-[14px]">{`${selectedList.min}원~${selectedList.max}원`}</p>
        </button>
      )}
      {selectedList.dong.length > 0 ? (
        selectedList.dong.map((filterItem: any, index: number) => {
          return (
            <button
              className="flex items-center gap-1 border rounded px-2 w-fit bg-white"
              key={`selected_item_${index}`}
            >
              <p className="text-black text-[14px]">{filterItem.name}</p>
            </button>
          );
        })
      ) : selectedList.gungu?.name ? (
        <button className="flex items-center gap-1 border rounded px-2 w-fit bg-white">
          <p className="text-black text-[14px]">{selectedList.gungu.name}</p>
        </button>
      ) : (
        selectedList.sido?.name && (
          <button className="flex items-center gap-1 border rounded px-2 w-fit bg-white">
            <p className="text-black text-[14px]">{selectedList.sido.name}</p>
          </button>
        )
      )}
      <div
        className={`fixed top-24 left-2 bg-white border-2 border-gray-600 rounded-md w-[calc(100%-16px)] text-black transition-all ease-in duration-300 py-4 flex flex-col max-h-full overflow-y-scroll ${
          isOpenFilter ? "pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-full h-1/5 border-b px-4">
          <div className="flex items-center justify-between p-2 pt-0">
            <h2 className=" text-base font-semibold">가격</h2>
            <FontAwesomeIcon
              icon={faRefresh}
              onClick={onClick}
              data-id={"price"}
              color="gray"
              className="text-[14px] cursor-pointer"
            />
          </div>
          <MultiRangeSlider
            min={0}
            max={1000000}
            minValue={selectedList.min}
            maxValue={selectedList.max}
            onChange={onChangePrice}
          />
        </div>
        <div className="w-full h-full px-4 pb-[120px]">
          <div className="flex items-center justify-between p-2">
            <h2 className="text-base font-semibold">지역</h2>
            <FontAwesomeIcon
              icon={faRefresh}
              onClick={onClick}
              data-id={"address"}
              color="gray"
              className="text-[14px] cursor-pointer"
            />
          </div>
          <ul className="grid grid-cols-3 gap-2">
            <AddressSelector
              onChange={onChangeAddress}
              selectedList={selectedList}
              addressList={addressList}
            />
          </ul>
        </div>
      </div>
    </section>
  );
}
