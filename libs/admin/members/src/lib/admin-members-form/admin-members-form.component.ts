import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Member } from '@system4blue/api-interfaces';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdminMembersService } from '../admin-members.service';

@Component({
  selector: 'system4blue-admin-members-form',
  templateUrl: './admin-members-form.component.html',
  styleUrls: ['./admin-members-form.component.scss'],
})
export class AdminMembersFormComponent implements OnInit {
  submitted = false;
  memberForm!: FormGroup;

  states: any[] = [
    { name: 'Österreich', code: 'AT' },
    { name: 'Deutschland', code: 'DE' },
    { name: 'Schweiz', code: 'CH' },
    { name: 'Italien', code: 'IT' },
    { name: 'Tschechien', code: 'CZ' },
  ];

  member!: Member;

  constructor(
    private readonly fb: FormBuilder,
    private readonly memberService: AdminMembersService,
    private readonly ref: DynamicDialogRef,
    private readonly config: DynamicDialogConfig
  ) {}

  ngOnInit() {
    this.member = this.config.data?.member;

    this.memberForm = this.fb.group({
      firstName: [this.member?.firstName, [Validators.required]],
      lastName: [this.member?.lastName, [Validators.required]],
      street: [this.member?.street],
      zip: [this.member?.zip],
      country: [this.member?.country],
      phone: [this.member?.phone],
      email: [this.member?.email, [Validators.required, Validators.email]],
      privateEmail: [this.member?.privateEmail, Validators.email],
      memberId: [this.member?.memberId],
    });
  }

  async save() {
    if (this.member == undefined) {
      await this.memberService.createMember(this.memberForm.value);
    } else {
      await this.memberService.updateMember(
        this.member.id ?? '',
        this.memberForm.value
      );
    }
  }

  async close() {
    this.ref.close();
  }
}
