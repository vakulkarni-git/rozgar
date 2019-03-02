<template>
<!-- Main content -->
  <section class="content">
      <div class="input-group mb-3">
      <div class="input-group-prepend">
        <label class="input-group-text" for="inputGroupSelect01">Skill Type</label>
      </div>
      <select class="custom-select" id="inputGroupSelect01" v-model="skilltype" @change="setSkillType">
        <option class="skilloption" selected>Choose...</option>
        <option class="skilloption" value="1">Template Writing</option>
        <option class="skilloption" value="2">Verbal Communication</option>
        <option class="skilloption" value="3">Machine Handling</option>
        <option class="skilloption" value="4">Campaign Hosting</option>
      </select>
      </div>
    <div v-for="labourer in this.getWorkers()">
            <process-info-box color-class="bg-aqua"
                          :icon-classes="['ion', 'ion-ios-person']"
                          :text=labourer.name
                          :number=labourer.phone_number
                          :progress=labourer.id/(Math.random()*10+1)
                          description="Progress seen in the last 30 days"></process-info-box>
    </div>
    </section>
</template>

<script>
  import { database } from '@/services/firebase'
  import Alert from './widgets/Alert'
  import InfoBox from './widgets/InfoBox'
  import ProcessInfoBox from './widgets/ProcessInfoBox'

  export default {
    components: {
      Alert,
      InfoBox,
      ProcessInfoBox
    },
    methods: {
      setSkillType () {
        console.log('setSkillType')
        var options = document.getElementsByClassName('skilloption')
        for (var i = 0; i < options.length; i++) {
          if (options[i].selected) {
            this.skilltype = options[i].text
          }
        }
        console.log(this.skilltype)
        this.labourers = database.ref('skills').orderByChild('skill').equalTo(this.skilltype)
        this.labourers.once('value', (snapshot) => {
          let cachedWorkers = []
          snapshot.forEach((workerSnapshot) => {
            let cachedWorker = workerSnapshot.val()
            cachedWorker['.key'] = workerSnapshot.key
            cachedWorkers.push(cachedWorker)
          })
          localStorage.setItem('skilltypeworkers', JSON.stringify(cachedWorkers))
        })
      },
      getWorkers () {
        console.log('getWorkers')
        /*
        if (navigator.onLine) {
          this.saveWorkersToCache()
          console.log('HomeView', JSON.stringify(this.$root.worker))
          return this.$root.worker
        } else {
          console.log('HomeView', localStorage.getItem('workers'))
          return JSON.parse(localStorage.getItem('workers'))
        } */
        console.log(this.oldskilltype, this.skilltype)
        if (localStorage.getItem('skilltypeworkers')) {
          console.log('HomeView', localStorage.getItem('skilltypeworkers'))
          return JSON.parse(localStorage.getItem('skilltypeworkers'))
        } else {
          this.saveWorkersToCache()
          return this.$root.worker
        }
      },
      saveWorkersToCache () {
        console.log('saveWorkersToCache')
        this.labourers = database.ref('skills').orderByChild('skill').equalTo(this.skilltype)
        this.labourers.once('value', (snapshot) => {
          let cachedWorkers = []
          snapshot.forEach((workerSnapshot) => {
            let cachedWorker = workerSnapshot.val()
            cachedWorker['.key'] = workerSnapshot.key
            cachedWorkers.push(cachedWorker)
          })
          localStorage.setItem('skilltypeworkers', JSON.stringify(cachedWorkers))
        })
      }
    },
    data () {
      return {
        labourers: null,
        skilltype: 'Template Writing'
      }
    },
    mounted () {
      this.labourers = database.ref('skills').orderByChild('skill').equalTo(this.skilltype)
      this.saveWorkersToCache()
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
.fullCanvas {
  width: 100%;
}
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
