import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  CheckResult,
  CheckRun,
  CheckTemplate,
  Item,
  Member,
  Partner,
} from '@system4blue/api-interfaces';
import { AdminChecksRunService } from '../admin-checks-run.service';
import { AdminMembersService } from '@system4blue/admin/members';
import { AdminChecksTemplateService } from '../../admin-checks-template/admin-checks-template.service';
import { AdminItemsService } from '@system4blue/admin/items';

@Component({
  selector: 'system4blue-check-run-form',
  templateUrl: './check-run-form.component.html',
  styleUrls: ['./check-run-form.component.scss'],
})
export class CheckRunFormComponent implements OnInit {
  submitted = false;
  runForm!: FormGroup;

  run!: CheckRun;

  partnerPossibilites?: Partner[];
  memberPossibilities?: Member[];
  templatePossibilites?: CheckTemplate[];

  testAbleItems?: Item[];

  checks: Record<string, {enabled: boolean, item: Item, failedChecks: string[], successfullChecks: string[]}> = {};

  constructor(
    private readonly fb: FormBuilder,
    private readonly ref: DynamicDialogRef,
    private readonly config: DynamicDialogConfig,
    private readonly checkRunService: AdminChecksRunService,
    private readonly memberService: AdminMembersService,
    private readonly checkTemplateService: AdminChecksTemplateService,
    private readonly itemService: AdminItemsService
  ) {}

  ngOnInit() {
    this.memberService
      .loadEntites()
      .then((data) => (this.memberPossibilities = data.data));

    this.checkTemplateService
      .getTemplatesList()
      .then((data) => (this.templatePossibilites = data));

    this.run = this.config.data?.run;

    this.runForm = this.fb.group({
      template: [],
      check: [],
      responsible: [],
      date: [],
      note: [],
      checker: [],
    });
  }

  async save() {
    if (this.run == undefined) {
      const checkRun = this.runForm.value;
      checkRun.checkResults = [];

      Object.keys(this.checks).forEach(key => {
        const check = this.checks[key];
        if (check.enabled) {
            checkRun.checkResults.push({successfullChecks: check.successfullChecks, failedChecks: check.failedChecks, item: key});
        }
      });

      await this.checkRunService.createCheckRun(checkRun);
    } else {
      const runData: CheckRun = this.run;
      Object.assign(runData, this.runForm.value);

      await this.checkRunService.updateCheckRun(runData, this.run.id);
    }
  }

  async close() {
    this.ref.close();
  }

  get selectedTemplate(): CheckTemplate | undefined {
    return this.templatePossibilites?.find(
      (template) => template.id === this.runForm.controls['template'].value
    );
  }

  loadTestableItems(){
    this.itemService.loadItems(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      ['checkTemplate||eq||' + this.runForm.controls['template'].value as `${string}||eq||${string}`]
    ).then(
      data => {this.testAbleItems = data.data;
      }
    );
  }

  toggleItem(item: Item) {
    const check = this.checks[item.id];

    if (check && check.enabled) {
      this.checks[item.id].enabled = false;
    } else {
      this.checks[item.id] = this.checks[item.id] ?? {item: item, enabled: true, failedChecks: [], successfullChecks: []};
    }
  }

  toggleCheckMark(value: boolean, item: Item, check: string) {
    if (this.checks[item.id]) {
      const ind1 = this.checks[item.id].failedChecks.indexOf(check);
      if (ind1 >= 0) this.checks[item.id].failedChecks.splice(ind1, 1);

      const ind2 = this.checks[item.id].successfullChecks.indexOf(check);
      if (ind2 >= 0) this.checks[item.id].successfullChecks.splice(ind2, 1);

      if (value === true) {
        this.checks[item.id].successfullChecks.push(check);

      } else if (value === false) {
        this.checks[item.id].failedChecks.push(check);

      }
    }
  }
}
