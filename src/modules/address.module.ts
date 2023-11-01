import axios, { Axios, AxiosResponse } from "axios";
import { plainToInstance } from "class-transformer";
import { AddressDto, RegcodeDto } from "src/dto/address.dto";

export class AddressModule {
  public api: Axios = axios.create({
    baseURL: "https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app",
  });

  public getData = async (params: any): Promise<RegcodeDto> => {
    return await this.api
      .get("/v1/regcodes", { params: params })
      .then((result: AxiosResponse<RegcodeDto>) => {
        return result.data;
      });
  };

  public sido = async (): Promise<RegcodeDto> => {
    return plainToInstance(
      RegcodeDto,
      await this.getData({ regcode_pattern: "*00000000" })
    );
  };

  public gungu = async (sidoCode: string): Promise<RegcodeDto> => {
    const data = await this.getData({
      regcode_pattern: `${sidoCode.slice(0, 2)}*00000`,
    });
    const sido = data.regcodes.shift();
    const customData = data.regcodes.map((gungu: AddressDto) => {
      return {
        code: gungu.code,
        name: gungu.name.replace(`${sido?.name} `, ""),
      };
    });
    customData.unshift({ code: "00000000", name: `${sido?.name} 전체` });

    return plainToInstance(RegcodeDto, { regcodes: customData });
  };

  public dong = async (gunguCode: string): Promise<RegcodeDto> => {
    console.log(gunguCode);
    const data = await this.getData({
      regcode_pattern: `${gunguCode.slice(0, 4)}*`,
    });
    const gungu = data.regcodes.shift();
    const customData = data.regcodes.map((dong: AddressDto) => {
      return {
        code: dong.code,
        name: dong.name.replace(`${gungu?.name} `, ""),
      };
    });
    customData.unshift({
      code: "00000000",
      name: `${gungu?.name.split(" ")[1]} 전체`,
    });

    return plainToInstance(RegcodeDto, { regcodes: customData });
  };
}
