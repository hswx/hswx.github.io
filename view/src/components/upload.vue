<template>
    <div class="container-fluid" style="max-width:400px;text-align:center">
      <h1>上传文件</h1>
      <form>
        <div class="form-group form-group-xs">
          <input type="file" class="form-control" id="file">
        </div>
        <button type="button" class="btn btn-default" v-on:click="submit">Submit</button>
      </form>
      <div v-html="msg" style="text-align:left">
      </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    submit () {
      var self = this
      console.log(document.getElementById('file').files[0])
      let formData = new FormData()
      formData.append('file', document.getElementById('file').files[0])
      formData.append('type', 'test')
      axios.post('http://localhost:3000/users', formData)
      .then(function (response) {
        self.msg = response.data.result
      })
      .catch(function (error) {
        self.msg = error
      })
    }
  }
}
</script>
