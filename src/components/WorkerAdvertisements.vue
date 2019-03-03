<template>
  <div>
    <div class="input-group mb-3" style="margin-top:20px;">
  <div class="input-group-prepend">
    <select class="custom-select" id="inputGroupSelect01" v-model="criteria">
        <option selected>Search by</option>
        <option value="skill">Skill</option>
        <option value="location">Location</option>
      </select>
  </div>
  <input type="text" class="form-control" aria-label="Text input with dropdown" placeholder="Search Text" v-model="searchText">
  <div class="input-group-append">
    <button class="input-group-text" @click="forceRenderer">Search</button>
  </div>
</div>
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--3-col mdl-cell mdl-cell--1-col-tablet mdl-cell--hide-phone"></div>
      <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-phone">
        <div v-for="workerAdvertisement in this.getWorkerAdvertisements()" @click="displayDetails(workerAdvertisement)" :key="advtKey">
          <worker-advertisement-box color-class="bg-red"
                          :icon-classes="['ion', 'ion-ios-person']"
                          :text=workerAdvertisement.name
                          :number=workerAdvertisement.payPerHour
                          :skill1=workerAdvertisement.skill1
                          :level1=workerAdvertisement.level1
                          :skill2=workerAdvertisement.skill2
                          :level2=workerAdvertisement.level2
                          :skill3=workerAdvertisement.skill3
                          :level3=workerAdvertisement.level3></worker-advertisement-box>
        </div>
      </div>
    </div>
  </div>
</template>

  <script>
  import InfoBox from './widgets/InfoBox'
  import ProcessInfoBox from './widgets/ProcessInfoBox'
  import WorkerAdvertisementBox from './widgets/WorkerAdvertisementBox'

  export default {
    components: {
      InfoBox,
      ProcessInfoBox,
      WorkerAdvertisementBox
    },
    data () {
      return {
        advtKey: 0
      }
    },
    methods: {
      displayDetails (workerAdvertisement) {
        this.$router.push({name: 'BookWorker', query: {workerAdvertisement: workerAdvertisement}})
      },
      forceRenderer () {
        console.log('forceRenderer')
        this.advtKey += 1
      },
      getWorkerAdvertisements () {
        console.log('getWorkerAdvertisements')
        /*
        if (navigator.onLine) {
          this.saveWorkAppointmentsToCache()
          console.log('WorkAppointments', JSON.stringify(this.$root.workAppointment))
          return this.$root.workAppointment
        } else {
          console.log('WorkAppointments', localStorage.getItem('workAppointments'))
          return JSON.parse(localStorage.getItem('workAppointments'))
        }
        */
        if (localStorage.getItem('workerAdvertisements')) {
          console.log('workerAdvertisements', localStorage.getItem('workerAdvertisements'))
          var advts = JSON.parse(localStorage.getItem('workerAdvertisements'))
          var filtered = advts
          if (this.searchText && this.searchText.length >= 3) {
            if (this.criteria === 'location') {
              filtered = advts.filter(advt => {
                advt.place = 'place' in advt ? advt.place : ''
                return advt.place.toLowerCase().includes(this.searchText.toLowerCase())
              })
            } else if (this.criteria === 'skill') {
              filtered = advts.filter(advt => {
                var combinedSkill = 'skill1' in advt ? advt.skill1 : ''
                combinedSkill += 'skill2' in advt ? advt.skill2 : ''
                combinedSkill += 'skill3' in advt ? advt.skill3 : ''
                return combinedSkill.toLowerCase().includes(this.searchText.toLowerCase())
              })
            }
            return filtered
          }
          return advts
        } else {
          this.saveWorkAdvertisementsToCache()
          return this.$root.workerAdvertisement
        }
      },
      saveWorkAdvertisementsToCache () {
        console.log('saveWorkAdvertisementsToCache')
        this.$root.$firebaseRefs.workerAdvertisement.once('value', (snapshot) => {
          let cachedWorkerAdvertisements = []
          snapshot.forEach((workerAdvertisementSnapshot) => {
            let cachedWorkerAdvertisement = workerAdvertisementSnapshot.val()
            cachedWorkerAdvertisement['.key'] = workerAdvertisementSnapshot.key
            cachedWorkerAdvertisements.push(cachedWorkerAdvertisement)
          })
          localStorage.setItem('workerAdvertisements', JSON.stringify(cachedWorkerAdvertisements))
        })
      }
    },
    mounted () {
      console.log('mounted')
      this.saveWorkAdvertisementsToCache()
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

.mdl-selectfield__select:hover{
  background-color: rgb(29, 170, 226);
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
  background-color: rgb(29, 170, 226);
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