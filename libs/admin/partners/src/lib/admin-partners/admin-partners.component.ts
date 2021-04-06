import { Component, OnInit } from '@angular/core';
import { Partner } from '@system4blue/api-interfaces';

@Component({
  selector: 'system4blue-admin-partners',
  templateUrl: './admin-partners.component.html',
  styleUrls: ['./admin-partners.component.scss']
})
export class AdminPartnersComponent implements OnInit {

  constructor() { }

  testPartner: Partner = {
    name: 'Erik',
    street: 'Teststraße',
    id: '30fad172-f7c6-4743-bebf-58ab8e93b6e6',
    createdAt: '123',
    updatedAt: '123',
    contactEmail: 'emaik.asd@asd.at',
    contactName: 'asdasfa',
    contactPhone: '1231',
    country: 'Österreich',
    webpage: 'test.test.at',
    zip: 2230
  }

  ngOnInit(): void {
  }

}
