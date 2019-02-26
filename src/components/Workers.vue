<template>
  <form>
  <div class="mdl-grid">
    <div class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet">
    <form>
      <div>
      <h5>Select work basis</h5>
      </div>
      <div class="mdl-selectfield mdl-js-selectfield">
        <p>
        <select class="mdl-selectfield__select" id="professsion1" name="professsion">
          <option value="">Select one</option>
          <option value="1">Time specific work</option>
          <option value="2">Task/Job specific work</option>
        </select> 
        
        <label class="mdl-selectfield__label" for="professsion1">Profession</label>
        </p> 
      </div>
    </form>
    <div>
        From: 
       <datepicker v-model="state.fromdate" name="from" :disabledDates="disabledFromDates"></datepicker>
       <meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
     </div>
       To: 
        <datepicker v-model="state.todate" name="to" :disabledDates="disabledToDates"></datepicker> 
        <div>
          <br>
        </div>
      <div v-for="labourer in this.getLabourers()" class="image-card">
          <div class="image-card__comment mdl-card__actions">
            <input type="radio" @click.prevent="postWorkAppointment(labourer.id, labourer.id, labourer.name, from, to, labourer.skill)">👤<span>{{ labourer.name }}</span>
          :☎️ <span>{{ labourer.phone_number }}</span>
          </div>
          <div class="image-card__comment mdl-card__actions">
            <span>{{labourer.skill }}</span>
          </div>
      </div>
      <router-link class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" to="/payment">
          Submit
      </router-link>
    </div>
  </div>
  </form>
</template>
<script>
  
  import Datepicker from 'vuejs-datepicker'
  import { find } from 'lodash'
  import { database } from '@/services/firebase'
  import postWorkAppointment from '@/mixins/postWorkAppointment'

  var state = {
    fromdate: new Date(),
    todate: new Date()
  }

  export default {
    components: {
      Datepicker
    },
    mixins: [postWorkAppointment],
    methods: {
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

<<<<<<< HEAD
=======
.image-card__comment mdl-card__actions:hover{
  background-color: #45a049;
}

.image-card__comment mdl-card__actions:hover{
  background-color: #45a049;
}

>>>>>>> 62006cf7e8b31c1ab86d3210028268fa33c6aeed
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
