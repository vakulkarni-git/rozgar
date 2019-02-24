const postWorkAppointment = {
  methods: {
    postWorkAppointment (employer, id, name, from, to, workDescription) {
      console.log('postWorkAppointment', employer, id, name, from, to, workDescription)
      this.$root.$firebaseRefs.workAppointment.push(
        {
          'employer': employer,
          'id': id,
          'name': name,
          'from': from,
          'to': to,
          'work_description': workDescription,
          'created_at': -1 * new Date().getTime()
        }
    ).then(
      this.$router.push('/')
    )
    }
  }
}
export default postWorkAppointment
