import { Type } from "class-transformer";
import SellerDto from "./seller.dto";

export default class Productdto {
  public readonly id: number = 0;
  public readonly title: string = "";
  public readonly thumbImages: string[] = [];
  public readonly price: number = 0;

  @Type(() => SellerDto)
  public readonly author: SellerDto = new SellerDto();
}
