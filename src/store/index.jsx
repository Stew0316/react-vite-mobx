import { makeObservable,observable, action } from 'mobx'

class Store {
  constructor() {
    makeObservable(this,{
      count:observable,//用 observable 将 count 描述为一个可被观察的响应式数据,
      updateCount:action// 用 action 将 updateCount 描述为一个可以修改 observable 中数据的方法
    }) 
  }
  count = 0
  updateCount = (count) => {
    this.count += count 
  }
}
// 注意：每一个 store 只能初始化一次，所以导出的应该不是 Store 这个类，而是 Store 这个实例，所以需要 new 实例化一下
export default new Store()