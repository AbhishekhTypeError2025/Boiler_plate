// const obj = {value:{
//     a: 12,
//     b: 55,
//     name:"1354fg",
// }}
const obj={}

const ans = {
  
    ...(obj||{}),

}

console.log(ans);