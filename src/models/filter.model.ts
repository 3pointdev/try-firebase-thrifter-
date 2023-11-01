import { AddressDto } from "src/dto/address.dto";

export default class FilterModel {
  public min: number = 0;
  public max: number = 1000000;
  public sido: AddressDto | undefined = new AddressDto();
  public gungu: AddressDto | undefined = new AddressDto();
  public dong: (AddressDto | undefined)[] = [];
}
