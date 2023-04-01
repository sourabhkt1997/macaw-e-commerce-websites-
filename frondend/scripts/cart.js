
let url="http://localhost:8500" 
let token=localStorage.getItem("logintoken")||null
let cartpage=document.getElementById("cartpage");
let userid=localStorage.getItem("userid")||null

let quantityarr=JSON.parse( localStorage.getItem("qantityarr"))||[]

 let totalitem=document.getElementById("totalitem")
let totalprice= document.getElementById("totalprice")


async function showcartitem(data){
    console.log(data.length)
    cartpage.innerHTML=null
    totalitem.innerText=data.length
    let tprice=0
    for(let i=0;i<data.length;i++){
        tprice+=data[i].price*quantityarr[i]
    }

     totalprice.innerText=tprice
     
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
    fetch(`${url}/users`,{
        method:"GET",
        headers:{
            "Authorization":`Bearer ${token}`
        }
    })
    .then(res=>res.json())
    .then(data=>{
        data[0].cartlist.forEach((ele)=>{
            if(ele.id==element._id){
                number.innerText=ele.quantity 
            }
        })  
   
    })

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
         showcartitem()
        //  window.location.reload
         
    })
    add.addEventListener("click",()=>{
        number.innerText=+number.innerText+1
        totalprice.innerText=+totalprice.innerText+element.price
       
        fetch(`${url}/users`,{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        .then(res=>res.json())
        .then(data=>{
            data[0].cartlist.forEach((ele)=>{
                if(ele.id==element._id){
                    ele.quantity=ele.quantity+1
                }
            })
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
        
      })

      
      minus.addEventListener("click",()=>{
        if(number.innerText>1){
        number.innerText=+number.innerText-1
        
        totalprice.innerText=+totalprice.innerText-element.price
        fetch(`${url}/users`,{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        .then(res=>res.json())
        .then(data=>{
            data[0].cartlist.forEach((ele)=>{
                if(ele.id==element._id){
                    ele.quantity=ele.quantity-1
                }
            })
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
    }
    })
      

    
    
    let quantityarr=[]
    fetch(`${url}/users`,{
        method:"GET",
        headers:{
            "Authorization":`Bearer ${token}`
        }
    })
    .then(res=>res.json())
    .then(data=>{
        data[0].cartlist.forEach((ele)=>{
          quantityarr.push(ele.quantity)
        }) 
        localStorage.setItem("qantityarr",JSON.stringify(quantityarr))
    })
    quantityarr.forEach(ele=>{
        tprice+=ele.element.price
    })
    
    
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
    cartitemdata.forEach(element=>{
        pushcartitem.push(element)

    })
   let showdata=[]

    for(let i=0;i<pushcartitem.length;i++){
      
        fetch(`${url}/products/${pushcartitem[i].id}`)
        .then(res=>res.json())
        .then(data=>{ 
           showdata.push(data[0])
           showcartitem(showdata)
        
          
        })
    }
    
    // pushcartitem=[]
    
})

}
// window.addEventListener("load",()=>{
    showdom()
// })

// ....sigin up .....................................

console.log(token)


let signinpop=document.getElementById("signinpopup")
let signuppop=document.getElementById("signuppopup")

let signin =document.getElementById("nav_four")


function opensignin(){
    signinpop.classList.add("opensignin")
}
function closesignin(){
    signinpop.classList.remove("opensignin")
}

function opensignup(){
   signuppop.classList.add("opensignup")
}
function closesignup(){
    signuppop.classList.remove("opensignup")
}

// sign in popup
let count=0
signin.addEventListener("click",()=>{
    if(!token){
    count++
   if(count%2!==0){
    opensignin()
   }
   else{
    closesignup()
    closesignin()
   }
}
})

 //signn up popup
let signup=document.getElementById("signup")

signup.addEventListener("click",()=>{
    closesignin()
    opensignup()
})

let signinalready=document.getElementById("signinalready")
signinalready.addEventListener("click",()=>{
    console.log(opensignup())
    closesignup()
    opensignin()
})



let signupsubmit=document.getElementById("signupsubmit")

//  signup............................
signupsubmit.addEventListener("click",()=>{
    
    let confirmpassword=document.getElementById("signuppasswordconfirm").value
let password=document.getElementById("signuppassword").value
let username=document.getElementById("username").value
console.log(password,confirmpassword)
if(password===confirmpassword && username&&password){
    fetch("http://localhost:8500/users/register",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email:document.getElementById("signupemail").value,
            password:document.getElementById("signuppassword").value,
            username:document.getElementById("username").value
        })
       })
       .then(res=>res.json())
       .then(data=>{
           let message=document.getElementById("message")
           message.innerText=data.message
        
       }) 
    }
    else{
        let message=document.getElementById("message")
        message.innerText="please check password"
    
}
})

let signinsubmit=document.getElementById("signinsubmit")

signinsubmit.addEventListener("click",()=>{
    let obj={
        email:document.getElementById("signinemail").value,
        password:document.getElementById("signinpassword").value,
        
     }
     console.log(obj)
     let url=`http://localhost:8500/users/login`
     fetch(url,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(obj)
     })
     .then(res=>res.json())
     .then(data=>{
        console.log(data)
         console.log(data.token)
         localStorage.setItem("logintoken",data.token)
     })
})

window.addEventListener("load",()=>{
 async function displayuser(){
    try{
     fetch(`${url}/users`,{
        method:"GET",
        headers:{
            "Authorization":`Bearer ${token}`
        }
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        localStorage.setItem("userid",data[0]._id)
        let userdisplay=document.getElementById("signin")
        userdisplay.innerText=data[0].username
        let logout=document.getElementById("logout")
        logout.innerText="log out"
        logout.addEventListener("click",()=>{
            localStorage.removeItem("logintoken");
        })

    })
}
catch(err){
    console.log(err)
}
}
displayuser()
})


let checkout=document.getElementById("upi")

checkout.addEventListener("click",()=>{
    fetch(`${url}/users`,{
        method:"GET",
        headers:{
            "Authorization":`Bearer ${token}`
        }
    })
    .then(res=>res.json())
    .then(data=>{
           if(data[0].cartlist.length!==0){
           let obj={
            buylist:data[0].buylist,
            cartlist:[]
           }
          console.log(obj.buylist.length,data[0].cartlist.length)
           for(let i=0;i<data[0].cartlist.length;i++){
            if(obj.buylist.length!==0){
            for(let j=0;j<obj.buylist.length;j++){
                if(data[0].cartlist[i].id !==obj.buylist[j].id ){
                    obj.buylist.push(data[0].cartlist[i])
                }
                else if(data[0].cartlist[i].id===obj.buylist[j].id ){
                    obj.buylist[j].quantity= obj.buylist[j].quantity+1
                    console.log(2)
                }
            }
            }
            else if(obj.buylist.length==0){
                obj.buylist.push(data[0].cartlist[i])
            }
           }
           console.log(obj)
        fetch(`${url}/users/useraccount/${userid}`,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body:JSON.stringify(obj)
        })
    setTimeout(()=>{
        window.location.href="./payment.html"
    },1000)
     }
    })

})










