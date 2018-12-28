//小鸟类
//是循环渲染三只小鸟
//其实是循环渲染图片的三个部分

import {Sprite} from "../base/Sprite.js";

export class Birds extends Sprite{
 //小鸟的图形的绘制
    constructor(){
        const image = Sprite.getImage('birds');
        super(image, 0, 0, image.width, image.height,
            0, 0, image.width, image.height);

        //小鸟的三种状态需要一个数组去存储
        //小鸟的宽是34，小鸟的高度是24，上下边距是10，小鸟左右边距是9
        this.clippingX = [  //裁剪图片的X坐标
            9,
            9 + 34 + 18,
            9 + 34 + 18 + 34 + 18
        ];
        this.clippingY = [10, 10, 10]; //裁剪图片的Y坐标
        this.clippingWidth = [34, 34, 34]; //小鸟图片的宽高，
        this.clippingHeight = [24, 24, 24];
        const birdX = window.innerWidth/ 4; //绘制的位置
        this.birdsX = [birdX, birdX, birdX];
        const birdY = window.innerHeight / 2;
        this.birdsY = [birdY, birdY, birdY];
        const birdWidth = 34; //绘制的高度
        this.birdsWidth = [birdWidth, birdWidth, birdWidth];
        const birdHeight = 24;
        this.birdsHeight = [birdHeight, birdHeight, birdHeight];
        this.y = [birdY, birdY, birdY]; //小鸟移动的偏移量
        this.index = 0; //标识哪一个小鸟
        this.count = 0; //用来表示小鸟
        this.time = 0; //下落的时间
    }

    draw(){
        //重写draw方法主要是对小鸟进行切换的绘制
        //console.log(11);
        const speed = 0.2; //模拟切换的速度
        this.count = this.count + speed;
        //模拟的速度
        if(this.index >=2){
            this.count = 0;
        }
        this.index = Math.floor(this.count);
        const  g = 0.98/2.4;//重力
        const  offsetUp = 30;
        const  offsetY = (g*this.time*(this.time - offsetUp)) / 2;
        //遍历改变偏移；
        for(let i=0;i<3;i++){
            this.birdsY[i] = this.y[i] + offsetY;
        }

        this.time++;
        super.draw(
            this.img,
            this.clippingX[this.index], this.clippingY[this.index],
            this.clippingWidth[this.index], this.clippingHeight[this.index],
            this.birdsX[this.index], this.birdsY[this.index],
            this.birdsWidth[this.index], this.birdsHeight[this.index]
        );

    }



}