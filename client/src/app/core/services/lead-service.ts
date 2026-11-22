import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICreateLead, ILeadRes, ILeadsRes } from '../models/lead.model';

@Injectable({
  providedIn: 'root',
})
export class LeadService {
  constructor(private _http: HttpClient) {}

  private apiURL = '/api/v1/leads';

  getAllLeads() {
    return this._http.get<ILeadsRes>(this.apiURL);
  }

  addLead(data: ICreateLead) {
    return this._http.post<ILeadRes>(this.apiURL, data);
  }

  updateLead(id: string, data: ICreateLead) {
    return this._http.put<ILeadRes>(`${this.apiURL}/${id}`, data);
  }

  deleteLead(id: string) {
    return this._http.delete(`${this.apiURL}/${id}`);
  }
}
