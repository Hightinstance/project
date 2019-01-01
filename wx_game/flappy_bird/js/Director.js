//导演类，控制游戏的逻辑

import {DataStore} from "./base/DataStore.js";
import {UpPencil} from "./runtime/UpPencil.js";
import {DownPencil} from "./runtime/DownPencil.js";
export class Director {

    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }

    constructor() {
        this.dataStore = DataStore.getInstance();
        this.moveSpeed = 2;
    }

    createPencil(){
        //创建铅笔高度的随机数；
        const minTop = window.innerHeight/8;
        const maxTop = window.innerHeight/2;
        const top = minTop + Math.random() * (maxTop - minTop);
        //
        //console.log(top,minTop,maxTop);
        this.dataStore.get('pencils').push(new UpPencil(top));
        this.dataStore.get('pencils').push(new DownPencil(top));
    }


    //绑定事件
    birdsEvent(){
        //处理小鸟点击的时候向上飞；
          for(let i=0;i<=2;i++){
              this.dataStore.get('birds').y[i] = this.dataStore.get('birds').birdsY[i];
              console.log(this.dataStore.get('birds').y[i]);
          }
        this.dataStore.get('birds').time = 0;
    }

    //判断小鸟是否和铅笔撞击
    static isStrike(bird, pencil) {
        let s = false;
        if (bird.top > pencil.bottom ||
            bird.bottom < pencil.top ||
            bird.right < pencil.left ||
            bird.left > pencil.right
        ) {
            s = true;
        }
        return !s;
    }

     //创建铅笔和小鸟的模型判断是否发生碰撞
     check(){
     	//判断小鸟是否和地板发生碰撞
         const birds = this.dataStore.get('birds');
         const land = this.dataStore.get('land');
         const pencils = this.dataStore.get('pencils');
         const score = this.dataStore.get("score");
         if(birds.birdsY[0] + birds.birdsHeight[0] >= land.y)
         {
             //
             this.isGameOver = true;
             return ;
         }

         //小鸟的边框模型
         const birdsBorder = {
             top: birds.y[0],
             bottom: birds.birdsY[0] + birds.birdsHeight[0],
             left: birds.birdsX[0],
             right: birds.birdsX[0] + birds.birdsWidth[0]
         };

         const length = pencils.length;
         for (let i = 0; i < length; i++) {
             const pencil = pencils[i];
             const pencilBorder = {
                 top: pencil.y,
                 bottom: pencil.y + pencil.height,
                 left: pencil.x,
                 right: pencil.x + pencil.width
             };

             if (Director.isStrike(birdsBorder, pencilBorder)) {
                 console.log('撞到水管啦');
                 this.isGameOver = true;
                 return;
             }
         }

         if(birds.birdsX[0] > pencils[0].x + pencils[0].width && score.isScore){
             score.isScore = false;
             score.scoreNumber++; //表示加分成功
         }

     }
     

    run(){
//判断游戏是否结束
         this.check();
        if(!this.isGameOver){

            this.dataStore.get("background").draw();

            const pencils = this.dataStore.get('pencils');
            //判断数组是否越界,X横坐标，初始值在窗口的右侧
            if((pencils[0].x + pencils[0].width) <=0&& pencils.length ===4 ){
               // console.log(2222);
                //pencils.length==4 代表是两组坐标，移出
                pencils.shift();
                pencils.shift();//推出数组的第一个元素，并且把数组的个数减一
                this.dataStore.get("score").isScore = true;
            }
            //创建
            if(pencils[0].x <=(window.innerWidth - pencils[0].width)/2 && pencils.length === 2 ){
                this.createPencil();
            }
            this.dataStore.get('pencils').forEach((item,index)=>{
                //存放的是一组铅笔
                item.draw();
            })
            this.dataStore.get("land").draw();
            this.dataStore.get("birds").draw();
            this.dataStore.get("score").draw();
            let timer = requestAnimationFrame(() => this.run());//
            this.dataStore.put('timer', timer);
        }else {
            this.dataStore.get("startButton").draw();
            cancelAnimationFrame(this.dataStore.get('timer')); //回收定时器
            this.dataStore.destroy();
        }
    }


}