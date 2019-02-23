<template>
  <form>
  <h1>Register with ROJGAR</h1>
<p1><h2>WHERE POTENTIAL MEETS THE NEED</h2></p1>



<form action="http://www.mdldiamonds.com/register.asp" method="post">
  <input name="required" type="hidden" value="company,contactname,email,telephone,streetaddress,city,country,username,password,question1,question2,question3,question4">
  <input name="return" type="hidden" value="1">
  <table>
    <tbody>
    <tr>
      <td><p><h2>Name:</h2></p></td>
      <td><input name="contactname" type="text" value=""> <span class="required">*</span></td>
    </tr>
    <tr>
      <td><p><h2> Email:</h2></p></td>
      <td><input name="email" type="text" value=""> <span class="required">*</span></td>
    </tr>
    <tr>
      <td><p><h2>Telephone:</h2></p></td>
      <td><input name="telephone" type="text" value=""> <span class="required">*</span></td>
    </tr>
   
   
    <tr>
      <td><p><h2>Province or State:</h2></p></td>
      <td><input name="province" type="text" value=""></td>
    </tr>
    <tr>
      <td><p><h2>Postal or Zip Code:</h2></p></td>
      <td><input name="postalcode" type="text" value=""></td>
    </tr>
    <tr>
      <td><p><h2>Country:</h2></p></td>
      <td><input name="country" type="text" value=""> <span class="required">*</span></td>
    </tr>
    <tr>
      <td><p><h2>Choose a Login Name:</h2></p></td>
      <td><input name="username" type="text" value=""> <span class="required">*</span><br>
        <span class="tabletext">(5 - 8 characters, letters and numbers only)</span></td>
    </tr>
    <tr>
      <td><p><h2>Choose a Password:</h2></p></td>
      <td><input name="password" type="password" value=""> <span class="required">*</span><br>
        <span class="tabletext">(5 - 8 characters, letters and numbers only)</span></td>
    </tr>
    
    
   
    <tr>
      <td><p><h2>Date Of Birth:</h2></p></td>
      <td><input name="question3" type="text" value=""> <span class="required">*</span><br></td>
   
      <td colspan="2"><p align="center"><input type="hidden" name="ai" value=""><input type="submit" value="Submit"> <input type="reset" value="Clear"></p></td>
    </tr>
  </tbody></table>
</form>


  </tr>
</tbody></table>
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--8-col">
        <div class="card-image__picture">
          <img :src="this.workerUrl"/>
        </div>
      </div>
      <div class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet">
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded is-dirty">
          <input id="username" v-model="title" type="text" class="mdl-textfield__input"/>
          <label for="username" class="mdl-textfield__label">Describe me</label>
        </div>
        <div class="actions">
          <a @click.prevent="postWorker(workerUrl, title)" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
            POST A PICTURE NEW VIEW 3
          </a>
        </div>
      </div>
    </div>
  </form>
</template>
<script>
  import parse from 'xml-parser'
  import postWorker from '@/mixins/postWorker'

  export default {
    mixins: [postWorker],
    data () {
      return {
        'workerUrl': null
      }
    },
    mounted () {
      this.$http.get('https://thecatapi.com/api/images/get?format=xml&results_per_page=1').then(response => {
        this.workerUrl = parse(response.body).root.children['0'].children['0'].children['0'].children['0'].content
      })
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
  background-color: #4CAF50;
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
