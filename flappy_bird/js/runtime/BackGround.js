//背景
import {Sprite} from "../base/Sprite.js";

export class BackGround extends Sprite {
     constructor() {
     	const image = BackGround.getImage("background");
     	//super不能使用类属性
        super(image,
            0, 0,
            image.width, image.height,
            0, 0,
          window.innerWidth, window.innerHeight);
    }
 }