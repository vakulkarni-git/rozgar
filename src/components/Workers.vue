<template>
  <!-- Main content -->
  <section class="content">
    <div class="input-group mb-3" style="margin-top:20px;">
  <input type="text" class="form-control" aria-label="Text input with dropdown" placeholder="Search by location" v-model="searchText">
  <div class="input-group-append">
    <button class="input-group-text" @click="forceRenderer">Search</button>
  </div>
</div>
    <div v-for="labourer in this.getLabourers()" @click="displayDetails(labourer)" :key="labourerKey">
            <process-info-box color-class="bg-aqua"
                          :icon-classes="['ion', 'ion-ios-person']"
                          :text=labourer.name
                          :number=labourer.phone_number
                          :progress=labourer.rating*20
                          description="Avg rating earned"> </process-info-box>
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
      displayDetails (labourer) {
        this.$router.push({name: 'BookWorker', query: {workerAdvertisement: labourer, id: labourer.id, reference: this.reference}})
      },
      forceRenderer () {
        console.log('forceRenderer')
        this.labourerKey += 1
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
        if (localStorage.getItem(this.worker.comment + 'labourers')) {
          console.log('DetailView', localStorage.getItem(this.worker.comment + 'labourers'))
          var workers = JSON.parse(localStorage.getItem(this.worker.comment + 'labourers'))
          var filtered = workers
          if (this.searchText && this.searchText.length >= 3) {
            filtered = workers.filter(worker => {
              worker.place = 'place' in worker ? worker.place : ''
              return worker.place.toLowerCase().includes(this.searchText.toLowerCase())
            })
            return filtered
          }
          return workers
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
        labourerKey: 0,
        labourers: null,
        state: state,
        searchText: '',
        reference: '',
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
