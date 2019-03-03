const postWorkAppointment = {
  methods: {
    postWorkAppointment (employer, id, name, from, to, workDescription, workerId, reference, key) {
      console.log('postWorkAppointment', employer, id, name, from, to, workDescription, workerId, reference, key)
      this.$root.$firebaseRefs.workAppointment.push(
        {
          'employer': employer,
          'id': id,
          'name': name,
          'from': from,
          'to': to,
          'work_description': workDescription,
          'workerId': workerId,
          'reference': reference,
          'created_at': -1 * new Date().getTime()
        }
    )
    }
  }
}
export default postWorkAppointment
