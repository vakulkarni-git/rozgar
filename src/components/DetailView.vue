<template>
  <div class="mdl-grid">
    <div class="mdl-cell mdl-cell--8-col">
      <div class="picture">
        <img :src="worker.url" />
      </div>
      <div class="info">
        <span>{{ worker.info }}</span>
      </div>
    </div>
    <div class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet">
      <div class="comment">
        <span>{{ worker.comment }}</span>
      </div>
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded is-dirty">
          <label for="stitching" class="mdl-textfield__label" style="font-size:large;">{{ worker.req1 }}</label>
          <select class="mdl-selectfield__select" id="stitching" name="stitching" style="margin-top:10px;">
            <option value="option1">Yes</option>
            <option selected="selected" value="option2">No</option>
          </select>
      </div>
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded is-dirty">
          <label for="management" class="mdl-textfield__label" style="font-size:large;">{{ worker.req2 }}</label>
          <select class="mdl-selectfield__select" id="management" name="management" style="margin-top:10px;">
            <option value="option1">Yes</option>
            <option selected="selected" value="option2">No</option>
          </select>
      </div>
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded is-dirty">
          <label for="skill" class="mdl-textfield__label" style="font-size:large;">{{ worker.req3 }}</label>
          <select class="mdl-selectfield__select" id="skill" name="skill" style="margin-top:10px;">
            <option value="option1">Yes</option>
            <option selected="selected" value="option2">No</option>
          </select>
      </div>
      <div class="actions">
        <router-link class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" to="/post">
          SUBMIT
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
  import { find } from 'lodash'
  export default {
    data () {
      return {
        worker: null
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
