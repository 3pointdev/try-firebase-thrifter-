import { AddressList } from "components/navigation/filter";
import { ChangeEventHandler } from "react";
import { AddressDto } from "src/dto/address.dto";
import FilterModel from "src/models/filter.model";
interface IProps {
  addressList: AddressList;
  onChange: ChangeEventHandler;
  selectedList: FilterModel;
}
export default function AddressSelector({
  selectedList,
  addressList,
  onChange,
}: IProps) {
  return (
    <>
      {!selectedList.sido?.name
        ? addressList.sidoList.map((sido: AddressDto) => {
            return (
              <li
                className="text-[12px] whitespace-nowrap flex items-center gap-1"
                key={sido.code}
              >
                <input
                  id={sido.code}
                  type="radio"
                  checked={selectedList.sido === sido}
                  onChange={onChange}
                  data-type="sido"
                />
                <label htmlFor={sido.code}>{sido.name}</label>
              </li>
            );
          })
        : !selectedList.gungu?.name
        ? addressList.gunguList.map((gungu: AddressDto) => {
            return (
              <li
                className="text-[12px] whitespace-nowrap flex items-center gap-1"
                key={gungu.code}
              >
                <input
                  id={gungu.code}
                  type="radio"
                  checked={selectedList.gungu === gungu}
                  onChange={onChange}
                  data-type="gungu"
                />
                <label htmlFor={gungu.code}>{gungu.name}</label>
              </li>
            );
          })
        : addressList.dongList.map((dong: AddressDto) => {
            const isChecked = selectedList.dong.find(
              (data: AddressDto | undefined) => data?.code === dong.code
            )
              ? true
              : false;
            return (
              <li
                className="text-[12px] whitespace-nowrap flex items-center gap-1"
                key={dong.code}
              >
                <input
                  id={dong.code}
                  type="checkbox"
                  data-type="dong"
                  checked={isChecked}
                  onChange={onChange}
                />
                <label htmlFor={dong.code}>{dong.name}</label>
              </li>
            );
          })}
    </>
  );
}
