import Filter from "components/navigation/filter";
import ProductList from "components/product/productList";
import { NextRouter } from "next/router";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { AddressDto } from "src/dto/address.dto";
import FilterModel from "src/models/filter.model";
import { AddressModule } from "src/modules/address.module";

interface IPageProps {
  headers: Headers;
  router: NextRouter;
  version: string | number;
}

export default function Home(props: IPageProps) {
  const addressModule = new AddressModule();
  const [filted, setFilted] = useState<FilterModel>(new FilterModel());
  const [sidoList, setSidoList] = useState<AddressDto[]>([]);
  const [gunguList, setGunguList] = useState<AddressDto[]>([]);
  const [dongList, setDongList] = useState<AddressDto[]>([]);

  useEffect(() => {
    // const getData = async () => {
    //   await getDocs(collection(fireStore, "/product")).then(
    //     (result: QuerySnapshot) => {
    //       result.forEach((collection: QueryDocumentSnapshot) => {
    //         console.log(collection.data());
    //       });
    //     }
    //   );
    // };

    const initialize = async () => {
      const sidoAddress = await addressModule.sido();
      setSidoList(sidoAddress.regcodes);
    };
    initialize();
  }, []);

  const onClickInitializeFilter = (event: MouseEvent<HTMLInputElement>) => {
    const { id } = event.currentTarget.dataset;

    if (id === "price") {
      setFilted({ ...filted, min: 0, max: 1000000 });
    } else {
      setFilted({
        ...filted,
        sido: new AddressDto(),
        gungu: new AddressDto(),
        dong: [],
      });
    }
  };

  const onChangePrice = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, id } = event.target;

    switch (id) {
      case "min":
        if (+value <= filted.max - 10000) {
          setFilted({ ...filted, min: Math.floor(+value / 10000) * 10000 });
        }
        break;
      case "max":
        if (+value >= filted.min + 10000) {
          setFilted({ ...filted, max: Math.floor(+value / 10000) * 10000 });
        }
        break;
      case "input_min":
        if (+value <= 990000) {
          if (+value < filted.max) {
            setFilted({ ...filted, min: +value });
          } else {
            setFilted({ ...filted, min: +value, max: +value + 10000 });
          }
        }
        break;
      case "input_max":
        if (+value >= 10000) {
          if (+value > filted.min) {
            setFilted({ ...filted, min: +value });
          } else {
            setFilted({ ...filted, max: +value, min: +value - 10000 });
          }
        }
        break;
    }
  };

  const onChangeAddress = async (event: ChangeEvent<HTMLInputElement>) => {
    const { id, dataset, checked } = event.target;

    let target;
    switch (dataset.type) {
      case "sido":
        target = sidoList.find((sido) => sido.code === id);
        const gunguAddress = await addressModule.gungu(id);
        setGunguList(gunguAddress.regcodes);
        setFilted({ ...filted, sido: target });
        break;
      case "gungu":
        target = gunguList.find((gungu) => gungu.code === id);
        const dongAddress = await addressModule.dong(id);
        setDongList(dongAddress.regcodes);
        setFilted({ ...filted, gungu: target });
        break;
      case "dong":
        target = dongList.find((dong) => dong.code === id);
        if (checked) {
          if (
            target?.code === "00000000" ||
            filted.dong.find((dong) => dong?.code === "00000000")
          ) {
            setFilted({ ...filted, dong: [target] });
          } else {
            setFilted({ ...filted, dong: [...filted.dong, target] });
          }
        } else {
          setFilted({
            ...filted,
            dong: filted.dong.filter((dong) => dong?.code !== id),
          });
        }

        break;
    }
  };

  const onClickDeleteOption = (event: MouseEvent<HTMLButtonElement>) => {
    const { value } = event.currentTarget;

    switch (value) {
      case "all":
        setFilted(new FilterModel());
        break;
      case "price":
        setFilted({ ...filted, min: 0, max: 1000000 });
        break;
      case "sido":
        setFilted({ ...filted, sido: new AddressDto() });
        break;
      case "gungu":
        setFilted({ ...filted, gungu: new AddressDto() });
        break;
      default:
        setFilted({
          ...filted,
          dong: filted.dong.filter(
            (dong: AddressDto | undefined) => dong?.code !== value
          ),
        });

        break;
    }
  };

  return (
    <article>
      <Filter
        addressList={{ sidoList, gunguList, dongList }}
        onChangePrice={onChangePrice}
        onChangeAddress={onChangeAddress}
        onClick={onClickInitializeFilter}
        onClickDeleteOption={onClickDeleteOption}
        selectedList={filted}
      />
      <ProductList />
    </article>
  );
}
