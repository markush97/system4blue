import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CheckTemplate,
  ItemGroup,
  Partner,
  Unit,
} from '@system4blue/api-interfaces';
import { AdminPartnersService } from '@system4blue/admin/partners';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdminItemsService } from '../admin-items.service';
import { AdminChecksTemplateService } from '@system4blue/admin/checks';

@Component({
  selector: 'system4blue-item-group-form',
  templateUrl: './item-group-form.component.html',
  styleUrls: ['./item-group-form.component.scss'],
})
export class ItemGroupFormComponent implements OnInit {
  submitted = false;
  itemGroupForm!: FormGroup;

  itemGroup?: ItemGroup;

  unitPossibilites: Unit[] = [
    Unit.CAN,
    Unit.KG,
    Unit.LITER,
    Unit.PACKAGE,
    Unit.PIECE,
    Unit.TON,
  ];

  partnerPossibilites?: Partner[];
  templatePossibilites?: CheckTemplate[];

  timeRanges = [
    { label: 'Tage', factor: '1' },
    { label: 'Jahre', factor: '365' },
    { label: 'Wochen', factor: '7' },
    { label: 'Monate', factor: '30' },
  ];

  constructor(
    private readonly fb: FormBuilder,
    private readonly itemService: AdminItemsService,
    private readonly ref: DynamicDialogRef,
    private readonly config: DynamicDialogConfig,
    private readonly partnerService: AdminPartnersService,
    private readonly checkTemplateService: AdminChecksTemplateService
  ) {}

  ngOnInit() {
    this.partnerService
      .loadEntites()
      .then((data) => (this.partnerPossibilites = data.data));

    this.checkTemplateService
      .getTemplatesList()
      .then((data) => (this.templatePossibilites = data));

    this.itemGroup = this.config.data?.partner;
    this.itemGroupForm = this.fb.group({
      name: [this.itemGroup?.name],
      description: [this.itemGroup?.description],

      minAmount: [this.itemGroup?.minAmount],
      maxAmount: [this.itemGroup?.maxAmount],
      unit: [this.itemGroup?.unit],

      defaultLifespan: [this.itemGroup?.defaultLifespan],

      seller: [this.itemGroup?.seller],
      producer: [this.itemGroup?.producer],

      pricePerUnit: [this.itemGroup?.pricePerUnit],

      checkTemplate: [this.itemGroup?.checkTemplate],

      timeRange: [this.timeRanges[0]]
    });
  }

  async save() {
    if (this.itemGroup == undefined) {
      await this.itemService.createItemGroup({
        ...this.itemGroupForm.value,
        defaultLifespan:
          this.itemGroupForm.controls['defaultLifespan'].value *
          this.itemGroupForm.controls['timeRange'].value,
      });
    } else {
      await this.itemService.updateItemGroup(
        this.itemGroup.id,
        {
          ...this.itemGroupForm.value,
          defaultLifespan:
            this.itemGroupForm.controls['defaultLifespan'].value *
            this.itemGroupForm.controls['timeRange'].value,
        }
      );
    }
  }

  async close() {
    this.ref.close();
  }
}
