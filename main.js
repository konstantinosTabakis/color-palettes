const container= document.querySelector('.palette-container')
let data, itemIndex=0, pageIndex=1;

document.querySelector('.next').addEventListener('click', ()=>{
    if(pageIndex<Math.ceil(data.length/12)){
        itemIndex+=12
        pageIndex+=1
        document.querySelector('.currentPage').innerHTML=pageIndex
        createPage()
    }
})
document.querySelector('.previews').addEventListener('click', ()=>{
    if(pageIndex>1){
        itemIndex-=12
        pageIndex-=1
        document.querySelector('.currentPage').innerHTML=pageIndex
        createPage()
    } 
})

fetch('./data/colors3.json')
.then(res=> res.json())
.then(dataPal=>{
    data=dataPal
    document.querySelector('.totalPages').innerHTML= Math.ceil(dataPal.length/12)
    createPage()
   
})

function createPage(){
    container.innerHTML=''
    for(let i=itemIndex; i<itemIndex+12;i++){
        let new_palette= document.createElement('div')
        new_palette.classList.add('palette')
        container.appendChild(new_palette)
        data[i].color.forEach(col=>{
            let new_color=document.createElement('div')
            new_color.classList.add('color')
            new_color.style.background=col
            new_palette.appendChild(new_color)

            
            const dsc= document.createElement('span')
            dsc.innerHTML=col
            new_color.appendChild(dsc)
            const copy= document.createElement('p')
            copy.innerHTML='Copied'
            new_color.appendChild(copy)

            new_color.addEventListener('click', (e)=>{
                navigator.clipboard.writeText(col)
                copy.style.opacity=1
                setTimeout(()=>{
                    copy.style.opacity=0
                },400)

            })
        })
    }
     
}

 

