import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
declare var window: any;
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  @ViewChild('paytm-checkoutjs') private div_element_id: ElementRef;

  CUST_ID = "CUST001";
  ORDER_ID = "ORDORDS" + Date.now();
  MID = "SMnxGN10988548912165";
  TXN_AMOUNT = "1";
  token;
  constructor(private httpClient: HttpClient ,private zone:NgZone) {
    // this.div_element_id.nativeElement.innerHTML = "ABCD";
  }
  payNow() {
    const formData = new FormData();
    formData.append("MID", this.MID);
    formData.append("CUST_ID", this.CUST_ID);
    formData.append("ORDER_ID", this.ORDER_ID);
    formData.append("TXN_AMOUNT", this.TXN_AMOUNT);
    this.httpClient.post("http://localhost/paytmBackend/api.php", formData).toPromise().then((res) => {
      this.post(res, "https://securegw-stage.paytm.in/theia/processTransaction");
    });
  }
  post(obj, url) {
    var mapForm = document.createElement("form");
    //mapForm.target = "_blank";
    mapForm.method = "GET"; // or "post" if appropriate
    mapForm.action = url;
    Object.keys(obj).forEach(function (param) {
      var mapInput = document.createElement("input");
      mapInput.type = "hidden";
      mapInput.name = param;
      mapInput.setAttribute("value", obj[param]);
      mapForm.appendChild(mapInput);
    });
    document.body.appendChild(mapForm);
    mapForm.submit();
  }
  payWithJs() {
    alert("Trying With CheckoutJs");
    const formData = new FormData();
    formData.append("MID", this.MID);
    formData.append("CUST_ID", this.CUST_ID);
    formData.append("ORDER_ID", this.ORDER_ID);
    formData.append("TXN_AMOUNT", this.TXN_AMOUNT);
    this.httpClient.post("http://localhost/paytmBackend/api.php", formData).toPromise().then((res: any) => {
      this.token = res.CHECKSUMHASH;
      var config = {
        "root": "",
        "flow": "DEFAULT",
        "data": {
          "mid":this.MID,
          "orderId": this.ORDER_ID, /* update order id */
          "token": this.token, /* update token value */
          "tokenType": "TXN_TOKEN",
          "amount": this.TXN_AMOUNT ,/* update amount */
          "userDetail":{
            mobileNumber:"7273000898",
            name:"ROhit Kumar"
          }

        },
        "handler": {
          "notifyMerchant": function (eventName, data) {
            console.log("notifyMerchant handler function called");
            console.log("eventName => ", eventName);
            console.log("data => ", data);
          }
        }
      };
      this.zone.runOutsideAngular(()=>{
        if(window.Paytm && window.Paytm.CheckoutJS){
          setTimeout(()=>{
            // window.Paytm.CheckoutJS.onLoad=()=>{
            //   console.log("loaded");
            // }
            // console.log( window.Paytm.CheckoutJS.onLoad);
            // console.log(config,"Config");
            // window.Paytm.CheckoutJS.invoke();
            window.Paytm.CheckoutJS.init(config).then(()=>{

            }).catch((e)=>{
              console.log("error => ",e);

            });
            window.Paytm.CheckoutJS.invoke();
          },500);
      }
      });
    });
  }



}
