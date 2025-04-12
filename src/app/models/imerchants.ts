export interface IMerchant {
   
    id: string;  
    name: string;
    email: string;
    phone: string | null;
    returnerPercent: number;
    branchName: string;
    storeName: string;
    governateName: string | null;
   
    merchantName?: string;
    address: string;
    password: string;
    phoneNumber: string;
    pickUp: number;
    branchId: number;
    cityId: number;
    governorateId: number;
    specialPrices: {
      price: number;
      governorateId: number;
      cityId: number;
    }[];
  }
  