let isedit = false;
let editindex = -1;
tablecreate();

document.getElementById("myform").addEventListener('submit', managedata);

function managedata(event) {
    event.preventDefault();
    let data = JSON.parse(localStorage.getItem('get')) ? JSON.parse(localStorage.getItem('get')) : [];
    let fname = document.getElementById('fname').value;
    let lname = document.getElementById('lname').value;
    let email = document.getElementById('email').value;
    let contact = document.getElementById('contact').value;
    let Address = document.getElementById('Address').value;
    console.log("Address : ", Address);
    let city = document.getElementById('city').value;
    let country = document.getElementById('country').value;
    let date = document.getElementById('date').value;
    let radio = document.querySelectorAll('input[type="radio"]');
    let radiocheck=[];
    for (let i=0;i<radio.length;i++){
        if(radio[i].checked){
            radiocheck.push(radio[i].value)
            console.log(radiocheck);
        }
    }
    let checkbox = document.querySelectorAll('input[type="checkbox"]');
    let checktype = [];
    for (let i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked) {
            checktype.push(checkbox[i].value)
            console.log(checktype);
        }
    }
    let image = document.getElementById("file-img").files[0]||{};
    console.log(image);
    let img =image.name;
    let orderid = isedit ? data[editindex].orderid : ganerateRandom(500);


    let editdata = {

        "fname": fname,
        "lname": lname,
        "email": email,
        "contact": contact,
        "Address": Address,
        "city": city,
        "country": country,
        "radio": radiocheck,
        "checkbox": checktype,
        "orderdate": date,
        orderid,
        img
    }
    if (validate(editdata)) {
        if (isedit) {
            isedit = false;
            data[editindex] = editdata;
            editindex = -1;
            document.getElementById('btn').innerHTML = "Submit";
        } else {
            data.push(editdata);
        }
        // console.log(data,JSON.stringify(data))
        localStorage.setItem('get', JSON.stringify(data));
        tablecreate();
        return true;
    }

}




function tablecreate() {
    let html = " ";
    let getdata = JSON.parse(localStorage.getItem('get'))||[];
    // console.log("hjkhu", getdata);
    let tableHead = document.getElementById('table-head');
    let tableBody = document.getElementById('table-body');
    tableHead.innerHTML = `
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

    for (let i = 0; i < getdata.length; i++) {
        html += `<tr>
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

    tableBody.innerHTML = html;
    document.getElementById('myform').reset();
}
//    let index,table=document.getElementById('table')

function editbutton(i) {
    let getdata = JSON.parse(localStorage.getItem('get'));
    document.getElementById('btn').innerHTML = "Save";
    console.log(getdata);

    isedit = true;
    editindex = i;

    let name = getdata[i].fname;
    let name1 = getdata[i].lname;
    let email = getdata[i].email;
    let contact = getdata[i].contact;
    let Address = getdata[i].Address;
    let city = getdata[i].city;
    let country = getdata[i].country;
    let radio = getdata[i].radio;
    let date = getdata[i].orderdate;
    let checkbox = getdata[i].checkbox;


    document.getElementById('fname').value = name;
    document.getElementById('lname').value = name1;
    document.getElementById('email').value = email;
    document.getElementById('contact').value = contact;
    document.getElementById('Address').value = Address;
    document.getElementById('city').value = city;
    document.getElementById('country').value = country;
    document.getElementById('date').value = date;
    let radiobtn = document.querySelectorAll('input[type="radio"]');
    for (let i = 0; i < radiobtn.length; i++) {
        console.log(radiobtn,'radio')
        radiobtn[i].checked=radio.includes(radiobtn[i].value);
        // console.log(radiobtn[i].value, 'radio')
        // radiobtn[i].checked = radiobtn[i].value === radio;

    }

    let checkboxs = document.querySelectorAll('input[type="checkbox"]');

    for (let i = 0; i < checkboxs.length; i++) {
        console.log(checkbox, 'checkbox')
        checkboxs[i].checked = checkbox.includes(checkboxs[i].value);

    }


}

function Deletebutton(i) {
    let getdata = JSON.parse(localStorage.getItem('get'));
    // console.log(i,getdata);

    getdata.splice(i, 1);

    localStorage.setItem('get', JSON.stringify(getdata));
    console.log(getdata);


    tablecreate();

}


function ganerateRandom(maxLimit = 100) {
    let randomnum = Math.random() * maxLimit;
    randomnum = Math.floor(randomnum);
    return randomnum;
}
// console.log(ganerateRandom(500));


// function imagevalidation() {
//     let userfile = document.getElementById('file-img');
//     let file = userfile.value;
//     let extensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

//     if (!extensions.exec(file)) {
//         alert('Photo only allows file types of GIF, PNG, JPG, JPEG');
//         userfile.value = "";
//         return false;
//     }
// }


const validateFname = (fname) => {
    if (fname == "") {
        console.log("Name validation function", fname);
        document.getElementById('namevalidation-error').innerHTML = " *Please Enter Your Valid Name";
        return false;
    } else {
        document.getElementById('namevalidation-error').innerHTML = "";
        return true;
    }
}
const validateLname = (lname) => {
    if (lname == "") {
        console.log("Name validation function", lname);
        document.getElementById('lastnamevalidation-error').innerHTML = " *Please Enter Your Valid Name";
        return false;
    } else {
        document.getElementById('lastnamevalidation-error').innerHTML = "";
        return true;
    }
}
const validateemail = (email) => {
    if (email == "") {
        console.log('email in error')
        document.getElementById('emailvalidation-error').innerHTML = " *Please Enter Your Email";
        return false;

    } else {
        document.getElementById('emailvalidation-error').innerHTML = "";
        return true;
    }
}
const validateconatct = (contact) => {

    if (isNaN(contact) || contact === "") {
        console.log('conatct in error')
        document.getElementById('contactvalidation-error').innerHTML = " *Please Enter Your conatct";
        return false;

    } else {
        document.getElementById('contactvalidation-error').innerHTML = "";
        return true;
    }
}
const validateaddress = (address) => {
    console.log("address : ", address);

    if (address === "") {

        document.getElementById('Addressvalidation-error').innerHTML = " *Please Enter Your address";
        return false;

    } else {
        document.getElementById('Addressvalidation-error').innerHTML = "";
        return true;
    }
}
const validatecity = (city) => {

    if (city == "") {
        console.log('city in error')
        document.getElementById('cityvalidation-error').innerHTML = " *Please Enter Your City";
        return false;

    } else {
        document.getElementById('cityvalidation-error').innerHTML = "";
        return true;
    }
}
// const validatecountry = (country) => {
//     if (country) {
//         console.log('country in error')
//         document.getElementById('countryvalidation-error').innerHTML = " *Please Enter Your Country";
//         return false;

//     } else {
//         document.getElementById('countryvalidation-error').innerHTML = "";
//         return true;
//     }
// }
const validatedate = (orderdate) => {

    if (orderdate == "") {
        console.log('date in error')
        document.getElementById('date-error').innerHTML = " *Please Enter Your Orderdate";
        return false;

    } else {
        document.getElementById('date-error').innerHTML = "";
        return true;
    }
}

const validateradio = (radio) => {
    // let radiobtn=document.getElementsByName('radio-btn');

    let radiovalid=false;
    let i=0;
    radiovalid = radio.length >0
    // while (!radiovalid && i < radio.length) {
    //     console.log((radio[i]))
    //     if (radio[i].checked)
    //     radiovalid = true;
    //     i++;
    // }
    console.log(radiovalid);
    if(!radiovalid) {
        document.getElementById('radio-btn').innerHTML = 'Must check at list one option!';
        return false;
    }
    else{
        document.getElementById('radio-btn').innerHTML = '';
        // return true;
    }
    return radiovalid;
}
const validatechecktype = (checkbox) => {
    let check=false;
    let i=0;
    console.log(checkbox);
    check = checkbox.length > 0
    // while(!check && i < checkbox.length){
    //     if(checkbox[i].checked)
    //     check=true;
    //     i++;
    // }
    if(!check){
        document.getElementById('check-btn').innerHTML="Must check at list one option!";
        return false;
    }
    else{
        document.getElementById('check-btn').innerHTML= '';
        return true;

    }
   
}




function validate(value) {
    // debugger;
    console.log("Value : ", value);
    const validatedFname = validateFname(value.fname);
    const validatedLname = validateLname(value.lname);
    const validatedemail = validateemail(value.email);
    const validatedconatct = validateconatct(value.contact);
    const validatedaddress = validateaddress(value.Address);
    const validatedcity = validatecity(value.city);
    // const validatedcountry = validatecountry(value.country);
    const validateddate=validatedate(value.orderdate);
    const validatedradio = validateradio(value.radio);
    const validatedchecktype=validatechecktype(value.checkbox);


    if (validatedFname && validatedLname && validatedemail && validatedconatct && validatedaddress && validatedcity && validateddate && validatedradio && validatedchecktype) {
        console.log("Validated");
        return true;
    } else {
        console.log("Failed");
        return false;
    }

}


// function validate(){
//      isValid = true;

//     if(document.getElementById('fname').value == ""){
//         isValid = false;
//         document.getElementById("namevalidation-error").classList.remove("hide");
//     }else{
//         isValid = true;
//         if(!document.getElementById("namevalidation-error").classList.contains("hide")){
//             document.getElementById("namevalidation-error").classList.add("hide")
//         }
//     }


//     if(document.getElementById('lname').value == ""){
//         document.getElementById("lastnamevalidation-error").classList.remove("hide");
//         isValid = false;
//     }else{
//         isValid = true;
//         if(!document.getElementById("lastnamevalidation-error").classList.contains("hide")){
//             document.getElementById("lastnamevalidation-error").classList.add("hide")
//         }
//     }

//     // let email=/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
//     // let emailadd=getElementById('email').value;
//     // if(document.getElementById('email').value ==""){
//     //     document.getElementById("emailvalidation-error").innerHTML="This required";

//     // }



// let phoneNum = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/; 
// let num=document.getElementById('contact').value;
// if(document.getElementById('contact').value == ""){
//     document.getElementById("contactvalidation-error").innerHTML="This required";
//     // alert("this is mlkoio");
// }
// if(num.match(phoneNum)){
//     isValid = true

// }
// else{
//   document.getElementById("contactvalidation-error").innerHTML="Enter Valid Number"
//   isValid = false;
// }


//     return isValid;
// }