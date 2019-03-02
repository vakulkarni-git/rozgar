 <template>
  <form>
  <div class="row">
  <div class="col-75">
    <div class="container">
     

        <div class="row">
          <div class="col-50">
            <h3>Payment Details</h3>
            <label for="fname"><i class="fa fa-user"></i> Full Name</label>
            <input type="text" id="fname" name="firstname" :value="this.workAppointment.name">
            <label for="adr"><i class="fa fa-address-card-o"></i><br/> Address</label>
            <input type="text" id="adr" name="address" :value="this.address">
            <label for="city"><i class="fa fa-institution"></i><br/> City</label>
            <input type="text" id="city" name="city" :value="this.city">

            <div class="row">
              <div class="col-50">
                <label for="state">State</label>
                <input type="text" id="state" name="state" :value="this.state"></p>
              </div>
              <div class="col-50">
                <label for="zip">Pin code</label>
                <input type="text" id="pincode" name="pincode" :value="this.pincode">
              </div>
            </div>
          </div>

          <div class="col-50">
            <h3>Payment</h3>
            
            
            
            <label for="cname">Account holder name</label>
            <input type="text" id="cname" name="cardname" :value="this.workAppointment.name"><br/></p>
            <label for="ccnum">Account number</label>
            <input type="text" id="ccnum" name="cardnumber" :value="this.accountnumber"></p>
           
            
              <div class="col-50">
                <label for="IFSC">IFSC Code</label>
                <input type="text" id="IFSC" name="" :value="this.ifsccode">
              </div>
              <div class="col-50">
                <label for="IFSC">Amount</label>
                <input type="text" id="IFSC" name="" :value="this.amount">
              </div>
            </div>
          </div>
  <input type="checkbox" checked> Agree with terms and conditions
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
        <input type="submit" value="Submit" class="btn" @click.prevent="createPDF">
    
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
        workAppointment: null,
        accountnumber: null,
        amount: null,
        address: null,
        city: null,
        ifsccode: null,
        state: null,
        pincode: null,
        invoiceNumber: null,
        invoiceDate: null,
        period: null,
        sector: null,
        wagesPerDay: null,
        cgst: null,
        sgst: null
      }
    },
    methods: {
      createPDF () {
        let pdfName = 'test'
        var doc = new JSPDF()
        doc.text('INVOICE', 100, 15)
        doc.line(10, 17, 200, 17)
        doc.text('ROJGAR YOJNA', 10, 25)
        doc.text('Where Potential Meets The Need', 10, 35)
        doc.text('Invoice No. :', 10, 55)
        doc.text(this.invoiceNumber, 45, 55)
        doc.text('Udyog Aadhar :', 10, 65)
        doc.text('6736839263529123', 50, 65)
        doc.text('Invoice Date:', 135, 55)
        doc.text(this.invoiceDate, 170, 55)
        doc.text('From:', 10, 75)
        doc.text('Bluegrenade Pvt Ltd', 15, 85)
        doc.text('Lane 6, Cross 7', 15, 91)
        doc.text('MV Road', 15, 97)
        doc.text('Belagavi - 590003', 15, 103)
        doc.text('To:', 130, 75)
        doc.text(this.workAppointment.name, 130, 85)
        doc.text(this.address, 130, 91)
        doc.text('ABV Road', 130, 97)
        doc.text('Belagavi - 590001', 130, 103)
        doc.line(10, 115, 200, 115)
        doc.line(10, 140, 200, 140)
        doc.text('PERIOD', 12, 125)
        doc.text(this.period, 18, 155)
        doc.text('SECTOR', 60, 125)
        doc.text(this.sector, 65, 155)
        doc.text('WAGES/DAY', 110, 125)
        doc.text(this.wagesPerDay, 115, 155)
        doc.text('TOTAL (INR)', 165, 125)
        doc.text((this.amount * 1.00).toFixed(2).toString(), 175, 155)
        doc.line(10, 115, 10, 175)
        doc.line(50, 115, 50, 175)
        doc.line(100, 115, 100, 175)
        doc.line(160, 115, 160, 175)
        doc.line(200, 115, 200, 175)
        doc.line(10, 175, 200, 175)
        doc.text('SUBTOTAL', 125, 185)
        doc.text((this.amount * 1.00).toFixed(2).toString(), 175, 185)
        doc.text('CGST - 8%', 125, 193)
        doc.text(this.cgst.toFixed(2).toString(), 175, 193)
        doc.text('SGST - 8%', 125, 201)
        doc.text(this.sgst.toFixed(2).toString(), 175, 201)
        doc.text('TOTAL', 137, 213)
        doc.text(((this.amount + this.cgst + this.sgst) * 1.00).toFixed(2).toString(), 175, 213)
        doc.line(160, 175, 160, 215)
        doc.line(200, 175, 200, 215)
        doc.line(160, 205, 200, 205)
        doc.line(160, 215, 200, 215)
        doc.text('If you have any questions concerning this invoice, please contact', 12, 230)
        doc.text('Shubham at 8424213423', 12, 240)
        doc.text('Thank you for your business!', 12, 250)
        doc.line(10, 220, 200, 220)
        doc.line(10, 255, 200, 255)
        doc.line(10, 220, 10, 255)
        doc.line(200, 220, 200, 255)
        doc.line(10, 285, 200, 285)
        doc.text('Note: GST is levied as reverse charge and not charged to you.', 12, 270)

        doc.save(pdfName + '.pdf')
      }
    },
    mounted () {
      this.workAppointment = this.$route.params.workAppointment
      this.accountnumber = '10000100001000101011'
      var dayDiff = new Date(this.workAppointment.to) - new Date(this.workAppointment.from)
      if (dayDiff < 0) {
        dayDiff = 0
      }
      var numOfHours = Math.ceil(dayDiff / 86400000) * 8
      var hourlyPay = 15
      this.amount = numOfHours * hourlyPay

      this.address = 'Lane 2, Cross 5, SV Nagar'
      this.city = 'Belagavi'
      this.ifsccode = 'KARB00006'
      this.state = 'Karnataka'
      this.pincode = '590006'

      var milliseconds = (new Date()).getTime()
      this.invoiceNumber = '100' + milliseconds.toString()
      this.invoiceDate = (new Date().toISOString()).substring(0, 10)
      this.period = parseInt(Math.ceil(dayDiff / 86400000)) + ' days'
      this.sector = 'MSME'
      this.wagesPerDay = 'Rs. 15'
      this.cgst = 0.09 * this.amount
      this.sgst = 0.09 * this.amount
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
