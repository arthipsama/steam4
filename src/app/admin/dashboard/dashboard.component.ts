import { Component, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { DashboardService } from 'src/app/service/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  

  userCount: number = 0;
  productSummary: number = 0;
  orderCount: number = 0;
  contactCount: number = 0;
  totalOrderPrice: string = '';
  most5ProductsBySaleCount: any[] = [];
  most5ProductsByView: any[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService.CallViewUser().subscribe((count: number) => {
      this.userCount = count;
    });

    this.dashboardService.CallViewProduct().subscribe((summary: number) => {
      this.productSummary = summary;
    });


    this.dashboardService.CallViewOrder().subscribe(totalOrderPrice => {
      console.log('Total Order Price:', totalOrderPrice);
      this.totalOrderPrice = totalOrderPrice.toString();
    });
    

    this.dashboardService.CallViewContact().subscribe((contactCount: number) => {
      this.contactCount = contactCount;
    });

    this.dashboardService.getMost5ProductsBySaleCount().subscribe(most5 => {
      this.most5ProductsBySaleCount = most5;
    });

    this.dashboardService.getMost5ProductsByView().subscribe(view5 => {
      this.most5ProductsByView = view5;
    });

    
  }
}
