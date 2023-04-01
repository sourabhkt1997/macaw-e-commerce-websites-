// let button=document.getElementById("submit")
let cartdata=JSON.parse(localStorage.getItem("cartdata"))
    // console.log(cartdata) 
let popup=document.getElementById("upi_div")
let process=document.getElementById("processpage")

function openprocess(){
    process.classList.add("openprocess")
} 

function openPopup(){
    setTimeout(()=>{
    popup.classList.add("open");
},3000)
}
function closePopup(){
    popup.classList.remove("open");
    process.classList.remove("openprocess")
    document.location.href ="./index.html"
    cartdata.forEach((element,index) => {
        cartdata.splice(index)
        
    localStorage.setItem("cartdata",JSON.stringify(cartdata))
    })


}


