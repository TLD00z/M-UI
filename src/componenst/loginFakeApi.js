const loginApi =async(username, password)=>{
    return new Promise(( resolve , reject )=>{
        setTimeout(()=>{
            if (username ==="abc" && password === "123"){
                resolve();
            }else{
                reject();
            };
        })
    })
}





export  {loginApi}