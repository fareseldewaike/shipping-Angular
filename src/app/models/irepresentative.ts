export interface IRepresentative {

    id: string;
    name: string;
    phone: string;
    email: string;
    password: string;
    amount: number;
    address: string;
    governorates: {
    name: string;
    id:number;
    }[];

    brancheName: string;


}
