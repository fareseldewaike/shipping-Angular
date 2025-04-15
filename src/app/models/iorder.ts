export interface IOrder {

   id: number; 
    clientName: string;
    firstPhoneNumber: string;
    secondPhoneNumber: string;
    email: string;
    paymentType: number;
    orderType: number;
    orderStatus: number;
    cityId: number;
    governorateId: number;
    shippingType: number;
    branchId: number;
    deliverToVillage: boolean;
    products: {
      name: string;
      quantity: number;
      weight: number;
    }[];
    orderTotalWeight: number;
    orderCost: number;
    merchantId: string;
    notes: string;
    street: string;
}
