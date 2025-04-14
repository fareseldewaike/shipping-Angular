export interface IGroup {

  // id: number; 
  // name: string;
  // date?: Date; 
  // permissions: {
  //   permissionName: string;
  //   actions: string[];
  // }[];



  id: number;
  name: string;
  date?: string; // أو Date لو جايالك كـ Date حقيقية من الـ API
  permissions: {
    permissionId: number;
    action: string;
  }[];

}
