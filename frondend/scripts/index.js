let url="https://lazy-plum-marlin-gown.cyclic.app/"


let token=localStorage.getItem("logintoken")||null
console.log(token)
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

// login in............
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

// display user...
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
        console.log(data)
        localStorage.setItem("userid",data[0]._id)
        let userdisplay=document.getElementById("signin")
        userdisplay.innerText=data[0].username
        let logout=document.getElementById("logout")
        logout.innerText="log out"
        logout.addEventListener("click",()=>{
            localStorage.removeItem("logintoken");
            
            setTimeout(()=>{
                window.location.reload()
            },1000)
           
        })

    })
}
catch(err){
    console.log(err)
}
}
displayuser()
  }

// ...........search..........//


let search=document.getElementById("search")
let searchdropdown=document.getElementById("searchdropdown")
search.addEventListener("input",()=>{
    searchdropdown.innerHTML=null
    let searchword=search.value
    
    
    fetch(`${url}/products/findproduct?proname=${searchword}`)

    .then(res=>res.json())
      .then(data=>{
    console.log(data)
      data.forEach(element => {
        let worddiv=document.createElement("div")
        worddiv.setAttribute("id","worddiv")
        worddiv.addEventListener("click",()=>{
            console.log("mm")
            localStorage.setItem("element",element._id)
            window.location.href="./individualproduct.html"
        })
         let word=document.createElement("h5")
         word.innerText=element.title
         worddiv.append(word)
         searchdropdown.append(worddiv)
         console.log(searchword)
        let x=false
        if(searchword){
         x=true
         }
         console.log(x)
         if(x==false){
        searchdropdown.innerHTML=null
          }
      });
    
    })
    

    
})
  
  


