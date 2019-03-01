<template>
  <div class="info-box">
    <span :class="['info-box-icon', colorClass]">
      <i :class="iconClasses"></i>
    </span>
    <div class="info-box-content">
      <span class="info-box-text">{{text}}</span>
      <span class="info-box-number">{{number}}</span>
      <div class="progress">
        <div class="progress-bar bg-info" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">50%</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoBox',
  props: {
    text: {
      type: String,
      required: true
    },
    number: {
      type: String,
      default: ''
    },
    skill1: {
      type: String,
      default: ''
    },
    level1: {
      type: String,
      default: ''
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