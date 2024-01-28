import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertServiceService {

  constructor(
    private router: Router,
  ) {}  
  

  withOutTranslate = {
    onSuccess() {
      Swal.fire({
        title: 'Success!',
        text: 'บันทึกรายการข้อมูลสำเร็จ',
        icon: 'success',
        confirmButtonText: 'Okay',
      });
    },

    onProducts() {
     Swal.fire({
        title: 'Success!',
        text: 'บันทึกสินค้าลงตระกร้าสำเร็จ',
        icon: 'success',
        confirmButtonText: 'Okay',
      });
    
      // ทำงานหลังจาก Swal ปิด
      // เช่น การทำ redirect, แสดงข้อมูลอื่น ๆ
      // this.router.navigate(['/some-route']);
    }
    ,
    
    

    onDelete() {
      Swal.fire({
        title: 'Error!',
        text: 'ลบรายการข้อมูลสำเร็จ',
        icon: 'error',
        confirmButtonText: 'Okay',
      });
    },

    onError(message: string) {
      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
        confirmButtonText: 'Okay',
      });
    },

    // onWarning(message: string) {},
  };

  // ตัวอย่างการใช้ path : this.alertService.onSuccess('/master/team/'+this.Trainee.teamId+'/trainee');

  onSuccess(message: string, navigateTo?: string) {
    Swal.fire({
      title: 'Success!',
      text: message,
      icon: 'success',
      confirmButtonText: 'Okay',
    }).then(() => {
      this.router.navigate([navigateTo]); //path
    });
  }

  onSuccessPath(navigateTo?: string) {
    Swal.fire({
      title: 'Success!',
      text: 'Save completed',
      icon: 'success',
      confirmButtonText: 'Okay',
    }).then(() => {
      this.router.navigate([navigateTo]); //path
    });
  }

  onChangeStatus() {
    const delayInMilliseconds = 1000;
    return new Promise((resolve) => {
      setTimeout(() => {
        Swal.fire({
          title: 'Are you want to continue?',
          icon: 'question',
          confirmButtonText: 'Okay',
          showCancelButton: true,
          cancelButtonText: 'Cancel',
          reverseButtons: true,
        }).then((result) => {
          if (result.isDismissed && result.dismiss === Swal.DismissReason.cancel) {
            resolve(false); // กรณีผู้ใช้กด "Cancel" ให้คืนค่า true
          } else {
            resolve(true); // กรณีผู้ใช้กด "Okay" ให้คืนค่าตามผลลัพธ์จริง
          }
        });
      }, delayInMilliseconds);
    });
  }

  onConfirmRoute(message: string, navigateTo: string): Promise<boolean> {
    return new Promise((resolve) => {
      Swal.fire({
        title: 'กรุณาเลือก?',
        text: message,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Okay',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate([navigateTo]);
          resolve(true); // กรณีผู้ใช้กด "Okay" ให้คืนค่า true
        } else {
          resolve(false); // กรณีผู้ใช้กด "Cancel" ให้คืนค่า false
        }
      });
    });
  }

  

  
}
