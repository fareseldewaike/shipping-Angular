import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IBranch } from 'src/app/models/ibranch';
import { ICity } from 'src/app/models/icity';
import { IGovernorate } from 'src/app/models/igovernorate';
import { BranchService } from 'src/app/shared/services/branch.service';
import { CityService } from 'src/app/shared/services/city.service';
import { GovernorateService } from 'src/app/shared/services/governorate.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { OrderType, ShippingType, PaymentType } from 'src/app/OrderData/order-data.constants'
import { IMerchant } from 'src/app/models/imerchants';
import { MerchantService } from 'src/app/shared/services/merchant.service';


// interface Product {
//   id: number;
//   name: string;
//   quantity: number;
//   weight: number;
// }

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})

export class AddOrderComponent implements OnInit {
// saveProduct() {
// throw new Error('Method not implemented.');
// }
  // orderForm!: FormGroup;
  // products: Product[] = [];

  // Mock data for dropdowns
 

//   shippingTypes = ['شحن سريع', 'شحن عادي'];
//   paymentTypes = ['دفع عند الاستلام', 'دفع إلكتروني', 'تحويل بنكي'];
//   productsList = ['تيشيرت', 'بنطلون', 'حذاء', 'قميص', 'جاكيت'];
// productformm: any;


  orderId: any;

  branches: IBranch[] = [];
  governs: IGovernorate[] = [];
  cities: ICity[] = [];
  merchants: IMerchant[] = [];
  
  orderTypeList = OrderType;
  shippingTypeList = ShippingType;
  paymentTypeList = PaymentType;




  constructor(private fb: FormBuilder, private orderService: OrderService, private branchService: BranchService,
              private governService: GovernorateService, private cityService: CityService,
              private merchantService : MerchantService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {}




   orderFormm = new FormGroup({
      clientName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      firstPhoneNumber:  new FormControl('', [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
      secondPhoneNumber: new FormControl('', [ Validators.pattern(/^01[0125][0-9]{8}$/)]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      OrderType: new FormControl('', [Validators.required]),
      

      governorateId: new FormControl(''),
      CityId: new FormControl(''),
      BranchId: new FormControl('', Validators.required),
      MerchantId: new FormControl('', Validators.required),
      // ????
      deliverToVillage: new FormControl<boolean | null>(null, Validators.required),


      shippingType: new FormControl('', [Validators.required]),
      paymentType: new FormControl('', Validators.required),


      products: new FormArray([]),

        
      orderTotalWeight: new FormControl('', [Validators.required]),
      orderCost: new FormControl('', [Validators.required]),
      notes: new FormControl(''),


      //merchantPhone??
      street: new FormControl('', [Validators.required]),

      
  
      
    });           


     
              
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.orderId = params.get('id');
        this.getclientName.setValue('');
        this.getEmail.setValue('');
        this.getOrderType.setValue('');
        this.getdeliverToVillage.setValue(null);
        this.getfirstPhoneNumber.setValue('');
        this.getorderCost.setValue('');
        this.getorderTotalWeight.setValue('');
        this.getordernotes.setValue('');
        this.getorderstreet.setValue('');
        this.getsecondPhoneNumber.setValue('');
      
        // this.getPrice.setValue('');
      },
    });
  


    this.governService.getAllGoverns().subscribe({
      next: (response) => {
        this.governs = response;
      },
      error: () => {}
    });

    this.cityService.getAllCities().subscribe({
      next: (response) => {
        this.cities = response;
      },
      error: () => {}
    });

    this.branchService.getAllBranches().subscribe({
      next: (response) => {
        this.branches = response;
      },
      error: () => {}
    });

    this.merchantService.getAllMerchants().subscribe({
      next: (response) => {
        this.merchants = response;
      },
      error: () => {}
    });
    
  }

  onStatusChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.getdeliverToVillage.setValue(target.checked);
  }

  get getclientName() {
    return this.orderFormm.controls['clientName'];
  } 
  get getfirstPhoneNumber() {
    return this.orderFormm.controls['firstPhoneNumber'];
  } 
  get getsecondPhoneNumber() {
    return this.orderFormm.controls['secondPhoneNumber'];
  } 
  get getEmail() {
    return this.orderFormm.controls['Email'];
  }
  get getOrderType() {
    return this.orderFormm.controls['OrderType'];
  }

  get getBranchId() {
    return this.orderFormm.controls['BranchId'];
  }
  get getGovernId() {
    return this.orderFormm.controls['governorateId'];
  }
  get getCityId() {
    return this.orderFormm.controls['CityId'];
  }
  get getMerchantId() {
    return this.orderFormm.controls['MerchantId'];
  }

  get getdeliverToVillage() {
    return this.orderFormm.controls['deliverToVillage'];
  }
  get getshippingType() {
    return this.orderFormm.controls['shippingType'];
  }
  get getpaymentType() {
    return this.orderFormm.controls['paymentType'];
  }
  get getorderTotalWeight() {
    return this.orderFormm.controls['orderTotalWeight'];
  }
  get getorderCost() {
    return this.orderFormm.controls['orderCost'];
  }
  get getordernotes() {
    return this.orderFormm.controls['notes'];
  }
  get getorderstreet() {
    return this.orderFormm.controls['street'];
  }
  

  get GETproducts(): FormArray {
    return this.orderFormm.get('products') as FormArray;
  }
  


  addProducts() {
    const group = new FormGroup({
      name: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      weight: new FormControl('', Validators.required),
    });
    this.GETproducts.push(group);
    this.updateTotalWeightd();
  }

  removeproduct(index: number) {
    this.GETproducts.removeAt(index);
    this.updateTotalWeightd();
  }
  

  onGovernorateChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const govId = Number(selectElement.value);
  
    const selectedGov = this.governs.find(g => g.id === govId);
    this.cities = selectedGov ? selectedGov.cities : [];
  }


  // initForm(): void {
  //   this.orderForm = this.fb.group({
  //     // Customer details
  //     customerName: ['', Validators.required],
  //     phone: ['', Validators.required],
  //     phone2: [''],
  //     email: ['', Validators.email],
  //     deliveryType: ['', Validators.required],

  //     // Address details
  //     governorate: ['', Validators.required],
  //     city: ['', Validators.required],
  //     village: ['', Validators.required],
  //     isVillageDelivery: [false],
  //     branch: ['القاهرة', Validators.required],

  //     // Shipping details
  //     shippingType: ['', Validators.required],
  //     paymentType: ['', Validators.required],

  //     // Order details
  //     totalWeight: [{ value: '0', disabled: true }],
  //     orderCost: ['', Validators.required],
  //     notes: [''],

  //     // Merchant details
  //     merchantPhone: ['01245789568', Validators.required],
  //     merchantAddress: ['sadsdsaaa', Validators.required]
  //   });

  //   // Listen for governorate changes to update cities
  //   this.orderForm.get('governorate')?.valueChanges.subscribe(governorate => {
  //     this.orderForm.get('city')?.setValue('');
  //     // Additional logic if needed
  //   });
  // }

  

 
  

  // addProduct(): void {
  //   // Logic to add a product
  //   // Show modal or add directly to the table
  // }

  // removeProduct(index: number): void {
  //   this.products.splice(index, 1);
  //   this.updateTotalWeight();
  // }

  // updateTotalWeight(): void {
  //   const totalWeight = this.GETproducts.reduce((sum, product) => sum + product.weight * product.quantity, 0);
  //   this.orderFormm.get('totalWeight')?.setValue(totalWeight.toString());
  // }

  updateTotalWeightd(): void {
    const totalWeight = this.GETproducts.controls.reduce((sum, group: any) => {
      const weight = group.get('weight')?.value || 0;
      const quantity = group.get('quantity')?.value || 0;
      return sum + (weight * quantity);
    }, 0);
  
    this.orderFormm.get('orderTotalWeight')?.setValue(totalWeight.toString());
  }
  
  



  onSubmit(): void {
    console.log('Form Data:', this.orderFormm.value);      
    console.log('Form Valid:', this.orderFormm.valid);
  
    if (this.orderFormm.valid) {
      const rawData = this.orderFormm.value;
  
      const orderData = {
        id: 0,
        clientName: rawData.clientName,
        firstPhoneNumber: rawData.firstPhoneNumber,
        secondPhoneNumber: rawData.secondPhoneNumber || '',
  
        email: rawData.Email, 
        paymentType: Number(rawData.paymentType),
        orderType: Number(rawData.OrderType),
        orderStatus: 0, 
  
        cityId: Number(rawData.CityId),
        governorateId: Number(rawData.governorateId),
        shippingType: Number(rawData.shippingType),
        branchId: Number(rawData.BranchId),
        deliverToVillage: rawData.deliverToVillage === true, 
        
        products: Array.isArray(rawData.products) 
          ? rawData.products.map((p: any) => ({
              name: p.name,
              quantity: Number(p.quantity),
              weight: Number(p.weight)
            })) : [],
  
        orderTotalWeight: Number(rawData.orderTotalWeight),
        orderCost: Number(rawData.orderCost),
        merchantId: rawData.MerchantId,  
        notes: rawData.notes,
        street: rawData.street
      };
  
      console.log('Data to be sent to backend:', JSON.stringify(orderData, null, 2));
  
      if (this.orderId == 0) {
        this.orderService.addNewOrder(orderData).subscribe({
          next: () => {
            this.router.navigate(['/Order']);
          },
          error: (err) => {
            console.log('Error from server:', err);
            if (err.status === 400 && err.error?.errors) {
              console.log('Validation errors:', err.error.errors);
            }
          }
        });
      }
    } else {
      console.log('invalid data');
      Object.keys(this.orderFormm.controls).forEach(key => {
        this.orderFormm.get(key)?.markAsTouched();
      });
    }
  }

}
