import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { Observable, map } from 'rxjs';
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
    
    {  this.dataa3 = { ...this.dataa3 };

  }

  ngOnInit() {
    this.dashboardService.CallViewUser().subscribe((count: number) => {
      this.userCount = count;
    });

    this.dashboardService.CallViewProduct().subscribe((summary: number) => {
      this.productSummary = summary;
    });

    this.dashboardService.CallViewOrder().subscribe(totalOrderIds => {
      // console.log('Total Order Ids:', totalOrderIds);
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

    const year1 = 2024;
    this.loadDataForYear(year1, this.dataa3).subscribe((data: any) => {
      this.currentData = data;
    });
  
    const year2 = 2025;
    this.loadDataForYear(year2, this.dataa2).subscribe((data: any) => {
      // สามารถทำอะไรก็ตามที่ต้องการกับ data ของ year2 ได้ที่นี่
    });
    
  }


  generateColors(labels: string[], baseColor: string): string[] {
    return labels.map((label, index) => baseColor);
  }
  
  loadDataForYear(year: number, dataContainer: any): Observable<any> {
    return this.dashboardService.getOrderSummary(year).pipe(
      map((orderSummary: any[]) => {
        dataContainer.labels = orderSummary.map(item => this.getMonthName(item.month));
        dataContainer.datasets[0].data = orderSummary.map(item => item.order_count);
        dataContainer.datasets[0].backgroundColor = this.generateColors(dataContainer.labels, "#f38b4a");
        dataContainer.datasets[1].data = orderSummary.map(item => item.total_price);
        dataContainer.datasets[1].backgroundColor = this.generateColors(dataContainer.labels, "#6970d5");
  
        return dataContainer;
      })
    );
  }
  
  getMonthName(monthNumber: number): string {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    // monthNumber ต้องอยู่ในช่วง 1-12
    if (monthNumber >= 1 && monthNumber <= 12) {
      return monthNames[monthNumber - 1];
    } else {
      return '';
    }
  }
  

type2 = 'bar';
chartTitle = 'Chart with Data from API 2024';
public dataa3: any = {
  datasets: [{
    label: "จำนวนออเดอร์ทั้งหมด 2024",
    data: [],
    yAxisID: 'quantity-axis',
  }, {
    label: "จำนวนยอดเงินทั้งหมด 2024",
    data: [],
    yAxisID: 'money-axis',
  }]
};

public dataa2: any = {
  datasets: [{
    label: "จำนวนออเดอร์ทั้งหมด 2025",
    data: [],
    yAxisID: 'quantity-axis',
  }, {
    label: "จำนวนยอดเงินทั้งหมด 2025",
    data: [],
    yAxisID: 'money-axis',
  }]
};

// public dataa3: any;

options = {
  maintainAspectRatio: true,
  scales: {
    yAxes: [
      {
        id: 'quantity-axis',
        ticks: {
          stepSize: 10,
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


currentData: any;
newData: any[] = [];

toggleChartData(year: string) {
  let newData: any = null;
  let newTitle: string = '';

  if (year === '2025') {
    newData = this.dataa2;
    newTitle = 'Chart with Data from API 2025';
    // console.log('New Data:', newData);
  } else if (year === '2024') {
    newData = this.dataa3;
    newTitle = 'Chart with Data from API 2024';
    // console.log('New Data:', newData);

    // เรียกใช้ loadDataForYear เพื่อให้โค้ดทำงานอัตโนมัติสำหรับปี 2024
    this.loadDataForYear(2024, this.dataa3);
  }

  this.currentData = newData;
  this.chartTitle = newTitle;
  
  this.zone.run(() => {
    this.cdr.detectChanges();
  });
}





}
