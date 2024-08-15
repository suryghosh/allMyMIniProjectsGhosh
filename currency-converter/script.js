const BASE_URL = "https://2024-03-06.currency-api.pages.dev/v1/currencies/";

let select_cont = document.querySelectorAll('.select-container select');
const btn = document.querySelector("#exchange");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

//console.log(select_cont);

for(selects of select_cont){
    //console.log(selects);
    for(codes in countryList){
        let option = document.createElement('option');
        option.value = codes;
        option.innerText = codes;
        selects.append(option);
        if(selects.name === 'from' && codes === 'USD'){
            option.selected = true;
        }
        else if(selects.name === 'to' && codes === 'INR'){
            option.selected = true;
        }
        
    }
    selects.addEventListener('change',(evt) =>{
        updateFlag(evt.target);
    })
}

const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src = newsrc;
}

btn.addEventListener('click',async (evt) =>{
    evt.preventDefault();
    let amount = document.querySelector('#amt');
    let amtValue  = amount.value;
    if(amtValue === "" || amtValue < 1){
        amtValue = 1;
        amount.value = 1;
    }
    
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let toCurrVal = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    let finalAmount = amtValue*toCurrVal;
    msg.innerText = `${amount.value} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    
    
})

//changing flags



