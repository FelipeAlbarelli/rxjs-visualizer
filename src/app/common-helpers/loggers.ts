
// to be used as tap() cb
export const logger = (name : string) => {
    return (v  : any) => {
        console.info(`${name}:`)
        console.info(v)
        console.info(`*`.repeat(5))
    }
}