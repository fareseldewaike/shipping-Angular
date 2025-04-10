import { IGovernorate } from "./igovernorate";

export interface ICity {

    id: number;
    name: string;
    price: number;
    pickup: number;
    governorateId: number;
    governorate?: IGovernorate;


}
