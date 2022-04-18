let isedit=false;
let editindex=-1;
tablecreate();
function managedata(){
   let fname=document.getElementById('fname').value;
   let lname=document.getElementById('lname').value;
   let email=document.getElementById('email').value;
   let contact=document.getElementById('contact').value;
   let Address=document.getElementById('Address').value;
   let city=document.getElementById('city').value;
   let country=document.getElementById('country').value;
   let date=document.getElementById('date').value;
   let radio=document.querySelector('input[type="radio"]:checked').value; 
   let checkbox=document.querySelectorAll('input[type="checkbox"]');
   let checktype=[];
   for(let i=0;i<checkbox.length;i++){
       if(checkbox[i].checked){
           checktype.push(checkbox[i].value)
           console.log(checktype);
       }
   }
   let image = document.getElementById("file-img").files[0];
   console.log(image);
   let img=URL.createObjectURL(image);
   let orderid=isedit ?  data[editindex].orderid:ganerateRandom(500);



   let data=JSON.parse(localStorage.getItem('get'))?JSON.parse(localStorage.getItem('get')):[];

   let editdata={
               
       "fname":fname,
       "lname":lname,
       "email":email,
       "contact":contact,
       "Address":Address,
       "city":city,
       "country":country,
       "radio":radio,
       "checkbox":checktype,
       "orderdate":date,
       orderid,
       img,
   }
   if(isedit){
       isedit=false;
       data[editindex]=editdata;
       editindex=-1;
   }
   else{
       data.push(editdata);
   }

localStorage.setItem('get',JSON.stringify(data));
tablecreate();
}


function tablecreate(){
   let html =" ";
   let getdata=JSON.parse(localStorage.getItem('get'));
   console.log("hjkhu",getdata);
   let table=document.getElementById('table');
       html+= `
       <tr>
   <th scope="column" class="black">FirstName</th>
   <th scope="column" class="black">Lastname</th>
   <th scope="column" class="black">Email</th>
   <th scope="column" class="black">Conatct</th>
   <th scope="column" class="black">Address</th>
   <th scope="column" class="black">city</th>
   <th scope="column" class="black">Country</th>
   <th scope="column" class="black">Orderdate</th>
   <th scope="column" class="black">Orderid</th>
   <th scope="column" class="black">Radio</th>
   <th scope="column" class="black">Productlist</th>
   <th scope="column" class="black">Img</th>
 <th scope="column" class="black">Edit</th>
   <th scope="column" class="black">Delete</th>
 
    </tr>`

    for(let i=0;i<getdata.length;i++){
        html+=`<tr>
        <td class="black">${getdata[i].fname}</td>
        <td class="black">${getdata[i].lname}</td>
        <td class="black">${getdata[i].email}</td>
        <td class="black">${getdata[i].contact}</td>
        <td class="black">${getdata[i].Address}</td>
        <td class="black">${getdata[i].city}</td>
        <td class="black">${getdata[i].country}</td>
        <td class="black">${getdata[i].orderdate}</td>
        <td class="black">${getdata[i].orderid}</td>
        <td class="black">${getdata[i].radio}</td>
        <td class="black">${getdata[i].checkbox}</td>
        <td class="black"><img class="set-img"src="${getdata[i].img}"></img></td>


        <td class="black">
        <button type= button onClick=editbutton(${i});>Edit</button>
        </td>
        <td class="black">
        <button type= button onClick="Deletebutton(${i});">Delete</button>
        </td>
        </tr>`
    }
   
 table.innerHTML=html;
}
   let index,table=document.getElementById('table')
   
function editbutton(i){
   let getdata=JSON.parse(localStorage.getItem('get'));
   document.getElementById('btn').innerHTML="Save";
   console.log(getdata);

   isedit=true;
   editindex=i;

   let name=getdata[i].fname;
   let name1=getdata[i].lname;
   let email=getdata[i].email;
   let contact=getdata[i].contact;
   let Address=getdata[i].Address;
   let city=getdata[i].city;
   let country=getdata[i].country;
   let radio=getdata[i].radio;
   let date=getdata[i].orderdate;
   let checkbox=getdata[i].checkbox;

   
   document.getElementById('fname').value=name;
   document.getElementById('lname').value=name1;
   document.getElementById('email').value=email;
   document.getElementById('contact').value=contact;
   document.getElementById('Address').value=Address;
   document.getElementById('city').value=city;
   document.getElementById('country').value=country;
   document.getElementById('date').value=date;
   let radiobtn=document.querySelectorAll('input[type="radio"]');
   for(let i=0;i<radiobtn.length;i++){
       console.log(radiobtn[i].value,'radio')
       radiobtn[i].checked=radiobtn[i].value===radio;

   }

   let checkboxs=document.querySelectorAll('input[type="checkbox"]');
   // console.log(checkboxs);
   for(let i=0;i<checkboxs.length;i++){   
       console.log(checkbox,'checkbox')
       checkboxs[i].checked=checkbox.includes(checkboxs[i].value);

   }

}
function Deletebutton(i){
   let getdata=JSON.parse(localStorage.getItem('get'));
   // console.log(i,getdata);

   getdata.splice(i,1);
      
       localStorage.setItem('get',JSON.stringify(getdata));
       console.log(getdata);
   

   tablecreate();

}

function validate(){

   isValid=true;
   if(document.getElementById("fname").value == " "){
       isValid=false;
       document.getElementById("namevalidation-error").classList.remove("hide");
   }
   // let name=document.myform.name.value;
   // let email=document.myform.email.value;
   // let contact=document.myform.contact.value;
   // let Address=document.myform.Address.value;

   // let nameErr=emailErr=conatctErr=addressErr=true;

   // if(name==""){
   //     printEroor(nameErr,"Please enter your name");
   // }
   // else{
   //     let regex=/^[a-zA-Z\s]+$/;  
   //     if(regex.test(name)==false){
   //         printError(nameErr, "Please enter a valid name");
   //     }
   //     else{
   //         printError(nameErr, "");
   //         nameErr = false;
   //     }
   // }



}
function ganerateRandom(maxLimit=100){
   let randomnum=Math.random()*maxLimit;
   randomnum=Math.floor(randomnum);
   return randomnum;
}
console.log(ganerateRandom(500));
