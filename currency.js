const dropdowns = document.querySelectorAll(".dropdown select");
const btn= document.querySelector("form button");
const fromCurr= document.querySelector(".from select");
const toCurr=document.querySelector(".To select");
const amount= document.querySelector(".amount input");
const msg=document.querySelector(".msg");
let apikey="232b88761859e49edc0e0b6b";

for (let select of dropdowns){
    for(currCode in countryList){
        let newOption= document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name ==="from" && currCode==="USD")
        {
            newOption.selected="selected";
        }
        else if(select.name==="To" &&  currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }



select.addEventListener("change", (evt)=>{
  updateFlag(evt.target);
});
}
const updateFlag =(element)=>{
let currCode = element.value;
let countryCode = countryList[currCode];
let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
let img=element.parentElement.querySelector("img");
img.src=newSrc;
};



btn.addEventListener("click", (e)=>{
  e.preventDefault();
  getExchangerate();
});

window.addEventListener("load", ()=>{
  getExchangerate();
});
const getExchangerate=()=>{
let amountVal=amount.value;
if(amountVal==""||amountVal<1)
{
    amount.value=1;
    amountVal=1;
}
msg.innerHTML="getting ....";

let url=`https://v6.exchangerate-api.com/v6/${apikey}/latest/${fromCurr.value}`;
fetch(url)
.then((response)=>response.json())
.then((result)=>{
     let exchangerate=result.conversion_rates[toCurr.value];
     let totalexchangerate=(amountVal * exchangerate).toFixed(2);
     msg.innerText=`${amountVal} ${fromCurr.value} = ${totalexchangerate} ${toCurr.value}`;

})
.catch(()=>{
    msg.innerText=`something went wrong `;
});

}






