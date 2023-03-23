console.log("hello rule34!")

const params = new URLSearchParams(window.location.search)

let imageIds = []

const imgs = document.querySelectorAll('.thumb')
imgs.forEach(img=>{
    imageIds.push(img.id.split('').slice(1).join(''))
})

chrome.storage.local.set({
    imageIds,
    pid:params.get('pid') || 0,
    tags:params.get('tags')
})