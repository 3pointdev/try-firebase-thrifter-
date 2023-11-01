import { Type } from "class-transformer";

export class AddressDto {
  public readonly code: string = "";
  public readonly name: string = "";
}

export class RegcodeDto {
  @Type(() => AddressDto)
  public readonly regcodes: AddressDto[] = [];
}
