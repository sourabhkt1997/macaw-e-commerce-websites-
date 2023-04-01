let url="http://localhost:8500"


let token=localStorage.getItem("logintoken")||null
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



