export interface IGroup {

  id: number; 
  name: string;
  date?: Date; 
  permissions: {
    permissionName: string;
    actions: string[];
  }[];


}
