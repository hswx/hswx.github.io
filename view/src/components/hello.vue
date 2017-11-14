<template>
  <div class="container-fluid" style="max-width:400px;text-align:center">
    <h1>个人博客管理</h1>
    <h3><router-link to="/upload" >上传</router-link></h3>
    <h3><router-link to="/delete" >删除</router-link></h3>

    <div style="max-height:200px;overflow-y:auto;margin-top:20px">
    <div v-for='(item,index) in list' v-bind:key='index'>{{item}}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'hello',
  data () {
    return {
      list: []
    }
  },
  methods: {
    getFileList () {
      var self = this
      axios.get('http://localhost:3000/users')
      .then(function (response) {
        self.list = response.data.result
      })
      .catch(function (error) {
        self.list = [error]
      })
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.getFileList()
    })
  }
}
</script>


