
const GetLocation = async  (location)=>{
    
    let raw = await fetch(`https://geocode.xyz/?region=Asia&geoit=JSON&locate=${location}&auth=318997707352694419749x26131 )`);
    const dataCollection=await raw.json()
    console.log(dataCollection.latt+" @ "+dataCollection.longt)
    return({"lati":dataCollection.latt,"long":dataCollection.longt})
}

const searchLocation =async() =>{
    console.log("check")
    let searchFrom=document.querySelector('.from').value;
    let searchDest=document.querySelector('.dest').value;
    from = await GetLocation(searchFrom)
    desti = await GetLocation(searchDest)
    
    let raw = await fetch(`/getEstimate?startLatitude=${from.lati}&startLongitude=${from.long}&endLatitude=${desti.lati}&endLongitude=${desti.long}`);
    const dataCollection=await raw.json()

    const prices = await dataCollection
    console.log(prices)

    let data=`<h1>our <span>tarrif</span></h1>
    <div class="inner-tarrif">
        <div class="tarrif-container">
            <div class="inner-box">
                <img src="images/image1.png" alt="">
                <h2>OLA class</h2>
                
                <h3>price: ${prices.OLA.estimate.toFixed(2)} /-</h3>
                <a href="/confirm" class="OLA">order now</a>
            </div>
        </div>

        <div class="tarrif-container">
            <div class="inner-box">
                <img src="images/image1.png" alt="">
                <h2 class="heading-yellow">RAPIDO class</h2>
                
                <h3 class="yellw-section">price:${prices.RAPIDO.estimate.toFixed(2)} /-</h3>
                <a href="/confirm" class="btn-yellow RAPIDO">order now</a>
            </div>
        </div>

        <div class="tarrif-container">
            <div class="inner-box">
                <img src="images/image1.png" alt="">
                <h2>UBER class</h2>
                
                <h3>price: ${prices.UBER.estimate.toFixed(2)} /-</h3>
                <a href="/confirm" class="UBER">order now</a>
            </div>
        </div>
    </div>`

    
    document.querySelector('.Cards').innerHTML+=data
    await document.querySelector(".UBER").addEventListener('mouseover',UberClicker);
    await document.querySelector(".OLA").addEventListener('mouseover',OlaClicker);
    await document.querySelector(".RAPIDO").addEventListener('mouseover',RapidoClicker);
    // document.querySelector(".").addEventListener("mouseover", onclick);

    function UberClicker() {
        console.log("gaurav km jaiswal")
        let sendData={
            prices,
            id:3
        }
        localStorage.setItem( 'objectToPass',JSON.stringify(sendData) );
    }
    function OlaClicker() {
        console.log("gaurav km jaiswal2")
        let sendData={
            prices,
            id:1
        }
        localStorage.setItem( 'objectToPass',JSON.stringify(sendData) );
    }
    function RapidoClicker() {
        console.log("gaurav km jaiswal3")
        let sendData={
            prices,
            id:2
        }
        localStorage.setItem( 'objectToPass',JSON.stringify(sendData) );
    }
    
}
