const postWorkerRegistration = {
  methods: {
    postWorkerRegistration (id, level1, level2, level3, name, payPerHour, phoneNumber, place, registrationDate, skill1, skill2, skill3) {
      console.log('postWorkerRegistration', id, level1, level2, level3, name, payPerHour, phoneNumber, place, registrationDate, skill1, skill2, skill3)
      this.$root.$firebaseRefs.workerAdvertisement.push(
        {
          'id': id,
          'level1': level1,
          'level2': level2,
          'level3': level3,
          'name': name,
          'payPerHour': payPerHour,
          'phone_number': phoneNumber,
          'place': place,
          'registration_date': registrationDate,
          'skill1': skill1,
          'skill2': skill2,
          'skill3': skill3,
          'created_at': -1 * new Date().getTime()
        }
    )
    }
  }
}
export default postWorkerRegistration
