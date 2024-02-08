import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentDTO } from 'src/app/models/content.model';
import { ColorService } from 'src/app/service/color.service';
import { ContenUserService } from 'src/app/service/content-user.service';

@Component({
  selector: 'app-user-content',
  templateUrl: './user-content.component.html',
  styleUrls: ['./user-content.component.scss']
})
export class UserContentComponent {
  content!: ContentDTO;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private serviceContent: ContenUserService,
              private colorService: ColorService,
              private renderer: Renderer2, 
              private el: ElementRef){}

  ngOnInit(){
    this.colorService.backgroundColor$.subscribe((color) => {
      this.renderer.setStyle(this.el.nativeElement.ownerDocument.body, 'background-color', color);
    });
    this.getDataContent();
  }

  getDataContent(){
    this.route.queryParams.subscribe(params => {
      const indexContent = params['number'];
      this.serviceContent.getContent().subscribe(x=>{
        this.content = x[indexContent]
      })
    })
  }
}
