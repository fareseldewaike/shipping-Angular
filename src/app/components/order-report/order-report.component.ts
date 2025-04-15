import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-order-report',
  templateUrl: './order-report.component.html',
  styleUrls: ['./order-report.component.css'],
})
export class OrderReportComponent implements OnInit {
  orders: any[] = [];
  selectedStatus: number | undefined;
  pageSize = 5;
  currentPage = 1;
  totalPages = 1;
  fromDate: string | undefined; // Example: '2025-01-01'
  toDate: string | undefined; // Example: '2025-12-31'


  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders(this.pageSize, this.currentPage);
  }
  loadOrders(pageSize: number, pageNum: number, status?: number): void {
    this.selectedStatus = status;
    this.currentPage = pageNum;

    const fromDate = this.fromDate || undefined;
    const toDate = this.toDate || undefined;
    const statusParam = status !== undefined && status !== null ? status : undefined;

    console.log('Query Params:', { pageSize, pageNum, fromDate, toDate, statusParam });
    this.orders = [];
    this.orderService
      .getAllOrderReports(pageSize, pageNum, fromDate, toDate, statusParam)
      .subscribe({
        next: (res) => {
          console.log('API Response:', res);
          this.orders = Array.isArray(res) ? res : [];

          if (res.length < this.pageSize) {
            this.totalPages = this.currentPage; // دي غالبًا آخر صفحة
          } else {
            this.totalPages = this.currentPage + 1; // نخمن إن في صفحة بعدها
          }
        },
        error: (err) => {
          console.error('Error fetching orders:', err);
        },
      });
  }



  onTabClick(status?: number): void {
    this.loadOrders(this.pageSize, 1, status); // Reset to first page on tab change
  }

  goToPage(page: number): void {
    this.loadOrders(this.pageSize, page, this.selectedStatus);
  }

  onFilterChange(): void {
    this.loadOrders(this.pageSize, 1, this.selectedStatus);
  }

  getstatus(status: number): string {
    switch (status) {
      case 0:
        return 'جديد';
      case 1:
        return 'قيد الإنتظار';
      case 2:
        return 'تم التسليم';
      case 3:
        return 'تم التسليم للمندوب';
      case 4:
        return 'لا يمكن الوصول';
      case 5:
        return 'تم التأجيل جزئيا';
      case 6:
        return 'تم الإلغاء من قبل المستلم';
      case 7:
        return 'تم الرفض مع الدفع';
      case 8:
        return 'رفض مع سداد جزء';
      case 9:
        return 'رفض ولم يتم الدفع';
      case 10:
        return 'ملغي من التاجر';
      case 11:
        return 'مرتجع';
      default:
        return 'غير معروف';
    }
  }
}
