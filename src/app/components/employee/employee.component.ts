import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICity } from 'src/app/models/icity';
import { Iemployee } from 'src/app/models/iemployee';
import { IGovernorate } from 'src/app/models/igovernorate';
import { CityService } from 'src/app/shared/services/city.service';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { GovernorateService } from 'src/app/shared/services/governorate.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, OnDestroy{

      employees!: Iemployee[];
      mySubscribe: any;
      constructor(private employeeService: EmployeeService, private activatedRoute: ActivatedRoute,
                  private router: Router) {}




      ngOnInit(): void {
        this.mySubscribe = this.employeeService.getAllEmployees().subscribe({
          next: (response) => {
            this.employees = response;
          },
          error: (error) => {
            console.log(error);
          },
        });
      }
    
      ngOnDestroy(): void {
        this.mySubscribe.unsubscribe();
      }


      deleteHandler(employeeId: string) {
          Swal.fire({
            title: 'هل أنت متأكد؟',
            text: 'لن تتمكن من استرجاع هذا الفرع بعد حذفه!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'نعم، احذفه!',
            cancelButtonText: 'إلغاء',
          }).then((result:any) => {
            if (result.isConfirmed) {
              this.employeeService.deleteEmployee(employeeId).subscribe(() => {
                this.employees = this.employees.filter(
                  (employee) => employee .id != employeeId
                );
                Swal.fire('تم الحذف!', 'تم حذف الفرع بنجاح.', 'success');
              });
            }
          });
        }
  
}
