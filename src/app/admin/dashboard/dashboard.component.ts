import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
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

  constructor(private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef,
    private zone: NgZone,
    
    ) 
    
    {  this.dataa3 = { ...this.dataa1 };

  }

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
// type = 'line';
type2 = 'bar';
chartTitle = 'Chart with Data from API 2024';
public dataa1 = {
  labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],  
  datasets: [{
    label: "จำนวนออเดอร์ทั้งหมด2024",
    data: [65, 59, 45, 81, 56, 55, 40 ,65, 59, 45, 81, 56],
    backgroundColor: this.generateColors(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], "#f38b4a"),
    yAxisID: 'quantity-axis',
  },{
      label: "จำนวนยอดเงินทั้งหมด2024",
      data: [800, 5900, 750, 8100, 850, 550, 4000,800, 5900, 750, 8100, 850],
      backgroundColor: this.generateColors(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], "#6970d5"),
      yAxisID: 'money-axis',
    }]
};

public dataa2 = {
  labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],  
  datasets: [{
    label: "จำนวนออเดอร์ทั้งหมด2025",
    data: [65, 59, 45, 81, 56, 55, 40,65, 59, 45, 81, 56],
    backgroundColor: this.generateColors(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], "#f38b4a"),
    yAxisID: 'quantity-axis',
  },{
      label: "จำนวนยอดเงินทั้งหมด2025",
      data: [800, 5900, 750, 8100, 850, 550, 4000,800, 5900, 750, 8100, 8500],
      backgroundColor: this.generateColors(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], "#6970d5"),
      yAxisID: 'money-axis',
    }]
};

public dataa3: any;

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
          stepSize: 5000,
          max: 50000,
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
  legend: {
    display: true, // ซ่อน legend
  },
};


currentData = this.dataa1;
newData: any[] = [];

toggleChartData(year: string) {
  let newData: any = null;
  let newTitle: string = '';

  if (year === '2025') {
    newData = this.dataa2;
    newTitle = 'Chart with Data from API 2025';
    console.log('New Data:', newData);
  } else if (year === '2024') {
    newData = this.dataa3;
    newTitle = 'Chart with Data from API 2024';
    console.log('New Data:', newData);
  }

  this.currentData = newData;
  this.chartTitle = newTitle;
  
  this.zone.run(() => {
    this.cdr.detectChanges();
  });
}




}
