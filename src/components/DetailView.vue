<template>
  <div class="mdl-grid">
    <div class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet">
      <div v-for="labourer in this.getLabourers()" class="image-card">
          <div class="image-card__comment mdl-card__actions">
            <span>{{ labourer.name }}</span>
          </div>
          <div class="image-card__comment mdl-card__actions">
            <span>{{ labourer.phone_number }}</span>
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
        if (this.worker) {
          this.labourers = database.ref(this.worker.comment).orderByChild('id').limitToLast(10)
        }
        console.log('DetailView', this.labourers)
        return this.labourers
      }
    },
    data () {
      return {
        worker: null,
        labourers: null
      }
    },
    mounted () {
      this.worker = find(this.$root.worker, (worker) => worker['.key'] === this.$route.params.id)
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
