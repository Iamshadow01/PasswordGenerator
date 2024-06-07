const passdis = document.querySelector("[passdisplay]");
const copypass = document.querySelector("[datacopied]");
const copyshow = document.querySelector("[data-oncopy]");
const lengthofpass = document.querySelector("[passlength]");
const slider = document.querySelector("[length-slider]");
const uppercase = document.querySelector("#upper");
const lowercase = document.querySelector("#lower");
const numbers = document.querySelector("#num");
const symbols = document.querySelector("#Sym");
const everything = document.querySelectorAll("input[type=Checkbox]");
const indicator = document.querySelector("[data-indicator]");
const genpass = document.querySelector("[data-gen]");
let password = "";
let passwordlength = 10;
let checkcount=1;
handleslider();
function handleslider(){
    slider.value = passwordlength;
    lengthofpass.innerText = slider.value;
}
function fisherYatesShuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;

    }
    let str = "";
    arr.forEach((el)=>{
        str+=el;
    })
    return str;
  }
function setindicator(color){
    indicator.style.backgroundColor = color;
}
function getrndinteger(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}
function getrndnumber(){
    return getrndinteger(0,9);
}
function getrndlower(){
   return String.fromCharCode(getrndinteger(97,123));
}
function getrndupper(){
    return String.fromCharCode(getrndinteger(65,90));
}
function getrndsym(){
    return String.fromCharCode(getrndinteger(33,47));
}
function calstrength(){
    let haslower = false;
    let hasupper = false;
    let hasnum = false;
    let hassym = false;
    if(lowercase.checked)haslower=true;
    if(uppercase.checked)hasupper = true;
    if(numbers.checked)hasnum = true;
    if(symbols.checked)hassym = true;

    if(haslower && hasupper && (hasnum||hassym) && passwordlength>=8){
        setindicator("#0f0");
    }
    else if((haslower||hasupper) && (hasnum||hassym) && passwordlength>=6){
        setindicator("#ff0");
    }
    else{
        setindicator("#f00");
    }
}
async function copycontent(){
    try{
        await navigator.clipboard.writeText(passdis.value);
        copyshow.innerText = "copied";
    }
    catch(e){
        copyshow.innerText = "failed";
    }
    copyshow.style.display="inline";
    setTimeout(()=>{
        copyshow.style.display="none";
    },2000);
}
slider.addEventListener('input',(e)=>{
    passwordlength = e.target.value;
    handleslider();
})
copypass.addEventListener('click',()=>{
    if(passdis.value){
        copycontent();
    }
})
function handlecheckcount(){
    checkcount=0;
    console.log("Hallo");
    everything.forEach((checkbox)=>{
        if(checkbox.checked){
            checkcount++;
        }
    })
    if(passwordlength<checkcount){
        passwordlength=checkcount;
        handleslider();
    }
}
everything.forEach((checkbox)=>{
    checkbox.addEventListener('change',handlecheckcount);
})
genpass.addEventListener('click',()=>{
    if(checkcount<=0){
        return;
    }
    if(passwordlength<checkcount){
        passwordlength=checkcount;
        handleslider();
    }
    password="";
    console.log("Start korbe");
    let funcarr = [];
    if(uppercase.checked){
        funcarr.push(getrndupper);
    }
    if(lowercase.checked){
        funcarr.push(getrndlower);
    }
    if(numbers.checked){
        funcarr.push(getrndnumber);
    }
    if(symbols.checked){
        funcarr.push(getrndsym);
    }
    for(let i=0;i<funcarr.length;i++){
        password+=funcarr[i]();
    }
    console.log("Compulsory hoge");
    for(let i=0;i<passwordlength-funcarr.length;i++){
        let index = getrndinteger(0,funcarr.length);
        password+=funcarr[index]();
    }
    password=fisherYatesShuffle(Array.from(password));
    passdis.value = password;
    console.log("Display korbe");
    calstrength(); 
})