
let url="http://localhost:8500"

let filterone=document.getElementById("filter-one")
    let catdiv=document.getElementById("catagories-dropdown") 
    let filtertwo=document.getElementById("filter-two")
    let pricediv=document.getElementById("price-dropdown")

    let count=0;
     
    filterone.addEventListener("click",()=>{
        let bag1=document.createElement("h4")
        bag1.setAttribute("class","bag")
        let bag2=document.createElement("h4")
        bag2.setAttribute("class","bag")
        let bag3=document.createElement("h4")
        bag3.setAttribute("class","bag")

    bag1.innerText="HAND BAG"
    bag2.innerText="CLOTHES"
    bag3.innerText="ACCESSORIES"
    catdiv.append(bag1,bag2,bag3)
    count++
    if(count%2==0){
        catdiv.innerHTML=null
    }
    
    bag1.addEventListener("click",()=>{
       
        fetch(url)
        .then(res=>res.json())
        .then(data=>{
            data.forEach((element)=>{
                if(element.category=="bag"){
                    bagdata.push(element)
                }
                
                
            })
            console.log(bagdata)
            render(bagdata)
        })
    })
    
    bag2.addEventListener("click",()=>{
       
        fetch(url)
        .then(res=>res.json())
        .then(data=>{
            data.forEach((element)=>{
                if(element.category=="clothes"){
                    clothdata.push(element)
                }
                
                
            })
            render(clothdata)
        })
    })
    bag3.addEventListener("click",()=>{
       
        fetch(url)
        .then(res=>res.json())
        .then(data=>{
            data.forEach((element)=>{
                if(element.category=="accessories"){
                    accessoriesdata.push(element)
                }
                
                
            })
            render(accessoriesdata)
        })
    })
    

 })