import Filter from "components/navigation/filter";
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

    if (id === "min" && +value <= filted.max - 10000) {
      setFilted({ ...filted, min: Math.floor(+value / 10000) * 10000 });
    } else if (id === "max" && +value >= filted.min + 10000) {
      setFilted({ ...filted, max: Math.floor(+value / 10000) * 10000 });
    }
  };

  const onChangeAddress = async (event: ChangeEvent<HTMLInputElement>) => {
    const { id, dataset, checked } = event.target;
    console.log(checked);

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

  return (
    <article>
      <Filter
        addressList={{ sidoList, gunguList, dongList }}
        onChangePrice={onChangePrice}
        onChangeAddress={onChangeAddress}
        onClick={onClickInitializeFilter}
        selectedList={filted}
      />
      <section>상품</section>
    </article>
  );
}
