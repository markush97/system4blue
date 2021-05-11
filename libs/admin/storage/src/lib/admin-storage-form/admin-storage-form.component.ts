import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageContainer } from '@system4blue/api-interfaces';
import { UUID4 } from '@system4blue/types';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdminStorageService } from '../admin-storage.service';

@Component({
  selector: 'system4blue-admin-storage-form',
  templateUrl: './admin-storage-form.component.html',
  styleUrls: ['./admin-storage-form.component.scss'],
})
export class AdminStorageFormComponent implements OnInit {
  submitted = false;
  containerForm!: FormGroup;

  container!: StorageContainer;
  parentId!: UUID4;

  types = [
    { name: 'Fahrzeug', code: 0 },
    { name: 'Fest verbaut (z.B Regale)', code: 1 },
    { name: 'Kiste', code: 2 },
    { name: 'Person', code: 3 },
    { name: 'Gebäude / Raum', code: 5 },
    { name: 'Sonstiges', code: 4 },
  ];

  constructor(
    private readonly fb: FormBuilder,
    readonly storageService: AdminStorageService,
    private readonly ref: DynamicDialogRef,
    private readonly config: DynamicDialogConfig
  ) {}

  ngOnInit() {
    this.container = this.config.data?.container;
    this.parentId = this.config.data?.parentId;

    this.containerForm = this.fb.group({
      name: [this.container?.name, [Validators.required]],
      description: [this.container?.description, []],
      type: [this.container?.type, [Validators.required]],
    });
  }

  async save() {
    if (this.container == undefined) {
      if (this.parentId) {
        await this.storageService.createSubContainer(
          this.containerForm.value,
          this.parentId
        );
      } else {
        await this.storageService.createRootContainer(this.containerForm.value);
      }
    } else {
      const containerData: StorageContainer = this.container;
      Object.assign(containerData, this.containerForm.value, {
        subContainers: undefined,
      });

      await this.storageService.updateContainer(
        containerData,
        this.container.id ?? ''
      );
    }
  }

  async close() {
    this.ref.close();
  }
}
