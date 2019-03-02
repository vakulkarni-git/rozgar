 <template>
  <form>
  <div class="row">
  <div class="col-75">
    <div class="container">
     

        <div class="row">
          <div class="col-50">
            <h3>Payment Details</h3>
            <label for="fname"><i class="fa fa-user"></i> Full Name</label>
            <input type="text" id="fname" name="firstname" placeholder="Anand"></p>
            <label for="adr"><i class="fa fa-address-card-o"></i><br/> Address</label>
            <input type="text" id="adr" name="address" placeholder="542 W. 15th Street"></p>
            <label for="city"><i class="fa fa-institution"></i><br/> City</label>
            <input type="text" id="city" name="city" placeholder="Belagavi"></p>

            <div class="row">
              <div class="col-50">
                <label for="state">State</label>
                <input type="text" id="state" name="state" placeholder="Karnataka"></p>
              </div>
              <div class="col-50">
                <label for="zip">Pin code</label>
                <input type="text" id="pincode" name="pincode" placeholder="590006">
              </div>
            </div>
          </div>

          <div class="col-50">
            <h3>Payment</h3>
            
            
            
            <label for="cname">Account holder name</label>
            <input type="text" id="cname" name="cardname" placeholder="Anand"><br/></p>
            <label for="ccnum">Account number</label>
            <input type="text" id="ccnum" name="cardnumber" placeholder="9170100000000319"></p>
           
            
              <div class="col-50">
                <label for="IFSC">IFSC Code</label>
                <input type="text" id="IFSC" name="" placeholder="KARB00006">
              </div>
              <div class="col-50">
                <label for="IFSC">Amount</label>
                <input type="text" id="IFSC" name="" placeholder="KARB00006">
              </div>
            </div>
          </div>
  <input type="radio" v-model="color" value="0">Agree with terms and conditions
  <div align="center" class="actions">
        <router-link id="log-in-button" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored spinner" to="/aboutus">
          Read terms and conditions
        </router-link>
      </div>
    
  <br>
        </div>
       <div class="btn" align="center">
		<router-link input type="submit" to="/DrawingSheet" value="Direct cash payment" class="btn"></p>
    Direct cash payment</router-link>
    </div>
        <input type="submit" value="Submit" class="btn" @click="createPDF">
    
    </div>
  </div>
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--8-col">
        <div class="card-image__picture">
          <img :src="this.workerUrl"/>
        </div>
      </div>
      
    </div>
  </form>
</template>
<script>
  import postWorker from '@/mixins/postWorker'
  import JSPDF from 'jspdf'

  export default {
    mixins: [postWorker],
    data () {
      return {
        'workerUrl': null,
        labourer: null
      }
    },
    methods: {
      createPDF () {
        let pdfName = 'test'
        var doc = new JSPDF()
        doc.text('PAY INVOICE', 85, 15)
        doc.line(10, 17, 200, 17)
        doc.text('ROJGAR YOJNA', 10, 25)
        doc.text('Where Potential Meets The Need', 10, 35)
        doc.text('Invoice No. :', 10, 55)
        doc.text('Invoice Date:', 150, 55)
        doc.text('From:', 10, 75)
        doc.text('To:', 150, 75)
        doc.line(10, 115, 200, 115)
        doc.line(10, 140, 200, 140)
        doc.text('PERIOD', 12, 125)
        doc.text('SECTOR', 60, 125)
        doc.text('WAGES/DAY', 110, 125)
        doc.text('TOTAL', 170, 125)
        doc.line(10, 115, 10, 175)
        doc.line(50, 115, 50, 175)
        doc.line(100, 115, 100, 175)
        doc.line(160, 115, 160, 175)
        doc.line(200, 115, 200, 175)
        doc.line(10, 175, 200, 175)
        doc.text('SUBTOTAL', 125, 185)
        doc.text('TAX', 142, 193)
        doc.text('TOTAL', 137, 201)
        doc.line(160, 175, 160, 203)
        doc.line(200, 175, 200, 203)
        doc.line(160, 203, 200, 203)
        doc.line(160, 194, 200, 194)
        doc.text('If you have any questions concerning this invoice,contact[Name,phone no.]', 12, 230)
        doc.text('Thank You for your business!', 12, 245)
        doc.line(10, 220, 200, 220)
        doc.line(10, 255, 200, 255)
        doc.line(10, 220, 10, 255)
        doc.line(200, 220, 200, 255)
        doc.line(10, 285, 200, 285)

        doc.save(pdfName + '.pdf')
      }
    },
    mounted () {
      this.labourer = this.$route.params.labourer
    }
  }
</script>
<style scoped>
  .waiting {
    padding: 10px;
    color:  lightgrey;
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
  margin: 10px ;
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
