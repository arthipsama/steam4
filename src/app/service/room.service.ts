// src/app/room.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, delay, finalize, of } from 'rxjs';
import { LoaderService } from './loader.service';
import { RoomDTO } from '../models/room.model';
import { userData } from '../models/user.models';
import { ContactMeDTO } from '../models/contactme.model';
import { category, productData } from '../models/product.model';
import { ContentDTO } from '../models/content.model';
import { OrderDTO, OrderDetailDTO } from '../models/order.model';


@Injectable({
  providedIn: 'root'
})
export class RoomService  {

private apiUrl = 'http://localhost:3000/api/room';
// private apiUrl = 'https://test-back-js.onrender.com/api/room';

  constructor(private http: HttpClient) {}

  getRooms(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }


  users: userData[] = [
    {
      userid: '5033',
      // imagePath: '../assets/role/user.png',
      UserName: 'Jassa1',
      Email: 'jassa@jassa.orgjassa@jassajassajassajassajassaasdasdasdasdasd',
      FirstName: 'ArthipArthipArthipArthipArthipArthipArthipArthi',
      LastName: 'asdasdasSS1',
      PhoneNumber: '0987129295',
      Role: 'USER',
      Password:'123',
      Contact:'1852 บ้านสินธร ซอยจุ๋แซ้บๆ',
    },
    {
      userid: '5034',
      // imagePath: '../assets/role/admin.png', // แก้ที่นี้ให้ตรงกับที่คุณต้องการ
      UserName: 'Jassa2',
      Email: 'jassa@jassa.orgjassa',
      FirstName: 'Jassa3',
      PhoneNumber: '0987129295',
      LastName: 'S1d1d',
      Role: 'ADMIN',
      Password:'123',
      Contact:'1853 บ้านสินธร ซอยจุ๋แซ้บๆ',
    },
    {
      userid: '5035',
      // imagePath: '../assets/role/user.png', // แก้ที่นี้ให้ตรงกับที่คุณต้องการ
      UserName: 'Jassa3',
      Email: 'jassa@jassa.th',
      FirstName: 'Jassa3',
      LastName: 'SSS',
      PhoneNumber: '0987129295',
      Role: 'USER',
      Password:'123',
      Contact:'1854 บ้านสินธร ชาบูปิ้งย่าง',
    },
    {
      userid: '5036',
      // imagePath: '../assets/role/user.png', // แก้ที่นี้ให้ตรงกับที่คุณต้องการ
      UserName: 'Arthipsama',
      Email: 'arthip@gmail.com',
      FirstName: 'Arthip',
      LastName: 'Srain',
      PhoneNumber: '0987129295',
      Role: 'USER',
      Password:'123',
      Contact:'ฟิวเจอร์ หลังซอยวัด',
    },
    // เพิ่มข้อมูลอื่น ๆ ตามต้องการ
  ];


  contact: ContactMeDTO[] = [
    {
      contactmeid: 1 ,
      userid: 5033,
      textname: 'Jassa1',
      email: 'jassa@jassa.orgjassa@jassajassajassajassajassaasdasdasdasdasd',
      read: false,
      subject: 'อยากให้จัดโปรโมชั่นบ่อยๆ ได้ไหมครับ',
      textmessage: '1852 บ้านสินธร ซอยจุ๋แซ้บๆ',
      user: this.users.find(user => user.userid === '5033'),
    },
    {
      contactmeid: 2 ,
      userid: null,
      textname: 'Jassa2',
      email: 'jassa@jassa.orgjassa',
      read: true,
      subject: 'เกมน้อยไป',
      textmessage: '1853 บ้านสินธร ซอยจุ๋แซ้บๆ',
      user: this.users.find(user => user.userid === null),
    },
    {
      contactmeid: 3 ,
      userid: 5035,
      textname: 'Jassa3',
      email: 'jassa@jassa.orgjassa',
      read: false,
      subject: 'อยากได้เกมราคาถูก',
      textmessage: '1854 บ้านสินธร ชาบูปิ้งย่าง1854 บ้านสินธร ชาบูปิ้งย่าง1854 บ้านสินธร ชาบูปิ้งย่าง1854 บ้านสินธร ชาบูปิ้งย่าง1854 บ้านสินธร ชาบูปิ้งย่าง1854 บ้านสินธร ชาบูปิ้งย่าง1854 บ้านสินธร ชาบูปิ้งย่าง1854 บ้านสินธร ชาบูปิ้งย่าง',
      user: this.users.find(user => user.userid === '5035'),
    },
    // เพิ่มข้อมูลอื่น ๆ ตามต้องการ
  ];

  categoryproduct: category[] = [
    {
      categoryproductid: 1,
      CategoryProductName: 'keygame',
    },
    {
      categoryproductid: 2,
      CategoryProductName: 'steamwallet',
    },
    {
      categoryproductid: 3,
      CategoryProductName: 'idgame',
    },
    {
      categoryproductid: 4,
      CategoryProductName: 'program',
    },
  ];

  product: productData[] = [
    {
      productid: '1' ,
      ImgProduct: '../assets/Game/GTA.jpg',
      ProductName: 'GTA VGTA VGTA VGTA VGTA VGTA VGTA VGTA VGTA VGTA V',
      price: 1359,
      saleprice: 559 ,
      Description: 'เกมนี้ยิงปืน แล้วสู้กัน สู้กัน',
      quantity: 4,
      categoryproductid: 1,
      category: this.categoryproduct.find(category => category.categoryproductid === 1),
    },
    {
      productid: '2' ,
      ImgProduct: '../assets/Game/Elden.jpg',
      ProductName: 'Elden Ring',
      price: 1959,
      saleprice: 1259 ,
      Description: 'เกมนี้เนื้อเรื่อง แล้วสู้กัน สู้กัน',
      quantity: 2,
      categoryproductid: 2,
      category: this.categoryproduct.find(category => category.categoryproductid === 2),
    },
    {
      productid: '3' ,
      ImgProduct: '../assets/Game/FC24.jpg',
      ProductName: 'FC24',
      price: 1459,
      saleprice: undefined ,
      Description: 'เกมนี้เล่นบอล แล้วสู้กัน สู้กัน',
      quantity: 3,
      categoryproductid: 3,
      category: this.categoryproduct.find(category => category.categoryproductid === 3),
    },
    {
      productid: '4' ,
      ImgProduct: '../assets/Game/Party.jpg',
      ProductName: 'Party Animal',
      price: 1359,
      saleprice: 559 ,
      Description: 'เกมนี้สัตว์ต่อยกัน แล้วสู้กัน สู้กัน',
      quantity: 6,
      categoryproductid: 4,
      category: this.categoryproduct.find(category => category.categoryproductid === 4),
    },
    {
      productid: '5' ,
      ImgProduct: '../assets/Game/ดบดล.jpg',
      ProductName: 'Dead By Daylight',
      price: 259,
      saleprice: 159 ,
      Description: 'เกมนี้วิ่งหนี แล้วสู้กัน สู้กัน',
      quantity: 0,
      categoryproductid: 1,
      category: this.categoryproduct.find(category => category.categoryproductid === 1),
    },
    // เพิ่มข้อมูลอื่น ๆ ตามต้องการ
  ];

  content: ContentDTO[] = [
    {
      contentid: '1',
      ContentName: 'ลดราคาเกม 90% พลาดไม่ได้แล้ว!!!',
      ImgContentPath: '../assets/Content/1.jpg',
      type: true,
      Description: 'ลดขนาดนี้แจกฟรีเลยดีกว่าครับพรี่',
    },
    {
      contentid: '2',
      ContentName: 'Winter Sale กลับมาอีกครั้ง ลดราคาสูงสุด',
      ImgContentPath: '../assets/Content/2.jpg',
      type: false,
      Description: 'หนาวเกินไปไม่เล่นเกมล่ะ',
    },
    {
      contentid: '3',
      ContentName: 'แนะนำเกมใหม่น่าเล่น เดือนสิงหาคม',
      ImgContentPath: '../assets/Content/3.jpg',
      type: false,
      Description: 'ไม่เล่นจะเล่นแต่เกม Valorant สนุกกว่าเยอะไม่เล่นจะเล่นแต่เกม Valorant สนุกกว่าเยอะไม่เล่นจะเล่นแต่เกม Valorant สนุกกว่าเยอะไม่เล่นจะเล่นแต่เกม Valorant สนุกกว่าเยอะไม่เล่นจะเล่นแต่เกม Valorant สนุกกว่าเยอะไม่เล่นจะเล่นแต่เกม Valorant สนุกกว่าเยอะไม่เล่นจะเล่นแต่เกม Valorant สนุกกว่าเยอะไม่เล่นจะเล่นแต่เกม Valorant สนุกกว่าเยอะไม่เล่นจะเล่นแต่เกม Valorant สนุกกว่าเยอะไม่เล่นจะเล่นแต่เกม Valorant สนุกกว่าเยอะ',
    },
    {
      contentid: '4',
      ContentName: 'เปิดตัวเกมใหม่ "TheFianl" เกมหมา ไม่น่าเข้าไปเล่น',
      ImgContentPath: '../assets/Content/4.jpg',
      type: false,
      Description: 'เกมหมาแต่เราก็ยังเล่นกันทุกวันเลยครับ',
    },

  ];


  Orders: OrderDTO[] = [
    {
      ordersid: 1,
      userid: 5033,
      user: this.users.find(user => user.userid === '5033') || {} as userData,
      totalprice: '1500',
      productcode: '00001',
      image: '../assets/สลิป/01.jpg',
      paymentstatus: 'wait',
      remark: 'ไม่บอกกกกก',
      CreateBy: 'Jassa1',
      CreateDate: new Date(),
      UpdateBy: '',
      UpdateDate: null,
    },
    {
      ordersid: 2,
      userid: 5034,
      user: this.users.find(user => user.userid === '5034') || {} as userData,
      totalprice: '500',
      productcode: '00002',
      image: '../assets/สลิป/02.jpg',
      paymentstatus: 'checked',
      remark: '',
      CreateBy: 'Jassa2',
      CreateDate: new Date(),
      UpdateBy: '',
      UpdateDate: null,
    },
    {
      ordersid: 3,
      userid: 5035,
      user: this.users.find(user => user.userid === '5035') || {} as userData,
      totalprice: '200',
      productcode: '00003',
      image: '../assets/สลิป/03.jpg',
      paymentstatus: 'incorrect',
      remark: '',
      CreateBy: 'Jassa3',
      CreateDate: new Date(),
      UpdateBy: '',
      UpdateDate: null,
    },
    // ... ข้อมูลอื่น ๆ
  ];

  
  OrdersDetail: OrderDetailDTO[] = [
    {
      orderdetailid: 1,
      ordersid: 1,
      orders: this.Orders.find(Order => Order.ordersid === 1) || {} as OrderDTO,
      productid: 1,
      product: this.product.find(product => product.productid === '1') || {} as productData,
      quantity: '2',
      price: '718',
      CreateBy: 'Jassa1',
      CreateDate: new Date(),
      UpdateBy: '',
      UpdateDate: null,
    },

    {
      orderdetailid: 2,
      ordersid: 1,
      orders: this.Orders.find(Order => Order.ordersid === 1) || {} as OrderDTO,
      productid: 3,
      product: this.product.find(product => product.productid === '3') || {} as productData,
      quantity: '4',
      price: '1836',
      CreateBy: 'Jassa1',
      CreateDate: new Date(),
      UpdateBy: '',
      UpdateDate: null,
    },
    {
      orderdetailid: 3,
      ordersid: 2,
      orders: this.Orders.find(Order => Order.ordersid === 2) || {} as OrderDTO,
      productid: 4,
      product: this.product.find(product => product.productid === '4') || {} as productData,
      quantity: '3',
      price: '1555',
      CreateBy: 'Jassa2',
      CreateDate: new Date(),
      UpdateBy: '',
      UpdateDate: null,
    },
    {
      orderdetailid: 4,
      ordersid: 3,
      orders: this.Orders.find(Order => Order.ordersid === 3) || {} as OrderDTO,
      productid: 2,
      product: this.product.find(product => product.productid === '2') || {} as productData,
      quantity: '1',
      price: '239',
      CreateBy: 'Jassa3',
      CreateDate: new Date(),
      UpdateBy: '',
      UpdateDate: null,
    },

    // ... ข้อมูลอื่น ๆ
  ];


  getuser() {
    return this.users;
  }

  getcontact() {
    return this.contact;
  }

  getproduct() {
    return this.product;
  }

  getcategory(): Observable<category[]> {
    return of(this.categoryproduct);
  }

  getcontent() {
    return this.content;
  }

  getOrders() {
    return this.Orders;
  }

  getOrdersDetail() {
    return this.OrdersDetail;
  }
  

  getuserbyid(id: string): Observable<userData | undefined> {
    const product = this.users.find(p => p.userid === id);
    return of(product).pipe(delay(0)); // delay 500 milliseconds to simulate an API call
  }

  getcontactbyid(id: string): Observable<ContactMeDTO | undefined> {
    const product = this.contact.find(p => p.contactmeid === +id);
    return of(product).pipe(delay(0)); // delay 500 milliseconds to simulate an API call
  }

  getproductbyid(id: string): Observable<productData | undefined> {
    const product = this.product.find(p => p.productid === id);
    return of(product).pipe(delay(0)); // delay 500 milliseconds to simulate an API call
  }
    
  getcontentbyid(id: string): Observable<ContentDTO | undefined> {
    const product = this.content.find(p => p.contentid === id);
    return of(product).pipe(delay(0)); // delay 500 milliseconds to simulate an API call
  }

  getOrderById(ordersid: string): Observable<OrderDTO | undefined> {
    const order = this.Orders.find((o) => o.ordersid === +ordersid);
    return of(order).pipe(delay(0));
  }

  // ตัวอย่างเพิ่ม method ใน RoomService
  getOrderDetailByOrdersId(ordersId: string): Observable<OrderDetailDTO[]> {
    const orderDetails = this.OrdersDetail.filter(od => od.ordersid === +ordersId);
    return of(orderDetails).pipe(delay(0));
  }


}



