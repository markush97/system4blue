import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CheckTemplate } from '@system4blue/api-interfaces';
import { AdminChecksTemplateService } from '../admin-checks-template.service';
@Component({
  selector: 'system4blue-admin-checks-template-form',
  templateUrl: './admin-checks-template-form.component.html',
  styleUrls: ['./admin-checks-template-form.component.scss']
})
export class AdminChecksTemplateFormComponent implements OnInit {
  submitted = false;
  templateForm!: FormGroup;

  template!: CheckTemplate;

  constructor(
    private readonly fb: FormBuilder,
    private readonly ref: DynamicDialogRef,
    private readonly config: DynamicDialogConfig,
    private readonly templateService: AdminChecksTemplateService
  ) {}

  ngOnInit() {
    this.template = this.config.data?.template;

    this.templateForm = this.fb.group({
      name: [this.template?.name, [Validators.required]],
      description: [this.template?.description, []],
      checks: [this.template?.checks, []]
    });
  }

  async save() {
    if (this.template == undefined) {
        await this.templateService.createTemplate(this.templateForm.value);
    } else {
      const templateData: CheckTemplate = this.template;
      Object.assign(templateData, this.templateForm.value);

      await this.templateService.updateTemplate(
        templateData,
        this.template.id ?? ''
      );
    }
  }

  async close() {
    this.ref.close();
  }
}
