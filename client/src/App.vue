<template>
  <div id="app">
    <router-view :socket='socket'/>
  </div>
</template>
<script>
import io from 'socket.io-client'
export default {
  name : `App`,
  data () {
    return {
      socket : io.connect(`http://localhost:3000`)
    }
  },
  methods : {

  },
  created () {
    this.socket.on(`news`, (msg) => {
      console.log(msg);
    })
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  background-image: url('https://thumbs.gfycat.com/UltimateGleefulChafer-size_restricted.gif');
  /* background-repeat: no-repeat; */
  background-position:right ;
  /* background-size: cover; */
  background-color: black;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
