<template>
<div>
<div class="card text-center">
  <div class="card-header">
    {{ this.labourer.name }}
  </div>
  <div class="card-body">
    <h5 class="card-title">Please confirm the work appointment</h5>
    <p class="card-text">You will have to confirm with the OTP that is sent to {{ this.labourer.name }}</p>
    <p class="card-text">Contact the individual at this number: {{ this.labourer.phone_number }}</p>
    <p class="card-text">The following OTP will be valid for 5 minutes from requesting</p>
    <a href="#" class="btn btn-primary" @click.prevent="sendOTP()">Send OTP</a>
  </div>
  <div class="card-footer text-muted">
  </div>
</div>
<div class="card text-center">
  <div class="card-header">
    Confirm Appointment
  </div>
  <div class="card-body">
    <h5 class="card-title">Please enter the OTP sent to {{ labourer.name }}</h5>
    <div class="input-group" style="margin-top:20px;">
      <div class="input-group-prepend">
      <span class="input-group-text" id="basic-addon1">Enter OTP: </span>
    </div>
    <input type="text" placeholder="OTP" aria-label="Username" aria-describedby="basic-addon1" v-model="confirmOtp">
    <a href="#" class="btn btn-primary" @click.prevent="confirmAppointment()">Confirm Appointment</a>
  </div>
  </div>
  <div class="card-footer text-muted">
  </div>
</div>
  </div>
</template>

<script>
  import postWorkAppointment from '@/mixins/postWorkAppointment'
  import postTimeline from '@/mixins/postTimeline'
  import api from '../api'

  export default {
    mixins: [postWorkAppointment, postTimeline],
    data () {
      return {
        labourer: null,
        from: null,
        to: null,
        otp: null,
        confirmOtp: null,
        workerId: '',
        reference: ''
      }
    },
    mounted () {
      this.labourer = this.$route.query.labourer
      this.from = this.$route.query.from
      this.to = this.$route.query.to
      this.workerId = this.$route.query.workerId
      this.reference = this.$route.query.reference
    },
    destroyed () {
    },
    methods: {
      sendOTP () {
        this.otp = Math.floor((Math.random() * 10)).toString()
        this.otp += Math.floor((Math.random() * 10)).toString()
        this.otp += Math.floor((Math.random() * 10)).toString()
        this.otp += Math.floor((Math.random() * 10)).toString()

        console.log('sendOTP', this.otp)
        var id = this.labourer.id + this.otp
        this.postTimeline(id, new Date(), 'OTP sent to labourer')

        var body = {
          'sender_id': 'FSTSMS',
          'message': '7130',
          'language': 'english',
          'route': 'qt',
          'numbers': '8497969922',
          'variables': '{#AA#}',
          'variables_values': this.otp
        }
        api.request('post', 'http://sms-rozgar.ap-south-1.elasticbeanstalk.com:3000/accounts', body)
          .then((response) => {
            console.log('sendOTP', response)
          })
          .catch((err) => {
            console.log('sendOTP', err)
          })
      },
      confirmAppointment () {
        if (this.otp === this.confirmOtp.toString()) {
          console.log('confirmAppointment', 'otps match')
          var id = this.labourer.id + this.otp
          this.postWorkAppointment('100', id, this.labourer.name, this.from, this.to, this.labourer.skill, this.workerId, this.reference, this.labourer.key)
          this.postTimeline(id, new Date(), 'OTP confirmed, Work appointment created')
          var buttons = {
            type: 'primary',
            href: '/payment/',
            target: '#',
            message: 'Pay'
          }
          var buttonsArray = []
          buttonsArray[0] = buttons
          this.postTimeline(id, new Date(), 'Work Completed, proceed to make payment', buttonsArray)
          this.$router.replace({name: 'workAppointments'})
        } else {
          console.log('confirmAppointment', 'otps do not match')
        }
      }
    }
  }
</script>

<style scoped>
  .confirmation-modal {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
    background-color: white;
    z-index: 10;
  }
  .confirmation-modal-container {
    position: absolute;
    bottom: 0;
    width: 100%;
    max-height: 100%;
    align-items: center;
    margin-bottom: 24px;
  }
</style>
