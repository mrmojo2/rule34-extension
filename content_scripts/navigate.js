const start = async ()=>{
    const params = new URLSearchParams(window.location.search)
    const currentId = params.get('id')
    
    const res = await chrome.storage.local.get(['imageIds'])
    const imageIds = res?.imageIds || []
    console.log(imageIds)

    if(imageIds.includes(`${currentId}`)){
        let index = res.imageIds.indexOf(`${currentId}`)
        document.addEventListener('keydown',async (e)=>{
            if(e.key === "ArrowRight"){
                if(index !== imageIds.length-1){
                    await chrome.runtime.sendMessage({key:"right",index})
                }else{
                    await chrome.runtime.sendMessage("end")
                }
            } 
            if (e.key === "ArrowLeft") {
                if(index !== 0){
                    await chrome.runtime.sendMessage({key:"left",index})
                }else{
                    await chrome.runtime.sendMessage("beginning")
                }
            }
        })
    }
}
start()