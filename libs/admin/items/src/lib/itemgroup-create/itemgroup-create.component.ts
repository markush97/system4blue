import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemslistService } from '../itemslist.service';
import {DynamicDialogRef} from 'primeng/dynamicdialog';

@Component({
  selector: 'system4blue-itemgroup-create',
  templateUrl: './itemgroup-create.component.html',
  styleUrls: ['./itemgroup-create.component.scss']
})
export class ItemgroupCreateComponent {

  public form:FormGroup;
  constructor(fb:FormBuilder, private readonly itemService: ItemslistService, private readonly dialogRef: DynamicDialogRef) {
      this.form = fb.group({
        name:[null , Validators.required],
        unit:['kg', Validators.required]
      })
  }

  public submit() {
    this.itemService.createItemGroup(this.form.value).subscribe(
      result => console.log(result)
    );
  }

  public close() {
    this.dialogRef.close();
  }

}
