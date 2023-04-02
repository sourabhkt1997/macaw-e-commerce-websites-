
let url="https://lazy-plum-marlin-gown.cyclic.app/" 
let item=localStorage.getItem("element")||null
console.log(item)
let add=JSON.parse(localStorage.getItem("cart"))||[]
let token=localStorage.getItem("logintoken")||null
let userid=localStorage.getItem("userid")||null

let cartredirect= document.getElementById("nav_five")
    
cartredirect.addEventListener("click",()=>{
    if(token){
   console.log(8)
   window.location.href="./cart.html"
    }
    else{
        cartredirect.innerHTML=null
        cartredirect.innerHTML="PLEASE LOGIN FIRST"
    }

})


let logout=document.getElementById("logout")
      
        logout.addEventListener("click",()=>{
             if(token){
            console.log("ooo")
            localStorage.removeItem("logintoken")
            setTimeout(()=>{
                window.location.reload()
            },1000)
        }
 })

// sigin in and sign up...................

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
    fetch("https://lazy-plum-marlin-gown.cyclic.app//users/register",{
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
     let url=`https://lazy-plum-marlin-gown.cyclic.app//users/login`
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
         if(data.token){
         localStorage.setItem("logintoken",data.token)
         setTimeout(()=>{
            window.location.reload()
         },1000)
         }
         
         
     })
})
// .............................................................




let imgdiv=document.getElementById("proimg")
let path1=document.getElementById("path1")
let path2=document.getElementById("path2")
let namediv=document.getElementById("name")
let pricediv=document.getElementById("price")

let y=null
let elementdata=[]

async function product(){
   try{
    let res=await fetch(`${url}/products/${item}`)
     .then(res=>res.json())
     .then(data=>{
         console.log(data)
        data.forEach((element) => {
             y=element.category
             console.log(y)

            for(let i=0;i<element.image.length;i++){
                 let img=document.createElement("img")
                img.setAttribute("src",element.image[i])
                 imgdiv.append(img)
            }
            let pathA=document.createElement("a")
            pathA.setAttribute("href","./women.html")
            pathA.innerText=element.gender
            let pathB=document.createElement("a")
            pathB.setAttribute("href","./womenJacket.html")
            pathB.innerText=element.category
            path1.append(pathA)
            path2.append(pathB)
            let name=document.createElement("h3")
            name.innerText=element.title
            namediv.append(name)
            let price=document.createElement("h4")
            price.innerText=`INR ${element.price}`
            pricediv.append(price)


        });
     })

   }
   catch(error){
    console.log(error)
   }
}


 
let userobj=null

//checking cart /........................
let addtocart=document.getElementById("parchase")
if(token){
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
          userobj=data[0]
          let userdisplay=document.getElementById("signin")
        userdisplay.innerText=data[0].username
        let logout=document.getElementById("logout")
        logout.innerText="log out"
        logout.addEventListener("click",()=>{
            console.log("ooo")
            localStorage.removeItem("logintoken")
            setTimeout(()=>{
                window.location.reload()
            },1000)
           
        })
         for(let i=0;i<data[0].cartlist.length;i++){

            if(data[0].cartlist[i].id==item){
                addtocart.innerText="Go to cart"
                addtocart.classList.add("buy")
            }
         }
       })
   }
   catch(err){
       console.log(err)
   }
   }
   displayuser()
}





// .................adding to cart............
addtocart.addEventListener("click",(e)=>{

    e.preventDefault()
    if(token){
    let x=true;
    if(userobj.cartlist.length!==0){
    for(let i=0;i<userobj.cartlist.length;i++){
        if(userobj.cartlist[i].id===item){
            x=false
        }

    }
    }
    console.log(x)
    if(x==true){
        userobj.cartlist.push({id:item,quantity:1})
        console.log(userid)
        fetch(`${url}/users/useraccount/${userid}`,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body:JSON.stringify(userobj)
        })
        addtocart.innerText="Go to cart"
        addtocart.classList.add("buy")
        
    }
    else{
        addtocart.innerText="Redirecting To Cart"
        window.location.href="./cart.html"
    }
}
else{
    addtocart.innerText="Login first"
    addtocart.classList.add("loginfirst")

}
})

product()


