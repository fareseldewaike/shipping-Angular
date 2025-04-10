import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IGovernorate } from 'src/app/models/igovernorate';
import { GovernorateService } from 'src/app/shared/services/governorate.service';
import Swal from 'sweetalert2';
import * as bootstrap from 'bootstrap';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-governorate',
  templateUrl: './governorate.component.html',
  styleUrls: ['./governorate.component.css']
})
export class GovernorateComponent implements OnInit, OnDestroy {

  Governorates: IGovernorate[] = [];
  mySubscribe!: Subscription;

  governForm = new FormGroup({
    Name: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  constructor(private GovernorateService: GovernorateService) {}

  ngOnInit(): void {
    this.loadGovernorates();
  }

  ngOnDestroy(): void {
    if (this.mySubscribe) this.mySubscribe.unsubscribe();
  }

  loadGovernorates() {
    this.mySubscribe = this.GovernorateService.getAllGoverns().subscribe({
      next: (response) => {
        this.Governorates = response;
      },
      error: (error) => {
        console.error('Error loading governorates:', error);
      }
    });
  }

  get getName() {
    return this.governForm.controls['Name'];
  }

  deleteHandler(governId: number) {
    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: 'لن تتمكن من استرجاع هذا الفرع بعد حذفه!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'نعم، احذفه!',
      cancelButtonText: 'إلغاء',
    }).then((result) => {
      if (result.isConfirmed) {
        this.GovernorateService.deletegovern(governId.toString()).subscribe(() => {
          this.Governorates = this.Governorates.filter(g => g.id !== governId);
          Swal.fire('تم الحذف!', 'تم حذف الفرع بنجاح.', 'success');
        });
      }
    });
  }

  governHandler() {
    if (this.governForm.valid) {
      console.log('Form Value:', this.governForm.value); // للتأكد من القيم المرسلة

      this.GovernorateService.addNewgovern(this.governForm.value).subscribe({
        next: (res) => {
          // إعادة تحميل القائمة من السيرفر للتأكد من ظهور الاسم
          this.loadGovernorates();

          // إغلاق المودال
          const modalElement = document.getElementById('addGovernModal');
          if (modalElement) {
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            modalInstance?.hide();
          }

          this.governForm.reset();

          Swal.fire('تمت الإضافة!', 'تمت إضافة المحافظة بنجاح.', 'success');
        },
        error: () => {
          Swal.fire('خطأ!', 'حدث خطأ أثناء الإضافة.', 'error');
        }
      });
    }
  }
}
