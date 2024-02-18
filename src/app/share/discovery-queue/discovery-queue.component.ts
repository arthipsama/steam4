import { Component, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ColorService } from 'src/app/service/color.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-discovery-queue',
  templateUrl: './discovery-queue.component.html',
  styleUrls: ['./discovery-queue.component.scss']
})
export class DiscoveryQueueComponent {
  selectNo: any;
  product: any;

  constructor(private colorService: ColorService,
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router,
    private serviceProduct: ProductService) { }

  ngOnInit() {
    this.currentPage = 1;
    this.colorService.backgroundColor$.subscribe((color) => {
      this.renderer.setStyle(this.el.nativeElement.ownerDocument.body, 'background-color', color);
    });
    this.onClick(1);
  }

  onClick(event: any) {
    this.selectNo = event;
    if (this.selectNo == 1) {
      this.serviceProduct.getNewProduct().subscribe(x => {
        this.currentPage = 1;
        this.product = x;
        this.recordCount = this.product.length;
        this.discountProduct();
      })
    }
    else if(this.selectNo == 2){
      this.currentPage = 1;
      this.serviceProduct.getProductLess200().subscribe(x =>{
        this.product = x;
        this.recordCount = this.product.length;
        this.discountProduct();
      })
    }
    else if(this.selectNo == 3){
      this.currentPage = 1;
      this.serviceProduct.getProductLess500().subscribe(x =>{
        this.product = x;
        this.recordCount = this.product.length;
        this.discountProduct();
      })
    }
  }

  discountProduct(){
    this.product.forEach((product: any) => {
      if (product.saleprice) {
        const discountPercentage = ((product.price - product.saleprice) / product.price) *  100;
        product.percent = Math.round(discountPercentage);
      }
    });
  }

  gotoDetaileProduct(index:any){
    localStorage.setItem('productData', JSON.stringify(this.product[index]));
    this.router.navigate(['/product-detail'+'/'+this.product[index].ProductName]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // localStorage.setItem('productData', JSON.stringify(this.product[index]));
  }

  @Input() currentPage = 1;
  @Input() recordCount : number = 0;
  @Output() pageChange = new EventEmitter();
  itemsPerPage: number = 5; 

  pageChanged(event: any): void {
    this.currentPage = event;
    // console.log('pageChanged ' ,event);
    this.pageChange.emit(this.currentPage);
  }
}
