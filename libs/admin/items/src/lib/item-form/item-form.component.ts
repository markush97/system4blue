import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  CheckTemplate,
  Item,
  ItemGroup,
  ItemState,
  Partner,
  StorageContainer,
  Unit,
} from '@system4blue/api-interfaces';
import { AdminPartnersService } from '@system4blue/admin/partners';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdminItemsService } from '../admin-items.service';
import { AdminChecksTemplateService } from '@system4blue/admin/checks';

@Component({
  selector: 'system4blue-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss'],
})
export class ItemFormComponent implements OnInit {
  submitted = false;
  itemForm: FormGroup;

  item?: Item;
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

  timeRanges = [
    { label: 'Tage', factor: '1' },
    { label: 'Jahre', factor: '365' },
    { label: 'Wochen', factor: '7' },
    { label: 'Monate', factor: '30' },
  ];

  states = [
    { label: 'Aktiv', code: 0 },
    { label: 'Beschädigt', code: 1 },
    { label: 'Verborgt', code: 2 },
    { label: 'Ausgeschieden', code: 3 },
    { label: 'Reserve', code: 4 },
    { label: 'Unbekannt', code: 5 },
  ];

  constructor(
    private readonly fb: FormBuilder,
    private readonly itemService: AdminItemsService,
    private readonly ref: DynamicDialogRef,
    private readonly config: DynamicDialogConfig,
    private readonly partnerService: AdminPartnersService
  ) {
    this.itemForm = this.fb.group({
      name: [],
      externalId: [],
      description: [],

      state: [],

      expiration: [],

      seller: [],
      producer: [],
      producedAt: [],

      price: [],
      storageLocation: []
    });
  }

  ngOnInit() {
    this.partnerService
      .loadEntites()
      .then((data) => (this.partnerPossibilites = data.data));

    this.item = this.config.data?.partner;
    this.itemGroup = this.config.data?.itemGroup;

    if (this.item !== undefined) {
      this.itemForm.patchValue(this.item);
    } else if (this.itemGroup !== undefined) {
      const expirationDate = new Date();
      expirationDate.setDate(
        expirationDate.getDate() + (this.itemGroup.defaultLifespan ?? 0)
      );

      const item = {
        price: this.itemGroup.pricePerUnit,
        expiration: expirationDate
        .toISOString().split('T')[0],
        producer: this.itemGroup.producer?.id,
        seller: this.itemGroup.seller?.id,
        state: ItemState.ACTIVE,
      };

      this.itemForm.patchValue(item);
    }
  }

  async save() {
    if (this.item == undefined) {
      await this.itemService.createItem({
        ...this.itemForm.value,
        itemGroup: this.itemGroup,
      });
    } else {
      const item: Item = this.itemForm.value;
      Object.assign(item, this.item);

      await this.itemService.updateItem(this.item.id, item);
    }
  }

  async close() {
    this.ref.close();
  }

  selectContainer(container: StorageContainer) {
    this.itemForm.patchValue({storageLocation: container.id});
  }
}
