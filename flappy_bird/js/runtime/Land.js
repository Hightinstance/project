import {Sprite} from "../base/Sprite.js";
import {Director} from  "../Director.js"
export class Land extends Sprite{
    constructor(){
        const image = Sprite.getImage("land");
        /**
         * img 传入Image对象
         * srcX 要剪裁的起始X坐标
         * srcY 要剪裁的起始Y坐标
         * srcW 剪裁的宽度
         * srcH 剪裁的高度
         * x 放置的x坐标
         * y 放置的y坐标
         * width 要使用的宽度
         * height 要使用的高度
         */
        console.log(window.innerHeight-image.height) //50图片绘制在下方
        super(image,0,0,image.width,image.height,0,window.innerHeight-image.height,image.width,image.height);
        this.landX =0;
        this.landSpeed = Director.getInstance().moveSpeed;
    }
    draw(){
        this.landX = this.landX + this.landSpeed;
        if(this.landX > this.img.width - window.innerWidth){
         this.landX =0;	
        }
        super.draw(this.image,
           this.srcX,
            this.srcY,
            this.srcW,
           this.srcH,
           -this.landX,
           this.y,
            this.width,
            this.height)
    }

}