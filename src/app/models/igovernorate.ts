import { ICity } from "./icity";

export interface IGovernorate {

    id:number
    name: string

    cities: ICity[];
}
