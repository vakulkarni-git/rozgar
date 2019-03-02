<template>
  <form class="container">
  <h3>Register with ROZGAR</h3>
WHERE POTENTIAL MEETS THE NEED
<h4>Register as a Labourer</h4>
<div><br></div>

<form class="container">
  <input name="required" type="hidden" value="company,contactname,email,telephone,streetaddress,city,country,username,password,question1,question2,question3,question4">
  <input name="return" type="hidden" value="1">
  <table>
    <tbody>
    <tr>
      <td><p>Name:</p></td>
      <td><input name="contactname" type="text" value="" v-model="name"></td>
    </tr>
    <tr>
      <td><p>Phone number:</p></td>
      <td><input name="email" type="text" value="" v-model="phoneNumber"></td>
    </tr>
    <tr>
      <td><p>Aadhar number:</p></td>
      <td><input name="Adhar" type="text" value="" v-model="aadhar_number"></td>
    </tr>
   
    <tr>
      <td>
      <div class="col-xs-12" style="margin-top:50px;">
      <div class="input-group mb-3">
      <div class="input-group-prepend">
        <label class="input-group-text" for="inputGroupSelect01">Skill 1</label>
      </div>
      <select class="custom-select" id="inputGroupSelect01" v-model="skill1">
        <option selected>Choose...</option>
        <option value="Template Writing">Template Writing</option>
          <option value="Campaign Hosting">Campaign Hosting</option>
          <option value="Verbal Communication">Verbal Communication</option>
          <option value="Assembling">Assembling</option>
          <option value="Dissembling">Dissembling</option>
          <option value="Machine Handling">Machine Handling</option>
          <option value="Welding">Welding</option>
          <option value="Casting">Casting</option>
          <option value="Electroplatting">Electroplatting</option>
          <option value="Metal Mining">Metal Mining</option>
          <option value="Non-Metal Mining">Non-Metal Mining</option>
          <option value="Digging">Digging</option>
          <option value="Weaving">Weaving</option>
          <option value="Stiching">Stiching</option>
          <option value="Designer">Designer</option>
      </select>
      </div>
    </div>
      </td>
    </tr>
    <tr class="mdl-selectfield mdl-js-selectfield mdl-selectfield--floating-label">
       <td><label>Proficiency with Skill1</label>
       <div><vue-slider style="padding:0px;" :interval="25"
      :marks="true" v-model="value1" /></div>
       </td>
    </tr>
    <tr>
      <td>
      <div class="col-xs-12" style="margin-top:50px;">
      <div class="input-group mb-3">
      <div class="input-group-prepend">
        <label class="input-group-text" for="inputGroupSelect02">Skill 2</label>
      </div>
      <select class="custom-select" id="inputGroupSelect02" v-model="skill2">
        <option selected>Choose...</option>
        <option value="Template Writing">Template Writing</option>
          <option value="Campaign Hosting">Campaign Hosting</option>
          <option value="Verbal Communication">Verbal Communication</option>
          <option value="Assembling">Assembling</option>
          <option value="Dissembling">Dissembling</option>
          <option value="Machine Handling">Machine Handling</option>
          <option value="Welding">Welding</option>
          <option value="Casting">Casting</option>
          <option value="Electroplatting">Electroplatting</option>
          <option value="Metal Mining">Metal Mining</option>
          <option value="Non-Metal Mining">Non-Metal Mining</option>
          <option value="Digging">Digging</option>
          <option value="Weaving">Weaving</option>
          <option value="Stiching">Stiching</option>
          <option value="Designer">Designer</option>
      </select>
      </div>
    </div>
      </td>
    </tr>
    <tr class="mdl-selectfield mdl-js-selectfield mdl-selectfield--floating-label">
       <td><label>Proficiency with Skill2</label>
       <div><vue-slider style="padding:0px;" :interval="25"
      :marks="true" v-model="value2" /></div>
       </td>
    </tr>
    <tr>
      <td>
      <div class="col-xs-12" style="margin-top:50px;">
      <div class="input-group mb-3">
      <div class="input-group-prepend">
        <label class="input-group-text" for="inputGroupSelect01">Skill 3</label>
      </div>
      <select class="custom-select" id="inputGroupSelect03" v-model="skill3">
        <option selected>Choose...</option>
        <option value="Template Writing">Template Writing</option>
          <option value="Campaign Hosting">Campaign Hosting</option>
          <option value="Verbal Communication">Verbal Communication</option>
          <option value="Assembling">Assembling</option>
          <option value="Dissembling">Dissembling</option>
          <option value="Machine Handling">Machine Handling</option>
          <option value="Welding">Welding</option>
          <option value="Casting">Casting</option>
          <option value="Electroplatting">Electroplatting</option>
          <option value="Metal Mining">Metal Mining</option>
          <option value="Non-Metal Mining">Non-Metal Mining</option>
          <option value="Digging">Digging</option>
          <option value="Weaving">Weaving</option>
          <option value="Stiching">Stiching</option>
          <option value="Designer">Designer</option>
      </select>
      </div>
    </div>
      </td>
    </tr>
    <tr class="mdl-selectfield mdl-js-selectfield mdl-selectfield--floating-label">
       <td><label>Proficiency with Skill3</label>
       <div><vue-slider style="padding:0px;" :interval="25"
      :marks="true" v-model="value3"/></div>
       </td>
    </tr>
    <tr>
      <br>
     <label style="margin-top:50px;">Pay Per Hour (Expected):</label>
      <td ><br><input name="country" type="text" value="" class="ok" style="margin-top:50px;" v-model="payPerHour"></td>
    </tr>
    <tr>
      <td><p>Place:</p></td>
      <td><input name="username" type="text" value="" v-model="place"></td><br>
    </tr>
    <tr>
      <td><p>Age:</p></td>
      <td><input name="question3" type="text" value="" v-model="age"><br></td>
      <br>
    </tr>
    <tr>
        <td><input style="margin-top:50px;" type="submit" value="Submit" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" @click.prevent="registerLabourer()"></td>
    </tr>
  </tbody></table>
</form>
  </tr>
</tbody></table>
  </form>
</template>
<script>
  import postWorkerRegistration from '@/mixins/postWorkerRegistration'
  import VueSlider from 'vue-slider-component'
  import 'vue-slider-component/theme/antd.css'

  export default {
    components: {
      VueSlider
    },
    mixins: [postWorkerRegistration],
    methods: {
      registerLabourer () {
        var id = ''
        id = Math.floor((Math.random() * 10)).toString()
        id += Math.floor((Math.random() * 10)).toString()
        id += Math.floor((Math.random() * 10)).toString()

        var registrationDate = (new Date().toISOString()).substring(0, 10)

        this.postWorkerRegistration(id, this.value1, this.value2, this.value3, this.name, this.payPerHour, this.phoneNumber, this.place, registrationDate, this.skill1, this.skill2, this.skill3)
        this.$router.replace({name: 'login'})
      }
    },
    data () {
      return {
        value: 0,
        name: null,
        phone_number: null,
        aadhar_number: null,
        skill1: null,
        value1: 0,
        skill2: null,
        value2: 0,
        skill3: null,
        value3: 0,
        payPerHour: null,
        place: null,
        age: null
      }
    },
    mounted () {
    }
}
</script>
<style scoped>
  .waiting {
    padding: 10px;
    color: #555;
  }
   body {
  font-family: Arial;
  font-size: 17px;
  padding: 8px;
}

* {
  box-sizing: border-box;
}

.row {
  display: -ms-flexbox; /* IE10 */
  display: flex;
  -ms-flex-wrap: wrap; /* IE10 */
  flex-wrap: wrap;
  margin: 0 -16px;
}

.col-25 {
  -ms-flex: 25%; /* IE10 */
  flex: 25%;
}

.col-50 {
  -ms-flex: 50%; /* IE10 */
  flex: 50%;
}

.col-75 {
  -ms-flex: 75%; /* IE10 */
  flex: 75%;
}

.col-25,
.col-50,
.col-75 {
  padding: 0 16px;
}

.container {
  background-color: #f2f2f2;
  padding: 5px 20px 15px 20px;
  border: 1px solid lightgrey;
  border-radius: 3px;
}

input[type=text] {
  width: 100%;
  margin-bottom: 20px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

label {
  margin-bottom: 10px;
  display: block;
}

.icon-container {
  margin-bottom: 20px;
  padding: 7px 0;
  font-size: 24px;
}

.btn {
  background-color: #f2f2f2;
  color: white;
  padding: 12px;
  margin: 10px 0;
  border: none;
  width: 100%;
  border-radius: 3px;
  cursor: pointer;
  font-size: 17px;
}

.btn:hover {
  background-color: #45a049;
}

.ok{
 box-sizing: border-box;
}

a {
  color: #2196F3;
}

hr {
  border: 1px solid lightgrey;
}

span.price {
  float: right;
  color: grey;
}

/* Responsive layout - when the screen is less than 800px wide, make the two columns stack on top of each other instead of next to each other (also change the direction - make the "cart" column go on top) */
@media (max-width: 800px) {
  .row {
    flex-direction: column-reverse;
  }
  .col-25 {
    margin-bottom: 20px;
  }

}
</style>