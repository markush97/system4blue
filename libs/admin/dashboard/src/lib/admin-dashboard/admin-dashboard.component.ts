import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  ngOnInit(): void {
    console.log('shown')
  }
}
