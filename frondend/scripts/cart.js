
let url="http://localhost:8500" 
let token=localStorage.getItem("logintoken")||null
let cartpage=document.getElementById("cartpage");
let userid=localStorage.getItem("userid")||null

function showcartitem(data){
    cartpage.innerHTML=null
    
data.forEach((element,index)=>{
    
    let cartdiv=document.createElement("div")
    cartdiv.setAttribute("id","cartdiv")
    cartpage.append(cartdiv)
    let image=document.createElement("img")
    let title=document.createElement("h4") 
    let price=document.createElement("h3")
    let remove=document.createElement("button")
    let add=document.createElement("button")
    let number=document.createElement("span")
    let minus=document.createElement("button")

    image.setAttribute("src",element.image[0])

    title.innerText=element.title;
    price.innerText=element.price;
    remove.innerText="remove"
    add.innerText="+"
    minus.innerText="-"
    number.innerText=1
    remove.addEventListener("click",()=>{
       
        fetch(`${url}/users`,{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        .then(res=>res.json())
        .then(data=>{
            data[0].cartlist.splice(index,1)
            fetch(`${url}/users/useraccount/${userid}`,{
                method:"PATCH",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                },
                body:JSON.stringify({
                    cartlist:data[0].cartlist
                })
            })
         })
         cartpage.innerHTML=null
         showdom()
        
        
    })
    add.addEventListener("click",()=>{
        element.quantity+=1
        number.innerText=element.quantity
        localStorage.setItem("cart",JSON.stringify(data))
        localStorage.setItem("cartdata",JSON.stringify(data))
        showcartitem(data)
        
      })
      minus.addEventListener("click",()=>{
        if(element.quantity>1){
        element.quantity-=1
        number.innerText=element.quantity
        }
        localStorage.setItem("cartdata",JSON.stringify(data))
    })
    let sum=0
    let tprice=0;
    for(let i=0;i<data.length;i++){
       sum+=+data[i].quantity
       tprice+=data[i].quantity*data[i].price
    }
    document.getElementById("totalitem").innerText=sum
    document.getElementById("totalprice").innerText=tprice
    cartdiv.append(image,title,price,remove,add,number,minus)
})
}
// ...............................


function showdom(){
    let pushcartitem=[]
fetch(`${url}/users`,{
    method:"GET",
    headers:{
        "Authorization":`Bearer ${token}`
    }
})
.then(res=>res.json())
.then(data=>{ 
    
    let cartitemdata=data[0].cartlist
    
    console.log(pushcartitem,"be")
    cartitemdata.forEach(element=>{
        
        pushcartitem.push(element)

    })
    
   console.log(pushcartitem,"pc")
   let showdata=[]

    for(let i=0;i<pushcartitem.length;i++){
      
        fetch(`${url}/products/${pushcartitem[i].id}`)
        .then(res=>res.json())
        .then(data=>{ 
           showdata.push(data[0])
           console.log(showdata,"jj")
           showcartitem(showdata)
        
          
        })
    }
    pushcartitem=[]
    console.log(pushcartitem,"pcc")
    // async function asyncCall(){
    //     setTimeout(()=>{
    //         console.log(showdata,"dr")
            
    //      },1000)
    // }
    // asyncCall()
    
 
    
})

}
showdom()




