import { configure } from "mobx";
import { IDefaultProps } from "pages/_app";
import ProductViewModel from "src/viewModel/product/product.viewModel";

const isServer = typeof window === "undefined";

let store: any = null;
configure({ enforceActions: "observed" });

export class RootStore {
  //public 뷰모델네임 : 뷰모델타입;
  public productViewModel: ProductViewModel;

  constructor(initialData: IDefaultProps) {
    const initData = Object.assign(initialData, {});
    //this.뷰모델네임 = new 뷰모델(initData);
    this.productViewModel = new ProductViewModel(initData);
  }
}

export default function initializeStore(initData: IDefaultProps) {
  if (isServer) {
    return new RootStore(initData);
  }
  if (store === null) {
    store = new RootStore(initData);
  }

  return store;
}
