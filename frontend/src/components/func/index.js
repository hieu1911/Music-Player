export const fomatTime = (time) => {
    time = Math.floor(time)
    let surplusTime = time % 60
    let integerTime = (time - surplusTime) / 60
    let integerTimeS = integerTime
    let surplusTimeS = surplusTime
    if (integerTime < 10)  {
        integerTimeS = '0' + integerTime.toString()
    }
    if (surplusTime < 10)  {
        surplusTimeS = '0' + surplusTime.toString()
    }
    return integerTimeS + ':' + surplusTimeS
}