////变量缓存器，方便我们在不同的类中访问和修改变量

export class DataStore{
//getInstance是一个函数，在java中，可以使用这种方式使用单例模式创建类的实例，所谓单例模式就是一个类有且只有一个实例，不像object ob=new object();的这种方式去实例化后去使用。
    static  getInstance(){
        if(!DataStore.instance){
            DataStore.instance = new DataStore();
        }
        return DataStore.instance;
    }

   constructor(){
         this.map = new Map(); //创建一个map数组存放资源和变量
   }

   //存取
    put(key, value) {
        if (typeof value === 'function') {
            value = new value();
        }
        this.map.set(key, value);
        return this;
    }
 //获取数值
    get(key) {
        return this.map.get(key);
    }
 //防止内存泄漏销毁
    destroy() {
        for (let value of this.map.values()) {
            value = null;
        }
    }
}