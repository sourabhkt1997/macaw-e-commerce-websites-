
let url="http://localhost:8500" 
let product=document.getElementById("product")
let message=document.getElementById("filtermessage")

 function render(data){  
    product.innerHTML=null
   data.forEach((element)=>{
        let itemdiv=document.createElement("div")
        itemdiv.setAttribute("class","itemdiv")
        let imgdiv=document.createElement("div")
        imgdiv.setAttribute("class","imgdiv")
        let image=document.createElement("img")
        image.setAttribute("src",element.image[0])
        imgdiv.append(image)
        let title=document.createElement("p")
        title.setAttribute("class","name")
        title.innerText=element.title
        let pricediv=document.createElement("div")
        let price=document.createElement("p")
        price.innerText=element.price
        pricediv.setAttribute("class","price")
        pricediv.append(price)
        itemdiv.addEventListener("click",()=>{
            localStorage.setItem("element",element._id)
            window.location.href="./individualproduct.html"
    })

        itemdiv.append(imgdiv,title,pricediv)
        product.append(itemdiv)
        
        })
        
    }

    
     fetch(`${url}/products`)
    .then(res=>res.json())
    .then(data=>{
        product.innerHTML=""
        render(data)  
    })

    let shoedata=[]
    let tshirtdata=[]
    let pantdata=[]
    let shirtdata=[]
     let filterone=document.getElementById("filter-one")
    let catdiv=document.getElementById("catagories-dropdown") 
    let filtertwo=document.getElementById("filter-two")
    let pricediv=document.getElementById("price-dropdown")
    let filterthree=document.getElementById("filter-three")
    let ratingdiv=document.getElementById("rating-dropdown")

    let count=0;
     
    filterone.addEventListener("click",()=>{
        let bag1=document.createElement("h4")
        bag1.setAttribute("class","bag")
        let bag2=document.createElement("h4")
        bag2.setAttribute("class","bag")
        let bag3=document.createElement("h4")
        bag3.setAttribute("class","bag")
        let bag4=document.createElement("h4")
        bag4.setAttribute("class","bag")
          
    bag1.innerText="Shoe"
    bag2.innerText="T-shirt"
    bag3.innerText="pants"
    bag4.innerText="Shirt"
    catdiv.append(bag1,bag2,bag3,bag4)
    count++
    if(count%2==0){
        catdiv.innerHTML=null
    }
    
    bag1.addEventListener("click",()=>{
       
        fetch(`${url}/products`)
        .then(res=>res.json())
        .then(data=>{
            data.forEach((element)=>{
                if(element.category=="shoe"){
                    shoedata.push(element)
                }
                
                
            })
            console.log(shoedata)
            render(shoedata)
        })
    })
    
    bag2.addEventListener("click",()=>{
       
        fetch(`${url}/products`)
        .then(res=>res.json())
        .then(data=>{
            data.forEach((element)=>{
                if(element.category=="tshirt"){
                    tshirtdata.push(element)
                }
                
                
            })
            render(tshirtdata)
        })
    })
    bag3.addEventListener("click",()=>{
       
        fetch(`${url}/products`)
        .then(res=>res.json())
        .then(data=>{
            data.forEach((element)=>{
                if(element.category=="pants"){
                    pantdata.push(element)
                }
                
                
            })
            render(pantdata)
        })
    })
    

 })
 let count1=0
 filtertwo.addEventListener("click",()=>{
     let min=document.createElement("input")
     min.setAttribute("type","number")
     min.setAttribute("id","min")
     min.setAttribute("placeholder","Min")
     let max=document.createElement("input")
     max.setAttribute("type","number")
     max.setAttribute("placeholder","Max")
     let go=document.createElement("button")
     go.innerText="go"
     go.setAttribute("id","go")
     pricediv.append(min,max,go)
     count1++
     if(count1%2==0){
         pricediv.innerHTML=null
     }
     let pricedata=[]
     go.addEventListener("click",()=>{
         let minimum=min.value
         let maximum=max.value
         console.log(minimum)
         fetch(`${url}/products`)
         .then(res=>res.json())
         .then(data=>{
             data.forEach((element)=>{
                 if(+element.price>=minimum&&+element.price<=maximum){
                    pricedata.push(element)
                 }
                 
             })
             console.log(pricedata)
                 render(pricedata)
                
             if(pricedata.length==0){
                  message.innerText="No product in this price range"
             }
             pricedata=[] 
             
             
         })
         
     })
 })
  let count3=0
 filterthree.addEventListener("click",()=>{
    let rating4=document.createElement("h4")
    rating4.setAttribute("class","rating")
    let span4=document.createElement("span")
    span4.setAttribute("class","fa fa-star checked")
    rating4.append(span4)
    let rating3=document.createElement("h4")
    rating3.setAttribute("class","rating")
    let span3=document.createElement("span")
    span4.setAttribute("class","fa fa-star checked")
    rating3.append(span3)
    let rating2=document.createElement("h4")
    rating2.setAttribute("class","rating")
    let span2=document.createElement("span")
    span2.setAttribute("class","fa fa-star checked")
    rating2.append(span2)
    let rating1=document.createElement("h4")
    rating1.setAttribute("class","rating")
    let span1=document.createElement("span")
    span1.setAttribute("class","fa fa-star checked")
    rating1.append(span1)
    rating4.innerText=`rating 4`
    rating3.innerText="rating 3"
    rating2.innerText="rating 2"
    rating1.innerText="rating 1"
    ratingdiv.append(rating4,rating3,rating2,rating1)
    count3++
    if(count3%2==0){
        ratingdiv.innerHTML=null
    }
    let ratingdata=[]
     rating4.addEventListener("click",()=>{
        fetch(`${url}/products`)
        .then(res=>res.json())
        .then(data=>{
            data.forEach((element)=>{
                if(+element.rating>=4){
                   ratingdata.push(element)
                }
                
            })
            console.log(ratingdata)
                render(ratingdata)
               
            if(ratingdata.length==0){
                 message.innerText="No product belongs to this filter"
            }
            ratingdata=[] 
            
            
        })

     })
     rating3.addEventListener("click",()=>{
        fetch(`${url}/products`)
        .then(res=>res.json())
        .then(data=>{
            data.forEach((element)=>{
                if(+element.rating<4&&+element.rating>=3){
                   ratingdata.push(element)
                }
                
            })
            console.log(ratingdata)
                render(ratingdata)
               
            if(ratingdata.length==0){
                 message.innerText="No product belongs to this filter"
            }
            ratingdata=[] 
            
            
        })

     })
     rating2.addEventListener("click",()=>{
        fetch(`${url}/products`)
        .then(res=>res.json())
        .then(data=>{
            data.forEach((element)=>{
                if(+element.rating<3&&+element.rating>=2){
                   ratingdata.push(element)
                }
                
            })
            console.log(ratingdata)
                render(ratingdata)
               
            if(ratingdata.length==0){
                 message.innerText="No product belongs to this filter"
            }
            ratingdata=[] 
            
            
        })

     })
     rating1.addEventListener("click",()=>{
        fetch(`${url}/products`)
        .then(res=>res.json())
        .then(data=>{
            data.forEach((element)=>{
                if(+element.rating<2&&+element.rating>=2){
                   ratingdata.push(element)
                }
                
            })
            console.log(ratingdata)
                render(ratingdata)
               
            if(ratingdata.length==0){
                 message.innerText="No product belongs to this filter"
            }
            ratingdata=[] 
            
            
        })

     })

     })

