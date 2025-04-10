import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICity } from 'src/app/models/icity';
import { IGovernorate } from 'src/app/models/igovernorate';
import { CityService } from 'src/app/shared/services/city.service';
import { GovernorateService } from 'src/app/shared/services/governorate.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit , OnDestroy{
  governorates: IGovernorate[] = [];
  selectedCities: ICity[] = [];

  mySubscribe: any;

  constructor(private governorateService: GovernorateService, private cityService: CityService) {}


  ngOnInit(): void {
    this.mySubscribe = this.governorateService.getAllGoverns().subscribe({
      next: (response) => {
        this.governorates = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }



  ngOnDestroy(): void {
    this.mySubscribe.unsubscribe();
  }
  

  getGovernorateNameByCityId(cityId: number): string {
    const gov = this.governorates.find(g => g.cities.some(c => c.id === cityId));
    return gov ? gov.name : '';
  }
  

  onGovernorateChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const govId = Number(selectElement.value);
  
    const selectedGov = this.governorates.find(g => g.id === govId);
    this.selectedCities = selectedGov ? selectedGov.cities : [];
  }
  

  deleteHandler(cityId: number) {
    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: 'لن تتمكن من استرجاع هذه المدينة بعد حذفها!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'نعم، احذفه!',
      cancelButtonText: 'إلغاء',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cityService.deleteCity(cityId.toString()).subscribe({
          next: () => {
            // تحديث قائمة المدن المعروضة
            this.selectedCities = this.selectedCities.filter(city => city.id !== cityId);
  
            // تحديث قائمة المحافظات المرتبطة
            this.governorates.forEach(gov => {
              gov.cities = gov.cities.filter(city => city.id !== cityId);
            });
  
            Swal.fire('تم الحذف!', 'تم حذف المدينة بنجاح.', 'success');
          },
          error: () => {
            Swal.fire('فشل في الحذف!', 'حدث خطأ أثناء الحذف.', 'error');
          }
        });
      }
    });
  }
  
  




}
