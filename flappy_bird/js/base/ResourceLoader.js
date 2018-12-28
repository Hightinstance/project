//资源文件加载器，确保canvas在图片资源加载完成后才进行渲染
import {Resources} from "./Resources.js";

export class ResourceLoader {
    constructor() {
        this.map = new Map(Resources);
        for (let [key, value] of this.map) {
            const image = new Image();
            image.src = value;
            this.map.set(key, image);
        }
    }

    onLoaded(callback) {
        let loadedCount = 0;
        for (let value of this.map.values()) {
            value.onload = () => {
                loadedCount++;
                if (loadedCount >= this.map.size) {
                    callback(this.map);
                }
            }
        }
    }
//类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上`static`关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
    static create() {
        return new ResourceLoader();
    }
}
