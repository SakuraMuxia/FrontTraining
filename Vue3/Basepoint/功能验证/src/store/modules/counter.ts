import { defineStore } from 'pinia'

const useCounterStore = defineStore('counter',{
    state:() => {
        return{
            age:23,
            username: "Akane",
            arr: [1, 2, 3, 4, 5]
        }
    },
    actions:{
        increment(a:number,b:number,c:number,d:number){
            console.log(a,b,c,d)
            this.age++
        },
        // 异步修改state
        delaySet() {
            setTimeout(() => {
                this.age = 10
            }, 2000)
        }
    },
    getters:{
        sum:(state) => {
            return state.age += 10
        },
        arrSum(){
            console.log("arrSum")
            const value:number = this.arr.reduce((s:number,item:number)=>{
                return s+item;
            },0)
            return value;
        }
    }
})

export default useCounterStore