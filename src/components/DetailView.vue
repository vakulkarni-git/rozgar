<template>
  <div class="mdl-grid">
    <div class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet">
    <form>
      <div>
      <h5>Job According to Skill</h5>
      </div>
      <div class="mdl-selectfield mdl-js-selectfield">
        <p>
        <select class="mdl-selectfield__select" id="professsion1" name="professsion">
          <option value=""></option>
          <option value="option1">Skill 1 </option>
          <option value="option2">Skill 2</option>
          <option value="option3">Skill 3</option>
          <option value="option4">Skill 4</option>
        </select>
        <label class="mdl-selectfield__label" for="professsion1">Profession</label>
        </p>
      </div>
    </form>
    <div>
        From: 
        <input type="date">
       To: 
        <input type="date">
     </div>
      <div v-for="labourer in this.getLabourers()" class="image-card">
          <div class="image-card__comment mdl-card__actions">
              
            <button><span>{{ labourer.name }}</span></button>
          </div>
          <div class="image-card__comment mdl-card__actions">
            <span>{{ labourer.skill }}</span>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { find } from 'lodash'
  import { database } from '@/services/firebase'

  export default {
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
  .picture > img {
    color: #fff;
    width:100%;
  }
  .info {
    text-align: right;
    padding: 5px;
    color: #555;
    font-size: 10px;
  }
  .comment {
    padding: 10px;
    color: #555;
  }
  .actions {
    text-align: center;
  }
</style>
