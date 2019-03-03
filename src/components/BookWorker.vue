<template>
  <!-- Main content -->
  <section class="content">
    <div class="col-xs-12">
      <div class="input-group mb-3">
      <div class="input-group-prepend">
        <label class="input-group-text" for="inputGroupSelect01">Work Type</label>
      </div>
      <select class="custom-select" id="inputGroupSelect01">
        <option selected>Choose...</option>
        <option value="1">Work Quantum Basis</option>
        <option value="2">Fixed Time Basis</option>
      </select>
      </div>
    </div>

    <div class="input-group mb-3">
     <div class="input-group-prepend">
       <span class="input-group-text" id="basic-addon1">Start Date</span>
     </div>
     <datepicker style="line-height:2;" v-model="from" name="fromdate" :disabledDates="disabledFromDates" placeholder="Pick a start date"></datepicker>
    </div>

    <div class="input-group mb-3">
     <div class="input-group-prepend">
       <span class="input-group-text" id="basic-addon1">End Date</span>
     </div>
     <datepicker style="line-height:2;" v-model="to" name="todate" :disabledDates="disabledFromDates" placeholder="Pick an end date"></datepicker>
    </div>

    <div class="input-group mb-3">
      <button type="button" class="btn btn-primary" @click.prevent="displayDetails(id, from, to, labourer)">Book Work Appointment</button>
    </div>
  </section>
  <!-- /.content -->
</template>

<script>
  
  import Datepicker from 'vuejs-datepicker'
  import postWorkAppointment from '@/mixins/postWorkAppointment'
  import Alert from './widgets/Alert'
  import InfoBox from './widgets/InfoBox'
  import ProcessInfoBox from './widgets/ProcessInfoBox'

  var state = {
    fromdate: new Date(),
    todate: new Date()
  }

  export default {
    components: {
      Datepicker,
      Alert,
      InfoBox,
      ProcessInfoBox
    },
    mixins: [postWorkAppointment],
    data () {
      return {
        workerAdvertisement: null,
        from: null,
        to: null,
        id: null,
        labourer: null,
        state: state,
        workerId: '',
        reference: '',
        disabledFromDates: {
          to: new Date()
        },
        disabledToDates: {
          to: new Date()
        }
      }
    },
    methods: {
      displayDetails (id, from, to, labourer) {
        this.$router.replace({name: 'confirmation', params: { id: id }, query: {from: from.toISOString(), to: to.toISOString(), labourer: labourer, workerId: this.workerId, reference: this.reference}})
      }
    },
    mounted () {
      this.workerAdvertisement = this.$route.query.workerAdvertisement
      this.id = this.workerAdvertisement.id
      this.labourer = this.workerAdvertisement
      this.workerId = this.$route.query.id
      this.reference = this.$route.query.reference
    }
  }

</script>
<style scoped>
.info-box {
  cursor: pointer;
}
.info-box-content {
  text-align: center;
  vertical-align: middle;
  display: inherit;
}
.fullCanvas {
  width: 100%;
}
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

.image-card {
  background-color: #f2f2f2;
  padding: 5px 20px 15px 20px;
  border: 1px solid lightgrey;
  border-radius: 3px;
}

input[type=date] {
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

.image-card__comment mdl-card__actions:hover{
  background-color: #45a049;
}

.image-card__comment mdl-card__actions:hover{
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