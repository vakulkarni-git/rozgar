<template>
  <form class="container">
  <h3>Register with ROZGAR as a MSME</h3>
WHERE POTENTIAL MEETS THE NEED

<div><br></div>

<form class="container">
  <input name="required" type="hidden" value="company,contactname,email,telephone,streetaddress,city,country,username,password,question1,question2,question3,question4">
  <input name="return" type="hidden" value="1">
  <table>
    <tbody>
    <tr>
      <td><p>Name:</p></td>
      <td><input name="contactname" type="text" value=""></td>
    </tr>
    <tr>
      <td><p>Telephone:</p></td>
      <td><input name="telephone" type="text" value=""></td>
    </tr>
   
   
    <tr>
      <td><p>Province or State:</p></td>
      <td><input name="province" type="text" value=""></td>
    </tr>
    <tr>
      <td><p>Postal or Zip Code:</p></td>
      <td><input name="postalcode" type="text" value=""></td>
    </tr>
    <tr>
      <td><p>Udyog Aadhar Number:</p></td>
      <td><input name="udyogaadhar" type="text" value=""></td>
    </tr>
    <tr>
      <td><p>Industry Sector:</p></td>
      <td><select class="custom-select" id="inputGroupSelect01">
        <option selected>Choose...</option>
        <option value="1">Advertising</option>
        <option value="2">Ancillary</option>
        <option value="3">Feeder</option>
        <option value="4">Mining</option>
        <option value="5">Textile</option>
      </select></td>
    </tr>
    <tr>
      <td><p>Choose a Login Name:</p></td>
      <td><input name="username" type="text" value=""></td><br>
    </tr>
    <tr>
      <td><p>Choose a Password:</p></td>
      <td><input name="password" type="password" value=""></td><br>
    </tr>
    
    
   
    <tr>
      <td><p>Year Of Registration:</p></td>
      <td><input name="question3" type="text" value=""><br></td>
      <br>
    </tr>
  </tbody></table>
  <input type="submit" value="Submit" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
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
        </div>
        <div class="actions">
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
