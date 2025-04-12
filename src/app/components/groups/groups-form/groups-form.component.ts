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
  groupId: number = 0;

  groupLoaded: boolean = false;
  permissionsLoaded: boolean = false;

  constructor(
    private fb: FormBuilder,
    private groupService: GroupService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.groupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  
    // Load all permissions
    this.groupService.getAllGroups().subscribe((groups) => {
      if (groups.length > 0 && groups[0].permissions) {
        this.allPermissions = groups[0].permissions.map((perm: any) => ({
          permissionName: perm.permissionName,
          actions: perm.actions || [],
        }));
      }
      this.permissionsLoaded = true;
      this.syncPermissions(); 
    });
  
   
    this.route.paramMap.subscribe((params) => {
      const groupIdFromRoute = params.get('id');
      if (groupIdFromRoute && groupIdFromRoute !== '0') {
        this.groupId = +groupIdFromRoute;
  
        this.groupService.getGroupById(this.groupId.toString()).subscribe((group) => {
          this.groupForm.patchValue({
            name: group.name,
          });
  
         
          console.log('Loaded group:', group);
  
         
          this.selectedPermissions = group.permissions.map((perm: any) => ({
            permissionName: perm.permissionName,
            actions: perm.actions,
          }));
  
          console.log('Selected Permissions:', this.selectedPermissions); 
  
          this.groupLoaded = true;
          this.syncPermissions();  
        });
      } else {
        this.groupLoaded = true; 
      }
    });
  }
  
  syncPermissions() {
    if (this.groupLoaded && this.permissionsLoaded) {
    
      console.log('Before Syncing Permissions', this.allPermissions, this.selectedPermissions);
  
      this.allPermissions.forEach((perm) => {
        const selected = this.selectedPermissions.find(
          (p) => p.permissionName === perm.permissionName
        );
        if (selected) {
          perm.actions.forEach((action: string) => {
            if (!selected.actions.includes(action)) {
              selected.actions.push(action);
            }
          });
        }
      });
  
    
      console.log('After Syncing Permissions', this.allPermissions, this.selectedPermissions);
    }
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

  // Check if the action is selected
  isChecked(permissionName: string, action: string): boolean {
    const permission = this.selectedPermissions.find(p => p.permissionName === permissionName);
    const isChecked = permission ? permission.actions.includes(action) : false;
  
    console.log(`isChecked for ${permissionName} - ${action}:`, isChecked);  
  
    return isChecked;
  }
  

  submitGroup() {
    if (this.groupForm.valid && this.selectedPermissions.length > 0) {
      const newGroup = {
        name: this.groupForm.value.name,
        permissions: this.selectedPermissions.map(permission =>
          permission.actions.map((action: string) => ({
            permissionId: this.getPermissionId(permission.permissionName),
            action: action
          }))
        ).flat()
      };

   
      if (this.groupId) {
        this.groupService.editGroup(this.groupId.toString(), newGroup).subscribe({
          next: () => {
            alert('Group updated successfully!');
            this.router.navigate(['/groups']);
          },
          error: () => alert('Something went wrong during update')
        });
      } else {
        this.groupService.addNewGroup(newGroup).subscribe({
          next: () => {
            alert('Group added successfully!');
            this.groupForm.reset();
            this.selectedPermissions = [];
          },
          error: () => alert('Something went wrong during add')
        });
      }
    } else {
      alert('Please enter group name and select at least one permission.');
    }
  }

  
  getPermissionId(permissionName: string): number {
    const permissionMapping: { [key: string]: number } = {
      "Branch": 1,
      "City": 2,
    
    };
    return permissionMapping[permissionName] || 0;
  }
}








