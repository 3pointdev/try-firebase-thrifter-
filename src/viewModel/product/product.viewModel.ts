import { plainToInstance } from "class-transformer";
import { makeObservable, observable, runInAction } from "mobx";
import { IDefaultProps } from "pages/_app";
import Productdto from "src/dto/product/product.dto";

export default class ProductViewModel {
  public list: Productdto[] = [];
  constructor(props: IDefaultProps) {
    makeObservable(this, {
      list: observable,
    });
  }

  initialize = () => {
    runInAction(() => {
      this.list = [...Array(20)].map((item, index) => {
        return plainToInstance(Productdto, {
          id: index,
          title: `item_${index}`,
          thumbImages: [`https://source.unsplash.com/collection/${index}`],
          price: Math.floor(Math.random() * 1000),
          author: {
            id: index,
            name: "seller",
          },
        });
      });
    });
  };
}
