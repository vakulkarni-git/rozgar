<template>
  <div>
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--3-col mdl-cell mdl-cell--1-col-tablet mdl-cell--hide-phone"></div>
      <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-phone">
        <div v-for="picture in this.getWorkers()" class="image-card" @click="displayDetails(picture['.key'], picture.comment)">
          <div class="image-card__picture">
            <img :src="picture.url" />
          </div>
          <div class="image-card__comment mdl-card__actions">
            <span>{{ picture.comment }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      displayDetails (id, ref) {
        this.$router.replace({name: 'workers', params: { id: id }, query: {reference: ref}})
      },
      getWorkers () {
        /*
        if (navigator.onLine) {
          this.saveWorkersToCache()
          console.log('HomeView', JSON.stringify(this.$root.worker))
          return this.$root.worker
        } else {
          console.log('HomeView', localStorage.getItem('workers'))
          return JSON.parse(localStorage.getItem('workers'))
        } */
        if (localStorage.getItem('workers')) {
          console.log('HomeView', localStorage.getItem('workers'))
          return JSON.parse(localStorage.getItem('workers'))
        } else {
          this.saveWorkersToCache()
          return this.$root.worker
        }
      },
      saveWorkersToCache () {
        this.$root.$firebaseRefs.worker.orderByChild('created_at').once('value', (snapshot) => {
          let cachedWorkers = []
          snapshot.forEach((workerSnapshot) => {
            let cachedWorker = workerSnapshot.val()
            cachedWorker['.key'] = workerSnapshot.key
            cachedWorkers.push(cachedWorker)
          })
          localStorage.setItem('workers', JSON.stringify(cachedWorkers))
        })
      }
    },
    data () {
      return {
        oldSME: null,
        SME: 'sme'
      }
    },
    mounted () {
      this.SME = new Date().now
      this.saveWorkersToCache()
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
