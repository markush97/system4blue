import { Component, Input, OnInit } from '@angular/core';
import { Partner } from '@system4blue/api-interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminPartnersService } from '../admin-partners.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'system4blue-admin-partners-form',
  templateUrl: './admin-partners-form.component.html',
  styleUrls: ['./admin-partners-form.component.scss'],
})
export class AdminPartnersFormComponent implements OnInit {
  submitted = false;
  partnerForm!: FormGroup;

  states = [
    { name: 'Österreich', code: 'AT' },
    { name: 'Deutschland', code: 'DE' },
    { name: 'Schweiz', code: 'CH' },
    { name: 'Italien', code: 'IT' },
    { name: 'Tschechien', code: 'CZ' },
  ];

  partner!: Partner;

  constructor(
    private readonly fb: FormBuilder,
    private readonly partnerService: AdminPartnersService,
    private readonly ref: DynamicDialogRef,
    private readonly config: DynamicDialogConfig
  ) {}

  ngOnInit() {
    this.partner = this.config.data?.partner;

    this.partnerForm = this.fb.group({
      name: [this.partner?.name, [Validators.required]],
      street: [this.partner?.street],
      zip: [this.partner?.zip],
      country: [this.partner?.country],
      contactPhone: [this.partner?.contactPhone],
      contactName: [this.partner?.contactName],
      contactEmail: [this.partner?.contactEmail, Validators.email],
      webpage: [this.partner?.webpage],
      description: [this.partner?.description]
    });
  }

  async save() {
    if (this.partner == undefined) {
      await this.partnerService.createPartner(this.partnerForm.value);
    } else {
      await this.partnerService.updatePartner(
        this.partner.id ?? '',
        this.partnerForm.value
      );
    }
  }

  async close() {
    this.ref.close();
  }
}
