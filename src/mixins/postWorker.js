const postWorker = {
  methods: {
    postWorker (workerUrl, title) {
      this.$root.$firebaseRefs.worker.push(
        {
          'url': workerUrl,
          'comment': title,
          'info': 'Posted by KLSGIT',
          'created_at': -1 * new Date().getTime()
        }
      ).then(
        this.$router.push('/')
      )
    }
  }
}

export default postWorker
