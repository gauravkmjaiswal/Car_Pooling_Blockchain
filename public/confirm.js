var rawData = localStorage.getItem("objectToPass");
localStorage.clear();
var data=JSON.parse(rawData)
console.log(data)

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
