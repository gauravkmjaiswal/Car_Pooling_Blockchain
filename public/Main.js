
const GetLocation = async  (location)=>{
    
    let raw = await fetch(`https://geocode.xyz/?region=Asia&geoit=JSON&locate=${location}&auth=318997707352694419749x26131 )`);
    const dataCollection=await raw.json()
    return({"lati":dataCollection.latt,"long":dataCollection.longt})
}

const searchLocation =async() =>{
    let searchFrom=document.querySelector('.from').value;
    let searchDest=document.querySelector('.dest').value;
    from = await GetLocation(searchFrom)
    desti = await GetLocation(searchDest)
    
    let raw = await fetch(`/getEstimate?startLatitude=${from.lati}&startLongitude=${from.long}&endLatitude=${desti.lati}&endLongitude=${desti.long}`);
    const dataCollection=await raw.json()

    const prices = await dataCollection
    console.log(prices)
}
