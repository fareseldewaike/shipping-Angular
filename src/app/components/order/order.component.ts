import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: any[] = [];
  selectedStatus: number | undefined;
  tabs = [
    { label: 'الكل', status: undefined },
    { label: 'جديد', status: 0 },
    { label: 'قيد الإنتظار', status: 1 },
    { label: 'تم التسليم', status: 2 },
    { label: 'تم التسليم للمندوب', status: 3 },
    { label: 'لا يمكن الوصول', status: 4 },
    { label: 'تم التأجيل جزئيا', status: 5 },
    { label: 'تم الإلغاء من قبل المستلم', status: 6 },
    { label: 'تم الرفض مع الدفع', status: 7 },
    { label: 'رفض مع سداد جزء', status: 8 },
    { label: 'رفض ولم يتم الدفع', status: 9 },
    { label: 'ملغي من التاجر', status: 10 },
    { label: 'مرتجع', status: 11 }
  ];

  pageSize = 5;
  currentPage = 1;
  totalPages = 1;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders(this.pageSize, this.currentPage);
  }

  loadOrders(pageSize: number, pageNum: number, status?: number): void {
    this.selectedStatus = status;
    this.currentPage = pageNum;

    this.orderService.getAllOrders(pageSize, pageNum, status).subscribe({
      next: (res) => {
        console.log('Orders:', res);
        this.orders = res;
        if (res.length < this.pageSize) {
          this.totalPages = this.currentPage; // دي غالبًا آخر صفحة
        } else {
          this.totalPages = this.currentPage + 1; // نخمن إن في صفحة بعدها
        }
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
      }
    });
  }

deleteorder(id: number): void {
  this.orderService.deleteOrder(id).subscribe({
    next: () => {
      console.log('Order deleted successfully!');
      this.orders = this.orders.filter(order => order.serialNum !== id); // تحديث القائمة بعد الحذف
    },
    error: (err) => {
      console.error('Error deleting order:', err);
    }
  });
}

  onTabClick(status?: number): void {
    this.loadOrders(this.pageSize, 1, status); // نبدأ من أول صفحة في كل حالة
  }

  goToPage(page: number): void {
    this.loadOrders(this.pageSize, page, this.selectedStatus);
  }
}
