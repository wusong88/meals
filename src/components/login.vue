<template>

<div class="pwBoxBg">
  <div class="pwBox col-md-4 col-md-offset-4 modal-content">
      <h2>登 录</h2>

      <div class="form-group">
        <label for="account">账 号：</label>
        <input type="text" class="form-control" name="username" placeholder="请输入账号" v-model="username">
      </div>

      <div class="form-group">
        <label for="password">密 码：</label>
        <input type="password" class="form-control" name="password"  placeholder="请输入密码" v-model="password">
      </div>

      <div class="form-group">
        <button type="button" class="btn btn-primary" @click="login">登 录</button>
      </div>

  </div>
</div>
</template>

<script>
export default {

  data () {
    return {
      username:'',
      password:'',
      Account_Name:'',
      Account_ID:'',
      loginState:''
    }
  },
  methods: {

    login() {

      if(this.username == '' || this.password ==''){
        alert('账号和密码不能为空')
        return false
      }

      this.$http({
      	method: 'post',
      	url:'/api/meals/login',
      	data:{
      		username:this.username,
          password:this.password
      	},
      	dataType:'json',
      }).then((response) => {
        //console.log(response)

        var codeMsg = response.data.code

        if(codeMsg == 1){
          alert('账号或密码错误')
        } else {

          this.Account_ID = response.data.Account_ID

          localStorage.setItem('isLogin','ok')
          localStorage.setItem('Account_ID',this.Account_ID)
          this.$router.push({path:'/countoff'})

          // this.$router.push({
          //   name: 'countoff', //页面名
          //   params: {
          //     Account_ID:this.Account_ID,
          //     Account_Name:this.Account_Name
          //   }
          // });

        }

      }).catch((error) => {
      	console.log('请求失败')
      });


    },

    loginStates(){
      this.loginState = localStorage.getItem('isLogin');
      if ( this.loginState == 'ok') {
        this.$router.push({path:'/countoff'})
      }
    }

  },
  created() {
    this.loginStates()
  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* .pwBoxBg{width: 100%; height: 100%;min-height: 760px; background:url(../../static/images/thbg.jpg) no-repeat!important;background-size: 100% 100%; } */
.pwBox{background: #fff;margin-top:150px;}
.pwBox h2{text-align: center;font-weight: bold; }
.pwBox .form-group{width: 100%;overflow: hidden;text-align: center;}
.pwBox .form-group label{width: ;float: left;line-height: 34px; }
.pwBox .form-group select.form-control{width: 88%;float: left; }
.pwBox .form-group input.form-control{width: 88%;float: left; }
.pwBox button{margin: 0 auto; }

</style>
