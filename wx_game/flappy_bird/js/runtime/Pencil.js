import {Sprite} from "../base/Sprite.js";
import {Director} from  "../Director.js"
//本身不是我们需要绘制的只是一个基类
export  class Pencil extends Sprite{
   constructor(image,top){
      super(image,0,0,image.width,image.height,window.innerWidth,0,image.width,image.height)
      //innerWidth,0,画布绘制的位置，表示的是在右边看不到的位置，因为铅笔是随着地面的移动开始移动进行的
       this.top = top ;
   }
   draw(){
    this.x  = this.x -Director.getInstance().moveSpeed;
    super.draw(this.img,
        this.srcX,
        this.srcY,
        this.srcW,
        this.srcH,
        this.x,
        this.y,
        this.img.width,this.img.height)
   }
}