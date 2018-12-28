//作为游戏开始的入口
import {ResourceLoader} from "./js/base/ResourceLoader.js";
import {Director} from "./js/Director.js";
import {BackGround} from "./js/runtime/BackGround.js";
import {DataStore} from "./js/base/DataStore.js";
import {Land} from "./js/runtime/Land.js";
import {Birds} from  "./js/player/Birds.js"
import {StartButton} from  "./js/player/StartButton.js"
import {Score} from  "./js/player/Score.js"
export class Main{

     constructor(){
             this.canvas = document.getElementById("game_canvas");
             this.ctx = this.canvas.getContext('2d');
             this.dataStore = DataStore.getInstance(); 
             this.director = Director.getInstance();
             const loader = ResourceLoader.create();
             loader.onLoaded(map => this.onResourceFirstLoaded(map));
             //创建导演类
             //利用存储
     }
     //资源只需要加载一次
    onResourceFirstLoaded(map) {
          //绘制背景
          this.dataStore.ctx = this.ctx;
          this.dataStore.res = map;  
          this.init();
    }
    init(){
    	//初始化背景
    	//const background = new BackGround(this.dataStore.res.get("background"));
    	//background.draw();
        //pencils 存放的铅笔
        this.director.isGameOver = false;
     	this.dataStore.put("background",BackGround)
            .put("land",Land).put('pencils',[]).put('birds',Birds)
            .put('startButton',StartButton).put('score',Score);

        this.registerEvent();
     	//初始化铅笔的高度
        this.director.createPencil();
     	//new BackGround new简化进行封装
     	//BackGround是一个类，他本身是作为一个函数存在点，类的方法其实是ES5原型链的方法
        this.director.run();
    }

    registerEvent(){
         //注册事件
        this.canvas.addEventListener("touchstart",(e)=>{
            e.preventDefault();
            //游戏结束后，你在点击的时候又会重新开始
            if(this.director.isGameOver){
                //导演类是控制游戏的逻辑
                       console.log("游戏开始");
                       this.init(); //重新初始化
            }else{
                this.director.birdsEvent();
            }
        })
    }



}