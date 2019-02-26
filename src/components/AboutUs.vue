<template>
  <form>
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--8-col">
        <div class="card-image__picture">
          <img :src="this.workerUrl"/>
        </div>
      </div>
      <div class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet">
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded is-dirty">
          <label for="username" class="mdl-textfield__label">About us</label>
        </div>
        <div class="actions">
            Plan Scheme has been designed to incentivise employers for generation of new employment, where Government of India will be paying the full employer's contribution toward EPS w.e.f 01.04.2018 (earlier benefit was applicable for employer's contribution towards EPS only) for the new employment. This scheme has a dual benefit, where, on the one hand, the employer is incentivised for increasing the employment base of workers in the establishment, and on the other hand, a large number of workers will find jobs in such establishments. A direct benefit is that these workers will have access to social security benefits of the organized sector.
          </a>
        </div>
      </div>
    </div>
  </form>
</template>
<script>
  import parse from 'xml-parser'
  import postWorker from '@/mixins/postWorker'

  export default {
    mixins: [postWorker],
    data () {
      return {
        'workerUrl': null
      }
    },
    mounted () {
      this.$http.get('https://thecatapi.com/api/images/get?format=xml&results_per_page=1').then(response => {
        this.workerUrl = parse(response.body).root.children['0'].children['0'].children['0'].children['0'].content
      })
    }
  }
</script>
<style scoped>
  .waiting {
    padding: 10px;
    color: #555;
  }
</style>
