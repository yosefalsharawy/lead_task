export interface ILead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateLead {
  name: string;
  email: string;
  phone: string;
}

export interface ILeadsRes {
  success: boolean;
  data: ILead[];
}

export interface ILeadRes {
  success: boolean;
  data: ILead;
}
