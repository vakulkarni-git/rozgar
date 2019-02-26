<template>
  <div>
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--3-col mdl-cell mdl-cell--1-col-tablet mdl-cell--hide-phone"></div>
      <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-phone">
        <div v-for="workAppointment in this.getWorkAppointments()" class="image-card" @click="displayDetails(picture['.key'])">
          <div class="image-card__picture">
            <span>{{ workAppointment.id }}</span><br/>
            <span>{{ workAppointment.from }}</span><br/>
            <span>{{ workAppointment.to }}</span><br/>
            <span>{{ workAppointment.work_description }}</span><br/>
          </div>
          <div class="image-card__comment mdl-card__actions">
            <span>{{ workAppointment.name }}</span>
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
  .add-picture-button {
    position: fixed;
    right: 24px;
    bottom: 24px;
    z-index: 998;
  }
  .take-picture-button {
    position: fixed;
    right: 24px;
    bottom: 90px;
    z-index: 5;
  }
  .image-card {
    position: relative;
    margin-bottom: 8px;
  }
  .image-card__picture > img {
    width:100%;
  }
  .image-card__comment {
    position: absolute;
    bottom: 0;
    height: 52px;
    padding: 16px;
    text-align: right;
    background: rgba(0, 0, 0, 0.5);
  }
  .image-card__comment > span {
    color: #fff;
    font-size: 14px;
    font-weight: bold;
  }
</style>
