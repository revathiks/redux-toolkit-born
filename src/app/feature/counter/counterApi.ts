export const fetchCount = (count:number=1) =>{
    return new Promise<{data:number}>((resolve,reject)=>(
        setTimeout(()=>resolve({data:count}),5000)
    ))
}