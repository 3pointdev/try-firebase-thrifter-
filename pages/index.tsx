import Filter from "components/navigation/filter";
import {
  QueryDocumentSnapshot,
  QuerySnapshot,
  collection,
  getDocs,
} from "firebase/firestore";
import { NextRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import fireStore from "src/firebase/fireStore";
import FilterModel from "src/models/filter.model";

interface IPageProps {
  headers: Headers;
  router: NextRouter;
  version: string | number;
}

export default function Home(props: IPageProps) {
  const [filted, setFilted] = useState<FilterModel[]>([]);

  useEffect(() => {
    const getData = async () => {
      await getDocs(collection(fireStore, "/product")).then(
        (result: QuerySnapshot) => {
          result.forEach((collection: QueryDocumentSnapshot) => {
            console.log(collection.data());
          });
        }
      );
    };

    // getData();
  }, []);

  const onChangeFilter = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    console.log(value);
  };

  return (
    <article>
      <Filter onChange={onChangeFilter} selectedList={filted} />
      <section>상품</section>
    </article>
  );
}
