const postTimeline = {
  methods: {
    postTimeline (appointment, timestamp, message) {
      console.log('postTimeline', appointment, timestamp, message)
      this.$root.$firebaseRefs.timeline.push(
        {
          'appointment': appointment,
          'time': timestamp.toISOString(),
          'message': message,
          'created_at': -1 * new Date().getTime()
        }
      )
    }
  }
}
export default postTimeline
