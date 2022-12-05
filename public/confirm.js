var rawData = localStorage.getItem("objectToPass");
// localStorage.clear();
var data=JSON.parse(rawData)


let display = (price,name)=>{
    element=`<div style="display:flex;flex-direction:row">
    <div style="width:50%;">
        Price : 
    </div>
    <div style="text-align: end;width:50%;">
        Rs ${price.toFixed(2)}.
    </div>
</div>
<div style="display:flex;flex-direction:row">
    <div style="width:50%;">
        Service Choosen: 
    </div>
    <div style="text-align: end;width:50%;">
        ${name}
    </div>
</div>`
document.querySelector('.Nice').innerHTML+=element


}

var element
if(data.id==1)
{
    display(data.prices.OLA.estimate,"OLA")
}
else if(data.id==2)
{
    display(data.prices.RAPIDO.estimate,"Rapido")
}
else if(data.id==3)
{
    display(data.prices.UBER.estimate,"Uber")
}

async function myFunction(){
    const blockchainData = {
        fileHash: "dfasfd",
        senderIpaddress: "14.139.238.98"
    }
    let carSelect = ''
    let price
    if(data.id === 1){
        carSelect = 'OLA'
        price = data.prices.OLA.estimate
    }else if(data.id === 2){
        carSelect = 'Rapido'
        price = data.prices.RAPIDO.estimate
    }
    else{
        carSelect = 'Uber'
        price = data.prices.UBER.estimate
    }
    await fetch("http://localhost:8000/transaction", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({ serviceProvide:carSelect , price:price })
    })
}