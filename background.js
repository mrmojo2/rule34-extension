chrome.runtime.onInstalled.addListener(()=>{
    chrome.contextMenus.create({
        title:"search rule34",
        id:"searchrule34",
        contexts:["selection"]
    })

    chrome.contextMenus.onClicked.addListener(handleContextMenu)
})

const handleContextMenu = async (event)=>{
    await chrome.tabs.create({
        url:`https://rule34.xxx/index.php?page=post&s=list&tags=${event.selectionText}`
    })
}

chrome.runtime.onMessage.addListener(async (msg,sender,sendResp)=>{
    const [tab] = await chrome.tabs.query({
        active:true,
        lastFocusedWindow:true
    })
    //might crash is not present
    const {imageIds,pid,tags} = await chrome.storage.local.get(["imageIds","pid","tags"])

    if(msg.key === "right"){
        await chrome.tabs.update(tab.id,{
            url:`https://rule34.xxx/index.php?page=post&s=view&id=${imageIds[msg.index+1]}`
        })
    }
    if (msg.key === "left") {
        await chrome.tabs.update(tab.id, {
            url: `https://rule34.xxx/index.php?page=post&s=view&id=${imageIds[msg.index - 1]}`
        })
    }
    if(msg === "end"){
        await chrome.tabs.update(tab.id,{
            url:`https://rule34.xxx/index.php?page=post&s=list&tags=${tags}&pid=${+pid+42}`
        })
    }
    if(msg === "beginning" && pid > 0){
        await chrome.tabs.update(tab.id, {
            url: `https://rule34.xxx/index.php?page=post&s=list&tags=${tags}&pid=${Number(pid) - 42}`
        })
    }
})
