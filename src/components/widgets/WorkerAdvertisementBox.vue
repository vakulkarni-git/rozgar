<template>
  <div :class="['info-box', colorClass]">
    <span class="info-box-icon">
      <i :class="iconClasses"></i>
    </span>
    <div class="info-box-content">
      <span class="info-box-text">{{text}}</span>
      <span class="info-box-number">Pay per hour : INR {{number}}</span>
      <div v-if="skill1" style="margin-top:10px;">
        <span class="progress-description">{{skill1}}</span>
        <div class="progress">
          <div class="progress-bar" :style="{width: level1 + '%'}"></div>
        </div>
      </div>
      <div v-if="skill2">
        <span class="progress-description">{{skill2}}</span>
        <div class="progress">
          <div class="progress-bar" :style="{width: level2 + '%'}"></div>
        </div>
      </div>
      <div v-if="skill3">
        <span class="progress-description">{{skill3}}</span>
        <div class="progress">
          <div class="progress-bar" :style="{width: level3 + '%'}"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WorkerAdvertisementBox',
  props: {
    text: {
      type: String,
      required: true
    },
    number: {
      type: String,
      default: ''
    },
    progress: {
      type: Number,
      default: 0,
      validator (value) {
        return value >= 0 && value <= 100
      }
    },
    description: {
      type: String,
      default: ''
    },
    skill1: {
      type: String,
      default: ''
    },
    skill2: {
      type: String,
      default: ''
    },
    skill3: {
      type: String,
      default: ''
    },
    level1: {
      type: Number,
      default: 0,
      validator (value) {
        return value >= 0 && value <= 100
      }
    },
    level2: {
      type: Number,
      default: 0,
      validator (value) {
        return value >= 0 && value <= 100
      }
    },
    level3: {
      type: Number,
      default: 0,
      validator (value) {
        return value >= 0 && value <= 100
      }
    },
    iconClasses: {
      type: Array,
      default: []
    },
    colorClass: {
      type: String,
      default: 'bg-default'
    }
  }
}
</script>
