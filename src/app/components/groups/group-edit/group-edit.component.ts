import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.css']
})
export class GroupEditComponent implements OnInit {

  @Input() initialGroup: any; 
  @Input() allPermissions: any[] = [];
  @Output() onUpdate = new EventEmitter<any>();

  editForm!: FormGroup;
  selectedPermissions: any[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      name: [this.initialGroup?.name || '', Validators.required]
    });

    this.selectedPermissions = this.initialGroup?.permissions || [];
  }

  isChecked(permissionName: string, action: string): boolean {
    const permission = this.selectedPermissions.find(p => p.permissionName === permissionName);
    return permission ? permission.actions.includes(action) : false;
  }

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

  submit() {
    if (this.editForm.valid && this.selectedPermissions.length > 0) {
      const updatedGroup = {
        name: this.editForm.value.name,
        permissions: this.selectedPermissions
      };
      this.onUpdate.emit(updatedGroup);
    } else {
      alert('يرجى إدخال الاسم وتحديد صلاحيات');
    }
  }
}
