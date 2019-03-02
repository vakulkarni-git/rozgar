const postTimeline = {
  methods: {
    postTimeline (appointment, timestamp, message, buttons = null) {
      console.log('postTimeline', appointment, timestamp, message)
      this.$root.$firebaseRefs.timeline.push(
        {
          'appointment': appointment,
          'time': timestamp.toISOString(),
          'message': message,
          'buttons': buttons,
          'created_at': -1 * new Date().getTime()
        }
      )
    }
  }
}
export default postTimeline
