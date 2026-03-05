/**
 * @param {Function} func
 * @param {number} wait
 * @return {Function}
 */
export default function debounce(func, wait) {
  let timerId = null;
  return function(...args){
    if(timerId) clearTimeout(timerId)
    timerId = setTimeout(()=>{
      func.apply(this,args)
    },wait)
  }
}
