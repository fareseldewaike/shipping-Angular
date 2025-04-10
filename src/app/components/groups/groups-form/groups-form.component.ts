// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { GroupService } from 'src/app/shared/services/group.service';


// @Component({
//   selector: 'app-groups-form',
//   templateUrl: './groups-form.component.html',
//   styleUrls: ['./groups-form.component.css']
// })
// export class GroupsFormComponent implements OnInit {

//   groupForm!: FormGroup;
//   allPermissions: any[] = [];
//   selectedPermissions: any[] = [];

//   constructor(private fb: FormBuilder, private groupService: GroupService) {}

//   ngOnInit(): void {
//     this.groupForm = this.fb.group({
//       name: ['', Validators.required]
//     });

//     // Simulate getting permissions
//     this.groupService.getAllGroups().subscribe((groups) => {
//       if (groups.length > 0 && groups[0].permissions) {
//         this.allPermissions = groups[0].permissions.map((perm: any) => ({
//           permissionName: perm.permissionName,
//           actions: []
//         }));
//       }
//     });
//   }

//   toggleAction(permissionName: string, action: string, event: any) {
//     const existing = this.selectedPermissions.find(p => p.permissionName === permissionName);
    
//     if (event.target.checked) {
//       if (existing) {
//         if (!existing.actions.includes(action)) {
//           existing.actions.push(action);
//         }
//       } else {
//         this.selectedPermissions.push({ permissionName, actions: [action] });
//       }
//     } else {
//       if (existing) {
//         existing.actions = existing.actions.filter((a: string) => a !== action);
//         if (existing.actions.length === 0) {
//           this.selectedPermissions = this.selectedPermissions.filter(p => p.permissionName !== permissionName);
//         }
//       }
//     }
//   }

//   submitGroup() {
//     if (this.groupForm.valid && this.selectedPermissions.length > 0) {
//       const newGroup = {
//         name: this.groupForm.value.name,
//         permissions: this.selectedPermissions
//       };

//       this.groupService.addNewGroup(newGroup).subscribe({
//         next: (res) => {
//           alert('Group added successfully!');
//           this.groupForm.reset();
//           this.selectedPermissions = [];
//         },
//         error: (err) => {
//           console.error(err);
//           alert('Something went wrong!');
//         }
//       });
//     } else {
//       alert('Please enter group name and choose at least one permission.');
//     }
//   }
// }


// import { Component, OnInit } from '@angular/core';
// import { IGroup } from 'src/app/models/igroup';
// import { FormBuilder, FormGroup, FormArray ,AbstractControl} from '@angular/forms';
// import { GroupService } from 'src/app/shared/services/group.service';


// @Component({
//   selector: 'app-groups-form',
//   templateUrl: './groups-form.component.html',
//   styleUrls: ['./groups-form.component.css']
// })
// export class GroupsFormComponent implements OnInit {

//   groupForm!: FormGroup;
//   permissionsList = [
//     { name: 'Branch' },
//     { name: 'City' },
//     { name: 'Governorate' },
//     { name: 'Employee' },
   
//   ];

//   actions = ['Add', 'Edit', 'Delete', 'Show'];

//   constructor(private fb: FormBuilder, private groupService: GroupService) {}

//   ngOnInit(): void {
//     this.groupForm = this.fb.group({
//       name: [''],
//       permissions: this.fb.array([])
//     });

//     this.permissionsList.forEach(permission => {
//       (this.groupForm.get('permissions') as FormArray).push(
//         this.fb.group({
//           permissionName: [permission.name],
//           actions: this.fb.group({
//             Add: [false],
//             Edit: [false],
//             Delete: [false],
//             Show: [false]
//           })
//         })
//       );
//     });
//   }

//   get permissionsFormArray(): FormArray {
//     return this.groupForm.get('permissions') as FormArray;
//   }

//   getActionsFormGroup(permission: AbstractControl): FormGroup {
//     return permission.get('actions') as FormGroup;
//   }
  

//   onSubmit(): void {
//     const rawValue = this.groupForm.value;
  
//     const mappedPermissions = rawValue.permissions.flatMap((perm: any, index: number) => {
//       return Object.keys(perm.actions)
//         .filter(action => perm.actions[action])
//         .map(action => ({
//           permissionId: index, // هنا افترضنا ID يساوي ترتيب العنصر
//           action: action
//         }));
//     });
  
//     const groupToSend = {
//       name: rawValue.name,
//       permissions: mappedPermissions
//     };
  
//     console.log('Sending to API:', groupToSend);
  
//     this.groupService.addNewGroup(groupToSend).subscribe({
//       next: (res) => console.log('Group Added Successfully', res),
//       error: (err) => console.error('Error adding group', err)
//     });
//   }
  
// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from 'src/app/shared/services/group.service';

@Component({
  selector: 'app-groups-form',
  templateUrl: './groups-form.component.html',
  styleUrls: ['./groups-form.component.css']
})
export class GroupsFormComponent implements OnInit {

  groupForm!: FormGroup;
  allPermissions: any[] = [];
  selectedPermissions: any[] = [];
  groupId: number | null = null; // تعريف الـ groupId

  constructor(
    private fb: FormBuilder,
    private groupService: GroupService,
    private route: ActivatedRoute, // لاستخراج الـ groupId من الـ URL
    private router: Router
  ) {}

  ngOnInit(): void {
    // إنشاء الفورم
    this.groupForm = this.fb.group({
      name: ['', Validators.required]
    });

    // استخراج الـ groupId من الـ URL (إذا كان في وضع تعديل)
    this.route.paramMap.subscribe(params => {
      const groupIdFromRoute = params.get('id'); // نقرأ الـ groupId من الـ URL
      
      if (groupIdFromRoute) {
        this.groupId = +groupIdFromRoute;  // تحويل الـ groupId من string إلى number
        console.log('Group ID from route:', this.groupId);
        
        // إذا كنا في وضع تعديل، نطلب بيانات الـ group
        if (this.groupId) {
          this.groupService.getGroupById(this.groupId.toString()).subscribe(group => {
            // تعبئة الفورم بالقيم القديمة
            this.groupForm.patchValue({
              name: group.name,  // تعيين اسم المجموعة في الفورم
            });

            // ملأ الـ selectedPermissions بناءً على البيانات القديمة
            this.selectedPermissions = group.permissions.map((perm: any) => ({
              permissionName: perm.permissionName,
              actions: perm.actions
            }));

            // تحديث الأكشنات المعلّم عليها في الـ checkboxes بناءً على البيانات القديمة
            this.allPermissions.forEach(perm => {
              const permission = this.selectedPermissions.find(p => p.permissionName === perm.permissionName);
              if (permission) {
                perm.actions.forEach((action: string) => {
                  if (!permission.actions.includes(action)) {
                    permission.actions.push(action);
                  }
                });
              }
            });
          });
        }
      }
    });

    // محاكاة الحصول على البيانات الخاصة بالصلاحيات
    this.groupService.getAllGroups().subscribe((groups) => {
      if (groups.length > 0 && groups[0].permissions) {
        this.allPermissions = groups[0].permissions.map((perm: any) => ({
          permissionName: perm.permissionName,
          actions: perm.actions || []
        }));
      }
    });
  }

  // وظيفة لتبديل الأكشنات
  toggleAction(permissionName: string, action: string, event: any) {
    const existing = this.selectedPermissions.find(p => p.permissionName === permissionName);
    
    if (event.target.checked) {
      if (existing) {
        if (!existing.actions.includes(action)) {
          existing.actions.push(action);
        }
      } else {
        this.selectedPermissions.push({ permissionName, actions: [action] });
      }
    } else {
      if (existing) {
        existing.actions = existing.actions.filter((a: string) => a !== action);
        if (existing.actions.length === 0) {
          this.selectedPermissions = this.selectedPermissions.filter(p => p.permissionName !== permissionName);
        }
      }
    }
  }

  // وظيفة للتحقق إذا كان الأكشن مفعلاً
  isChecked(permissionName: string, action: string): boolean {
    const permission = this.selectedPermissions.find(p => p.permissionName === permissionName);
    return permission ? permission.actions.includes(action) : false;
  }

  // إرسال البيانات
  submitGroup() {
    if (this.groupForm.valid && this.selectedPermissions.length > 0) {
      const newGroup = {
        name: this.groupForm.value.name,
        permissions: this.selectedPermissions.map(permission => {
          return permission.actions.map((action: string) => {  
            return {
              permissionId: this.getPermissionId(permission.permissionName),
              action: action
            };
          });
        }).flat()
      };

      console.log('Data being sent to the server:', newGroup);

      // إذا كنا في وضع تعديل
      if (this.groupId) {
        // إذا كنا نعدل، نقوم بتحديث البيانات
        this.groupService.editGroup(this.groupId.toString(), newGroup).subscribe({
          next: (res) => {
            alert('Group updated successfully!');
            this.router.navigate(['/groups']);  // إعادة التوجيه لقائمة المجموعات
          },
          error: (err) => {
            console.error(err);
            alert('Something went wrong!');
          }
        });
      } else {
        // إذا كنا نضيف مجموعة جديدة
        this.groupService.addNewGroup(newGroup).subscribe({
          next: (res) => {
            alert('Group added successfully!');
            this.groupForm.reset();
            this.selectedPermissions = [];
          },
          error: (err) => {
            console.error(err);
            alert('Something went wrong!');
          }
        });
      }
    } else {
      alert('Please enter group name and choose at least one permission.');
    }
  }

  // وظيفة لتحويل اسم الصلاحية إلى ID
  getPermissionId(permissionName: string): number {
    const permissionMapping: { [key: string]: number } = {
      "Branch": 1,
      "City": 2,
    };
    return permissionMapping[permissionName] || 0;  
  }
}






