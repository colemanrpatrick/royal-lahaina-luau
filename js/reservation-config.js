 //to do: incorperate this parameter into cartData (see sealifeparkluau.com for example)
let highlightData = {}
 
const securityImgSrc = "images/shieldlock.svg";

let checkoutButtonA = document.getElementById("vip-reservation");
let checkoutButtonB = document.getElementById("general-reservation");

checkoutButtonA.onclick = () => {
     setDatepickerKey();
     setReservationWindow('VIP Luau');
}  
checkoutButtonB.onclick = () => {
     setDatepickerKey();
     setReservationWindow('General Luau');
};

switch (window.location.hash) {
     case "#general-seating":

          setDatepickerKey();
          setReservationWindow('General Luau');
          break;
     
     case "#vip-seating":

          setDatepickerKey();
          setReservationWindow('VIP Luau');
          break;

     default:
          // do nothing
          break;
}