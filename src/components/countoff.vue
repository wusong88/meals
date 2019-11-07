<template>
  <div class="countoff">
    <div class="page-header">
      <h1> 要记得报饭 <small>Subtext for header</small></h1>
      <div class="topBox">
    	  <div class="userName">{{userName}} 您好</div>

    	  <div class="form-group">
    	  	<label for="departmentId">部 门：</label>
    	  	<select class="form-control" v-model="departmentId">
    	  		<option value="">请选择部门</option>
    	  		<option v-for="(item,index) in departmentList" :key="index" :value="item.ID" >{{item.Name}}</option>
    	  	</select>
    	  </div>

      </div>

    </div>

    <div class="col-md-4 col-md-offset-4" v-if="isMeal == 'empty'">

    		<div class="checkbox">
    			<label><input type="checkbox" name="lunch" value="1" v-model="lunch">午饭</label>
    		</div>
    		<div class="checkbox">
    			<label><input type="checkbox" name="dinner" value="1" v-model="dinner">晚饭</label>
    		</div>
    		<button type="button" class="btn btn-primary " @click="MealInsert">提 交</button>
    </div>

    <div class="col-md-4 col-md-offset-4" v-else>
        <h3>修改或取消报饭</h3>
    		<div class="checkbox">
    			<label><input type="checkbox" name="lunch" value="1" v-model="lunch">午饭</label>
    		</div>
    		<div class="checkbox">
    			<label><input type="checkbox" name="dinner" value="1" v-model="dinner">晚饭</label>
    		</div>
        <button type="button" class="btn btn-primary " @click="showModal">提交</button>
    </div>


    <!-- 删除数据 -->
    <div role="dialog" class="modal"  id="deleteInfo" >
        <div class="modal-dialog" >
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">
                        <span>×</span>
                    </button>
                    <h4 class="modal-title">确认要取消报饭吗？</h4>
                </div>
                <div class="modal-body" >
                    <button class="btn btn-primary col-md-offset-4" data-dismiss="modal">返回</button>
                   <button class="btn btn-danger col-md-offset-1" data-dismiss="modal" @click="mealDelete">确认</button>
                </div>
            </div>
        </div>
    </div>


<!-- 更改数据 -->
    <div role="dialog" class="modal"  id="updataInfo" >
        <div class="modal-dialog" >
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">
                        <span>×</span>
                    </button>
                    <h4 class="modal-title">确认要修改报饭吗？</h4>
                </div>
                <div class="modal-body" >
                    <button class="btn btn-primary col-md-offset-4" data-dismiss="modal">返回</button>
                   <button class="btn btn-danger col-md-offset-1" data-dismiss="modal" @click="mealUpdate">确认</button>
                </div>
            </div>
        </div>
    </div>


  </div>
</template>

<script>

export default {

  data () {
    return {
      userName: '',
      departmentId:'',
      departmentList:[],
      Account_ID:'',
      lunch:'',
      dinner:'',
      isMeal:'empty'
    }
  },
  methods:{
    //获取部门列表和Account_ID
    getInfo(){
      //localStorage.setItem('Account_ID',this.$route.params.Account_ID)
      this.Account_ID = localStorage.getItem('Account_ID')

      this.$http({
      	method: 'post',
      	url:'/api/meals/departmentIdList',
      	dataType:'json',
      }).then((response) => {
        //console.log(response)
        this.departmentList = response.data

      }).catch((error) => {
      	console.log('请求失败')
      });
    },

    //员工基本信息  获取登录者的姓名和部门id
    getDepartmentIdName(){
      this.$http({
      	method: 'post',
      	url:'/api/meals/EmployeeBasic',
        data:{
        	Account_ID:this.Account_ID
        },
      	dataType:'json',
      }).then((response) => {
        //console.log(response)
        this.userName = response.data.Name
        this.departmentId = response.data.Department

      }).catch((error) => {
      	console.log('请求失败')
      });
    },


    MealInsert(){

      // var myDate = new Date()
      // if(myDate.getHours() >= 9){
      //   alert('报饭时间已过')
      //   return false
      // }

      if((this.lunch == '' && this.dinner == '') || (this.lunch == undefined && this.dinner == undefined)){
        alert('至少选一个')
        return false
      }

      if(this.lunch == true){
        this.lunch = 1
      }
      if(this.dinner == true){
        this.dinner = 1
      }



      this.$http({
      	method: 'post',
      	url:'/api/meals/MealInsert',
        data:{
          Account_ID:this.Account_ID,
          userName:this.userName,
        	departmentId:this.departmentId,
          lunch:this.lunch,
          dinner:this.dinner
        },
      	dataType:'json',
      }).then((response) => {
        console.log(response)
        alert('提交成功')
        this.checkMeal()

      }).catch((error) => {
      	console.log('请求失败')
      });
    },


    //查询是否报饭
    checkMeal(){
        this.$http({
          method: 'post',
          url:'/api/meals/MealSelect',
          data:{
            Account_ID:this.Account_ID,
          },
          dataType:'json',
        }).then((response) => {

           var a =  response.data.msg
           console.log(a)

           if (a !== 'empty') {
              this.isMeal = ''
           }
             this.lunch = response.data.lunch
             this.dinner = response.data.dinner
        }).catch((error) => {
          console.log('请求失败')
        });
    },

    showModal(){
      if ((this.lunch == false && this.dinner == false) || (this.lunch == null && this.dinner == false) || (this.lunch == false && this.dinner == null)) {
         $("#deleteInfo").modal('show')
      } else {
         $("#updataInfo").modal('show')
      }

    },

    //删除
    mealDelete(){
       this.$http({
       	method: 'post',
       	url:'/api/meals/mealDelete',
        data:{
          Account_ID:this.Account_ID,
        },
       	dataType:'json',
       }).then((response) => {
         console.log(response)

       }).catch((error) => {
       	console.log('请求失败')
       });

       window.location.reload()
      //this.checkMeal()
    },

    //修改
    mealUpdate(){

      if(this.lunch == false){
        this.lunch = ''
      }
      if(this.dinner == false){
        this.dinner = ''
      }

       this.$http({
       	method: 'post',
       	url:'/api/meals/mealUpdate',
        data:{
          Account_ID:this.Account_ID,
          departmentId:this.departmentId,
          lunch:this.lunch,
          dinner:this.dinner
        },
       	dataType:'json',
       }).then((response) => {
         console.log(response)

       }).catch((error) => {
       	console.log('请求失败')
       });

       //window.location.reload()
       this.checkMeal()
    }









  },
  created() {
    this.getInfo()
    this.getDepartmentIdName()
    this.checkMeal()
  },
  // mounted() {
  //   this.$nextTick(() => {
  //         this.checkMeal()
  //   })

  // }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-header{width: 100%;overflow: hidden; }
.page-header h1 {width: 40%;float: left;overflow: hidden; text-indent: 1em;}
.topBox{width: 30%;float: right;overflow: hidden;line-height: 35px;margin-top:25px;}
.topBox .userName{width: 30%;float: left;overflow: hidden;font-weight: bold;}
.topBox .form-group{width: 70%;float: left;overflow: hidden;}
.topBox .form-group label{float: left;overflow: hidden;}
.topBox .form-group select{width: 70%;float: left;overflow: hidden;}

</style>
