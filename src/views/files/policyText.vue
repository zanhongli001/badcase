<template>
    <div>
        <h2>底库数据搜集文档</h2>
            <p class="title">底库图片搜集说明示例:</p>
            <dl class="img-item" v-for="(item,index) in list" :key="index">
              <dd class="img-title">{{item.title}}</dd>
              <dt class="img-list">
                <!--  -->
                <img  :src="getImg(img)" v-for="(img, index) in item.imgGroup" :key="`${item.title}-${index}`" alt="">
               </dt>
            </dl>
    </div>
</template>
<script>

export default {
    data(){
        return {
          list:[
            {
              title:"各类刀具，匕首，砍刀，警棍等",
              imgGroup:["knife-1","knife-2"]
            },
            {
              title:"弓弩、手枪，冲锋枪，步枪、火箭炮等重型武器",
              imgGroup:["gun-1","gun-2"]
            },
              {
              title:"盾牌",
              imgGroup:["shield-1","shield-2"]
            },
              {
              title:"新疆",
              imgGroup:["xinjiang-1"]
            },
              {
              title:"西藏",
              imgGroup:["xizang-1"]
            },
              {
              title:"香港",
              imgGroup:["honkong-1","honkong-2"]
            },
              {
              title:"各种军用车辆，警车，装甲车，防暴车、武装皮卡、坦克等",
              imgGroup:["car-1","car-2","car-3"]
            },
             {
              title:"直升机+战斗机",
              imgGroup:["airplane-1","airplane-2"]
            },
               {
              title:"军人、特警，一般指的是武力较强的士兵",
              imgGroup:["soldier-1","soldier-2","soldier-3"]
            },
              {
              title:"警察、城管、交警、消防、保安等",
              imgGroup:["police-1","police-2","police-3"]
            },
            {
              title:"恐怖分子、民兵、反政府武装、暴徒，一般没有正规服装",
              imgGroup:["terrorist-1","terrorist-2"]
            },
          ]
        }
    },
    created(){
        
    },
    methods:{
     getImg(image){
      let res =require(`./badcase_img/${image}.png`)
      return res
     }
    }
}
</script>
<style scoped>
*{
  margin: 0;
  padding: 0;
  list-style: none;
}
.title{
font-size: 18px;
margin:10px 20px;
}
.addTitle{
  margin-bottom: 20px;
}
.pagination{
  text-align: right;
}
.img-item{
margin-left: 30px;
}
.img-title{
  font-size: 16px;
  margin-bottom: 5px;
}
.img-list{
  display: flex;
  justify-content: space-between;
width: 200px;
height: 100px;
margin-bottom: 20px;
}
.img-list img{
width: 100%;
height: 100%;
margin-left: 5px;

}
</style>