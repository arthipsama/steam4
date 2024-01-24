import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  mybutton: HTMLElement | null = null;

  ngOnInit(): void {
    // Get the button:
    this.mybutton = document.getElementById("myBtn");

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = () => this.scrollFunction();
  }

  scrollFunction(): void {
    if (this.mybutton) {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        this.mybutton.style.display = "block";
      } else {
        this.mybutton.style.display = "none";
      }
    }
  }

  topFunction(): void {
    if (document.body.scrollTop !== undefined) {
      document.body.scrollTop = 0; // For Safari
    }
    if (document.documentElement.scrollTop !== undefined) {
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
  }
}
