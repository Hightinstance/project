//计分器类 不需要继承精灵类可以直接绘制
import {DataStore} from "../base/DataStore.js";
export class  Score{
      constructor(){
          //计分器
          this.ctx = DataStore.getInstance().ctx ;
          this.scoreNumber = 0; //加分器
          this.isScore = true; //判断是否能够加分主要是由于canvas频率的 问题;
      }

      draw(){
          this.ctx.font = '25px Arial';
          this.ctx.fillStyle = '#000000';
          this.ctx.fillText(
              this.scoreNumber,
              window.innerWidth / 2,
              window.innerHeight / 18,
              1000
          );
      }
}