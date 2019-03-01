<template>
  <div class="confirmation-modal" style="margin-left:20px;">
    <div>
        <p>{{ labourer.id }}</p>
        <p>{{ labourer.name }}</p>
        <p>{{ labourer.phone_number }}</p>
        <p>{{ labourer.skill }}</p>
        <button @click.prevent="sendOTP()">Send OTP</button>
        <p></p>
    </div>
    <form>
        <p>Please enter the OTP sent to the worker below for confirmation:</p>
        <input type="text" name="confirm" v-model="confirmOtp">
        <p></p>
        <input type="submit" name="submit" @click.prevent="confirmAppointment()">
    </form>
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
        confirmOtp: null
      }
    },
    mounted () {
      this.labourer = this.$route.query.labourer
      this.from = this.$route.query.from
      this.to = this.$route.query.to
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
        api.request('post', 'http://localhost:3000/accounts', body)
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
          this.postWorkAppointment('100', id, this.labourer.name, this.from, this.to, this.labourer.skill)
          this.postTimeline(id, new Date(), 'OTP confirmed, Work appointment created')
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
