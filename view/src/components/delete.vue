<template>
  <div class="container-fluid" style="max-width:400px;text-align:center">
    <h1>删除</h1>
    <form>
      <div class="form-group form-group-xs">
        <input type="text" class="form-control" v-model="fileName" placeholder="文件名">
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
      name: 'delete',
      data () {
        return {
          fileName: '',
          msg: ''
        }
      },
      methods: {
        submit () {
          var self = this
          axios.delete('http://localhost:3000/users/' + this.fileName)
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
