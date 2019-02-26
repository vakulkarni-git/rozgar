<template>
  <div>
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--3-col mdl-cell mdl-cell--1-col-tablet mdl-cell--hide-phone"></div>
      <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-phone">
        <div v-for="workAppointment in this.getWorkAppointments()" class="image-card" @click="displayDetails(picture['.key'])">
          <div class="image-card__comment mdl-card__actions">
            <span>⮚{{ workAppointment.name }}</span>
          </div>
          <div class="image-card__picture">
            <span>Worker Id🡲{{ workAppointment.id }}</span><br/>
            <span>Wroking From🡲{{ workAppointment.from }}</span><br/>
            <span>Working TO🡲{{ workAppointment.to }}</span><br/>
            <span>Worker Skill🡲{{ workAppointment.work_description }}</span><br/>
          </div>
          
        </div>
      </div>
    </div>
  </div>
  
</template>
<script>
  export default {
    methods: {
      displayDetails (id) {
        // this.$router.push({name: 'detail', params: { id: id }})
      },
      getWorkAppointments () {
        if (navigator.onLine) {
          this.saveWorkAppointmentsToCache()
          console.log('WorkAppointments', JSON.stringify(this.$root.workAppointment))
          return this.$root.workAppointment
        } else {
          console.log('WorkAppointments', localStorage.getItem('workAppointments'))
          return JSON.parse(localStorage.getItem('workAppointments'))
        }
      },
      saveWorkAppointmentsToCache () {
        this.$root.$firebaseRefs.workAppointment.orderByChild('created_at').once('value', (snapshot) => {
          let cachedWorkAppointments = []
          snapshot.forEach((workAppointmentSnapshot) => {
            let cachedWorkAppointment = workAppointmentSnapshot.val()
            cachedWorkAppointment['.key'] = workAppointmentSnapshot.key
            cachedWorkAppointments.push(cachedWorkAppointment)
          })
          localStorage.setItem('workAppointments', JSON.stringify(cachedWorkAppointments))
        })
      }
    },
    mounted () {
      this.saveWorkAppointmentsToCache()
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
