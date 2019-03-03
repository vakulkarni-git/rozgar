<template>
<div>
    <VueSignaturePad
      width="500px"
      height="500px"
      ref="signaturePad"
    />
    <div>
      <button @click="save">Save</button>
      <button @click="undo">Undo</button>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'MySignaturePad',
    methods: {
      undo () {
        this.$refs.signaturePad.undoSignature()
      },
      save () {
        const { isEmpty, data } = this.$refs.signaturePad.saveSignature()
        console.log(isEmpty)
        console.log(data)
      }
    }
  }

</script>
<style type="text/css">
      #container { position: relative; }
      #imageView { border: 1px solid #000; }
	  html, body {
		width: 100%;
		height: 100%;
		margin: 0px;
	  }
</style>