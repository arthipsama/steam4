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


    // this.dashboardService.CallViewOrder().subscribe(totalOrderPrice => {
    //   console.log('Total Order Price:', totalOrderPrice);
    //   this.totalOrderPrice = totalOrderPrice.toString();
    // });

    this.dashboardService.CallViewOrder().subscribe(totalOrderIds => {
      console.log('Total Order Ids:', totalOrderIds);
      this.totalOrderPrice = totalOrderIds.length.toString();
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

  generateColors(labels: string[], baseColor: string): string[] {
    return labels.map((label, index) => baseColor);
  }
  
status = false;
addToggle()
{
  this.status = !this.status;       
}
//Bar Chart
type = 'line';
type2 = 'bar';
dataa = {
  labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],  
  datasets: [{
    label: "จำนวนออเดอร์ทั้งหมด",
    data: [65, 59, 45, 81, 56, 55, 40],
    backgroundColor: this.generateColors(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], "#f38b4a"),
    yAxisID: 'quantity-axis',
  },{
      label: "จำนวนยอดเงินทั้งหมด",
      data: [800, 5900, 750, 8100, 850, 550, 40000],
      backgroundColor: this.generateColors(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], "#6970d5"),
      yAxisID: 'money-axis',
    }]
};

options = {
  maintainAspectRatio: true,
  scales: {
    yAxes: [
      {
        id: 'quantity-axis',
        ticks: {
          // stepSize: 10,
          max: 200,
          min: 0,
        },
      },
      {
        id: 'money-axis',
        position: 'right',
        ticks: {
          // stepSize: 500,
          max: 100000,
          min: 0,
          callback: function (value: number, index: number, values: number[]) {
            return new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'THB',
            }).format(value);
          },
        },
      },
    ],
  },
};


}
