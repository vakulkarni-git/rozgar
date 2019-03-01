<template>
  <!-- Main content -->
  <section class="content">
    <div class="row">

      <!-- Info boxes -->
      <div class="col-md-3 col-sm-6 col-xs-12">
        <info-box color-class="bg-aqua"
                  :icon-classes="['ion', 'ion-ios-gear-outline']"
                  text="Employed"
                  number="90%"></info-box>
      </div>
      <!-- /.col -->
      <div class="col-md-3 col-sm-6 col-xs-12">
        <info-box color-class="bg-red"
                  :icon-classes="['ion', 'ion-clipboard']"
                  text="Total Work Orders"
                  number="41,410"></info-box>
      </div>
      <!-- /.col -->
      <!-- /.col -->
    </div>
    <!-- /.row -->

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

    <div v-for="labourer in this.getLabourers()" @click="displayDetails(labourer['.key'], from, to, labourer)">
            <process-info-box color-class="bg-aqua"
                          :icon-classes="['ion', 'ion-ios-person']"
                          :text=labourer.name
                          :number=labourer.phone_number
                          :progress=labourer.id/(Math.random()*10+1)
                          description="Progress seen in the last 30 days"> </process-info-box>
    </div>


  </section>
  <!-- /.content -->
</template>

<script>
  
  import Datepicker from 'vuejs-datepicker'
  import { find } from 'lodash'
  import { database } from '@/services/firebase'
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
    methods: {
      displayDetails (id, from, to, labourer) {
        this.$router.replace({name: 'confirmation', params: { id: id }, query: {from: from, to: to, labourer: labourer}})
      },
      getChosenWorker (from, to) {
        // var labourers = this.getLabourers()
        var chosenLabourer = ''
        console.log('getChosenWorker', this.$refs.labourerEntry)
        var labourerEntries = this.$refs.labourerEntry
        for (var i = 0; i < labourerEntries.length; i++) {
          console.log('getChosenWorker', JSON.stringify(labourerEntries[i]))
          if (labourerEntries[i].checked) {
            chosenLabourer = labourerEntries[i].id
          }
        }
        var labourers = this.getLabourers()
        for (i = 0; i < labourers.length; i++) {
          if (labourers[i].id === parseInt(chosenLabourer)) {
            chosenLabourer = labourers[i]
            break
          }
        }

        console.log('getChosenWorker', chosenLabourer, from, to)
        this.postWorkAppointment('100', chosenLabourer.id, chosenLabourer.name, from, to, chosenLabourer.skill)
        this.$router.replace({name: 'payment'})
      },
      getRadioId (labourer) {
        return 'radio' + labourer.id
      },
      getLabourers () {
        /*
        if (navigator.onLine) {
          this.saveLabourersToCache()
          console.log('DetailView', JSON.stringify(this.labourers))
          return this.labourers
        } else {
          console.log('DetailView', localStorage.getItem(this.worker.comment + 'labourers'))
          return JSON.parse(localStorage.getItem(this.worker.comment + 'labourers'))
        }
        */
        if (localStorage.getItem(this.worker.comment + 'labourers')) {
          console.log('DetailView', localStorage.getItem(this.worker.comment + 'labourers'))
          return JSON.parse(localStorage.getItem(this.worker.comment + 'labourers'))
        } else {
          this.saveLabourersToCache()
          console.log('DetailView', JSON.stringify(this.labourers))
          return this.labourers
        }
      },
      saveLabourersToCache () {
        console.log('saveLabourersToCache', this.worker, this.worker.comment)
        if (this.worker) {
          this.labourersRef = database.ref(this.worker.comment).orderByChild('id').limitToLast(10)
        }
        if (this.worker !== this.oldWorker && !this.labourers && this.labourersRef) {
          this.oldWorker = this.worker
          this.labourersRef.once('value', (snapshot) => {
            let cachedLabourers = []
            snapshot.forEach((labourerSnapshot) => {
              let cachedLabourer = labourerSnapshot.val()
              cachedLabourer['.key'] = labourerSnapshot.key
              cachedLabourers.push(cachedLabourer)
            })
            this.labourers = cachedLabourers
            localStorage.setItem(this.worker.comment + 'labourers', JSON.stringify(cachedLabourers))
          })
        }
      }
    },
    data () {
      return {
        oldWorker: null,
        worker: null,
        labourerEntry: [],
        labourersRef: null,
        labourers: null,
        state: state,
        disabledFromDates: {
          to: new Date()
        },
        disabledToDates: {
          to: state.fromdate
        }
      }
    },
    mounted () {
      this.worker = find(this.$root.worker, (worker) => worker['.key'] === this.$route.params.id)
      this.saveLabourersToCache()
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
