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
        <input v-model="from" type="date" >
       To: 
        <input v-model="to" type="date">
     </div>
      <div v-for="labourer in this.getLabourers()" class="image-card">
          <div class="image-card__comment mdl-card__actions">
            <input type="radio" @click.prevent="postWorkAppointment(labourer.id, labourer.id, labourer.name, from, to, labourer.skill)"><span>{{ labourer.name }}</span>
          </div>
          <div class="image-card__comment mdl-card__actions">
            <span>{{labourer.skill }}</span>
          </div>
      </div>
    </div>
  </div>
  </form>
</template>
<script>
  import { find } from 'lodash'
  import { database } from '@/services/firebase'
  import postWorkAppointment from '@/mixins/postWorkAppointment'

  export default {
    mixins: [postWorkAppointment],
    methods: {
      getLabourers () {
        if (navigator.onLine) {
          this.saveLabourersToCache()
          console.log('DetailView', JSON.stringify(this.labourers))
          return this.labourers
        } else {
          console.log('DetailView', localStorage.getItem(this.worker.comment + 'labourers'))
          return JSON.parse(localStorage.getItem(this.worker.comment + 'labourers'))
        }
      },
      saveLabourersToCache () {
        if (this.worker) {
          this.labourersRef = database.ref(this.worker.comment).orderByChild('id').limitToLast(10)
        }
        if (!this.labourers) {
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
        worker: null,
        labourersRef: null,
        labourers: null
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

.container {
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

.mdl-selectfield__select:hover{
  background-color: rgb(206, 240, 253);
  color: white;
  padding: 12px;
  margin: 10px 0;
  border: none;
  width: 100%;
  border-radius: 3px;
  cursor: pointer;
  font-size: 17px;
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
