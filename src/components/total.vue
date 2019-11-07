<template>
  <div class="hello">
     <h1>报饭统计</h1>
    <div>今日午饭总数：{{lunchNum}}</div>
    <div>今日晚饭总数：{{dinnerNum}}</div>

    <table class="table table-bordered">
      <caption><h3>今日晚饭统计表</h3></caption>
      <thead>
        <tr>
          <th>部门</th>
          <th>晚饭数</th>
          <th>人名</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in dinnerInfoList" :key="index" >
          <td>{{item.deptName}}</td>
          <td>{{item.num}}</td>
          <td>{{item.epmName}}</td>
        </tr>
      </tbody>
    </table>


  </div>
</template>

<script>
export default {

  data () {
    return {
      lunchNum:'',
      dinnerNum:'',
      dinnerInfoList:''
    }
  },
  methods:{
    getLunchNum(){
      this.$http({
      	method: 'post',
      	url:'/api/meals/mealCountLunch',
      	dataType:'json',
      }).then((response) => {
        // console.log(response)
        this.lunchNum = response.data.lunchNum
      }).catch((error) => {
      	console.log('请求失败')
      });
    },

    getDinnerNum(){
      this.$http({
      	method: 'post',
      	url:'/api/meals/mealCountDinner',
      	dataType:'json',
      }).then((response) => {
         //console.log(response)
        this.dinnerNum = response.data.dinnerNum

      }).catch((error) => {
      	console.log('请求失败')
      });
    },


    getDeparts(){
      this.$http({
      	method: 'post',
      	url:'/api/meals/whosDinner',
      	dataType:'json',
      }).then((response) => {
        console.log(response)
        this.dinnerInfoList = response.data

      }).catch((error) => {
      	console.log('请求失败')
      });
    },


  },
  created() {
    this.getLunchNum()
    this.getDinnerNum()
    this.getDeparts()
  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
