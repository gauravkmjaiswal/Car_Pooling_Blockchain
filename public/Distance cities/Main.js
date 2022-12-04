const GetLocation = async  (location)=>{
    
    let raw = await fetch(`https://geocode.xyz/?region=Asia&geoit=JSON&locate=${location}&auth=318997707352694419749x26131 )`);
    const dataCollection=await raw.json()
    console.log(dataCollection.latt + " and " + dataCollection.longt)
}

const searchLocation =async() =>{
    let searchFrom=document.querySelector('.from').value;
    let searchDest=document.querySelector('.dest').value;
    GetLocation(searchFrom)
    GetLocation(searchDest)
}
