<template>
  <form>
  <body class="body-login">
<div class="mdl-grid centre-items">
  <div class="mdl-cell mdl-cell--4-col"></div>
  </div>
<div class="login-wrap">

  <header class="login-header">
   <center><h3>ROZGAR</h3>
	   <div align="center">Log in!</div></center>
  </header>
  <div class="flex-grid">

    <div class="login-middle">
        <div class="login-area">
        <form class="login-form top-label-form" id="login-login-form" accept-charset="UTF-8" method="post">
          <input name="utf8" type="hidden" value="✓">
  <div align="center" id="login-email" class="field">
    <label for="login-email-field">Username</label>
    <input type="text" name="email" id="login-email-field" value="" required="required">
  </div>
  <div align="center" id="login-password" class="field">
    <label for="login-password-field">Password</label>
    <input name="password" required="required" type="password" id="login-password-field_">
  </div>


  <div>
    <input type="hidden" id="login-type" name="login-type" value="fullpage">
  </div>

  <div id="login-error"></div>

  <div>
    <label class="spacing-label"></label>
    <div align="center" class="actions">
        <button type="button" class="btn btn-primary" @click.prevent="login">Login</button>
      </div>  
  </div>

</form>


      </div>

    </div>


  
  </div></div></div></body>
  </form>
</template>
<script>
  import postWorker from '@/mixins/postWorker'

  export default {
    mixins: [postWorker],
    data () {
      return {
        'workerUrl': null
      }
    },
    methods: {
      login () {
        localStorage.setItem('session_token', 'EFG234-SDF123-SDFQW1')
        this.$router.replace({'name': 'sme'})
      }
    },
    mounted () {
    }
  }
</script>
<style scoped>
  .waiting {
    padding: 20px;
    color: rgb(0, 0, 0); 
  }
  .mdl-button mdl-js-button mdl-button--raised mdl-button--colored {
  background-color: #f2f2f2;
  color: rgb(211, 211, 211);
  padding: 12px;
  margin: 10px 0;
  border: 50px;
  width: 100%;
  border-radius: 3px;
  cursor: pointer;
  max-height: 400%;
  font-size: 17px;
}
.field {
  background-color: #f2f2f2;
  color: rgb(0, 0, 0);
  padding: 12px;
  margin: none;
  border: none;
  width: 100%;
  border-radius: 3px;
  cursor: pointer;
  max-height: 400%;
  font-size: 17px;
}
.login-header {
  background-color: #f2f2f2;
  color: rgb(0, 0, 0);
  padding: 12px;
  margin: none;
  border: none;
  width: 100%;
  border-radius: 3px;
  cursor: pointer;
  max-height: 400%;
  font-size: 17px;
}
.flex-grid {
  background-color: #f2f2f2;
  padding: 5px 15px 15px 5px;
  border: 0px solid lightgrey;
  width: 100%;
  border-radius: 3px;
  font-size: 17px;
  max-height: 400%;
}
.login-middle {
  background-color: #f2f2f2;
  padding: 5px 15px 15px 5px;
  border: 0px solid lightgrey;
  width: 100%;
  border-radius: 3px;
  font-size: 17px;
  max-height: 400%;
}

</style>
