<template>
  <div>
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--3-col mdl-cell mdl-cell--1-col-tablet mdl-cell--hide-phone"></div>
      <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-phone">
        <div v-for="timeline in this.getTimeline()" class="image-card" @click="displayDetails(picture['.key'])">
          <!-- timeline icon -->
          <i v-bind:class="'fa ' + timeline.icon + ' bg-' + timeline.color"></i>
          <div class="timeline-item">
            <span class="time"><i class="fa fa-clock-o"></i>&nbsp;{{ timeline.time }}</span>
            <h3 class="timeline-header">{{ timeline.title }}</h3>
            <div class="timeline-body" v-if="timeline.message" v-html="timeline.message">
            </div>
            <div class="timeline-footer" v-if="timeline.buttons" style="margin-top:10px;">
              <star-rating  v-bind:star-size="20" v-model="rating"></star-rating>
            </div>
            <div class="timeline-footer" v-if="timeline.buttons" style="margin-top:10px;">
              <button id="payment-button" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored spinner" @click.prevent="gotoPayment()">
                 Go to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>
<script>
  import { database } from '@/services/firebase'
  import StarRating from 'vue-star-rating'
  export default {
    components: {
      StarRating
    },
    methods: {
      gotoPayment () {
        var ref = database.ref(this.workAppointment.reference).orderByChild('id').equalTo(this.workAppointment.workerId)
        ref.on('value', function (snapshot) {
          snapshot.forEach(function (data) {
            var value = data.val()
            console.log(data.val())
            var ratingAvg = 0
            console.log(this.rating)
            if ('rating' in value) {
              ratingAvg = (value.rating + this.rating) / 2.0
            } else {
              ratingAvg = this.rating
            }
            console.log(ratingAvg)
            ref.update({'rating': ratingAvg})
          })
        })
        this.$router.push({name: 'payment', params: {workAppointment: this.workAppointment}})
      },
      getTimeline () {
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
        if (localStorage.getItem('timeline' + this.id)) {
          console.log('Timeline', localStorage.getItem('timeline' + this.id))
          return JSON.parse(localStorage.getItem('timeline' + this.id))
        } else {
          this.saveTimelineToCache()
          return this.$root.timeline
        }
      },
      saveTimelineToCache () {
        var ref = database.ref('Timeline').orderByChild('appointment').equalTo(this.id)
        ref.once('value', (snapshot) => {
          let cachedTimelines = []
          snapshot.forEach((timelineSnapshot) => {
            let cachedTimeline = timelineSnapshot.val()
            cachedTimeline['.key'] = timelineSnapshot.key
            cachedTimelines.push(cachedTimeline)
          })
          localStorage.setItem('timeline' + this.id, JSON.stringify(cachedTimelines))
        })
      }
    },
    data () {
      return {
        id: null,
        workAppointment: null,
        rating: 0
      }
    },
    mounted () {
      this.id = this.$route.params.id
      this.workAppointment = this.$route.params.workAppointment
      this.saveTimelineToCache()
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
