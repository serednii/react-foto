export const timer = (time: number) => new Promise((res, rej)=>{
    const timeId = setTimeout(() => {
        clearTimeout(timeId)
        res('ok')
    }, time);
})