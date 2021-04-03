import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'system4blue-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'admin';

  constructor(private readonly config: PrimeNGConfig) {}

  ngOnInit() {
    this.config.setTranslation({
      startsWith: 'Beginnt mit',
      contains: 'Enthält',
      notContains: 'Enthält nicht',
      endsWith: 'Endet mit',
      equals: 'Ist',
      notEquals: 'Ist nicht',
      noFilter: 'Kein Filter',
      lt: 'Weniger als',
      lte: 'Weniger oder gleich wie',
      gt: 'Mehr als',
      gte: 'Mehr oder gleich wie',
      is: 'Ist',
      isNot: 'Ist nicht',
      before: 'Vor',
      after: 'Nach',
      clear: 'Löschen',
      apply: 'Anwenden',
      accept: 'Akzeptieren',
      reject: 'Ablehnen',
      choose: 'Wähle',
      upload: 'Hochladen',
      cancel: 'Abbrechen',
      dayNames: ['Sontag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
      dayNamesShort: ['Son', 'Mon', 'Die', 'Mit', 'Don', 'Fre', 'Sam'],
      dayNamesMin: ['So','Mo','Di','Mi','Do','Fr','Sa'],
      monthNames: ['Jänner','Februar','März','April','Mai','Juni','July','August','September','Oktober','November','Dezember'],
      monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun','Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
      today: 'Heute',
      weekHeader: 'Woche',
      dateIs: 'Datum ist',
      dateAfter: 'Nach',
      dateBefore: 'Vor',
      dateIsNot: 'Datum ist nicht'
    });
  }
}
