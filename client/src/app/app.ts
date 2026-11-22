import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ICreateLead, ILead } from './core/models/lead.model';
import { LeadService } from './core/services/lead-service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  leads: ILead[] = [];
  isLoading = true;
  isSaving = false;
  errorMessage = '';
  listError = '';
  successMessage = '';
  editingLeadId: string | null = null;
  isDeleting = false;

  leadForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100),
    ]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(254)]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=(?:\D*\d){7,15}\D*$)\+?[\d\s().-]+$/),
    ]),
  });

  constructor(
    private _leadService: LeadService,
    private _cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadLeads();
  }

  get todayCount(): number {
    const today = new Date().toDateString();
    return this.leads.filter((lead) => new Date(lead.createdAt).toDateString() === today).length;
  }

  loadLeads(): void {
    this.isLoading = true;
    this.listError = '';

    this._leadService.getAllLeads().subscribe({
      next: (res) => {
        this.leads = res.data || [];
        this.isLoading = false;
        this._cdr.detectChanges();
      },
      error: (error) => {
        this.listError = this.getErrorMessage(error);
        this.isLoading = false;
        this._cdr.detectChanges();
      },
    });
  }

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.leadForm.valid) {
      this.isSaving = true;
      const leadDetails = this.leadForm.getRawValue() as ICreateLead;
      const request = this.editingLeadId
        ? this._leadService.updateLead(this.editingLeadId, leadDetails)
        : this._leadService.addLead(leadDetails);

      request.subscribe({
        next: (res) => {
          const wasEditing = Boolean(this.editingLeadId);
          if (wasEditing) {
            this.leads = this.leads.map((lead) => (lead._id === res.data._id ? res.data : lead));
          } else {
            this.leads = [res.data, ...this.leads];
          }
          this.successMessage = wasEditing
            ? `${res.data.name} was updated.`
            : `${res.data.name} was added to your leads.`;
          this.editingLeadId = null;
          this.leadForm.reset({ name: '', email: '', phone: '' });
          this.isSaving = false;
          this._cdr.detectChanges();
        },
        error: (error) => {
          this.errorMessage = this.getErrorMessage(error);
          this.isSaving = false;
          this._cdr.detectChanges();
        },
      });
    } else {
      this.leadForm.markAllAsTouched();
    }
  }

  startEditing(lead: ILead): void {
    this.editingLeadId = lead._id;
    this.successMessage = '';
    this.errorMessage = '';
    this.leadForm.setValue({ name: lead.name, email: lead.email, phone: lead.phone });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelEditing(): void {
    this.editingLeadId = null;
    this.leadForm.reset({ name: '', email: '', phone: '' });
    this.errorMessage = '';
    this.successMessage = '';
  }

  deleteLead(lead: ILead): void {
    if (!window.confirm(`Delete ${lead.name} from your leads?`)) {
      return;
    }

    this.isDeleting = true;
    this.errorMessage = '';
    this.successMessage = '';

    this._leadService.deleteLead(lead._id).subscribe({
      next: () => {
        this.leads = this.leads.filter((item) => item._id !== lead._id);
        if (this.editingLeadId === lead._id) {
          this.cancelEditing();
        }
        this.isDeleting = false;
        this.successMessage = `${lead.name} was deleted.`;
        this._cdr.detectChanges();
      },
      error: (error) => {
        this.errorMessage = this.getErrorMessage(error);
        this.isDeleting = false;
        this._cdr.detectChanges();
      },
    });
  }

  initials(name: string): string {
    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('');
  }

  getErrorMessage(error: any): string {
    return error.error?.error?.message || 'Something went wrong. Please try again.';
  }
}
