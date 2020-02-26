<template>
  <div class="home">
     <h1 class="my-4">ini slide Mac DeMarco</h1>
    <img :src="images[index]" style="max-height: 60vh"/>
    <div class="container py-5">
       <div class="row" style="display: flex; justify-content: center">         
          <button type="button" class="btn btn-dark mx-3" @click="slides(`prev`)">Prev</button>
          <button type="button" class="btn btn-danger mx-3" @click="slides(`next`)">Next</button>
       </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
export default {
  name: 'Home',
  props: ['socket'],
  data () {
    return {
      index: 1,
      images: []
    }
  },
  methods: {
    getAllImages() {
      axios({
        method: `GET`,
        url: `http://localhost:3000`
      })
        .then(({ data }) => {
           console.log(data);
           
          this.images = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    slides(command) {
      if (command == `prev`) {
        this.socket.emit(`slides`, `prev`, this.index);
      } else {
        this.socket.emit(`slides`, `next`, this.index);
      }
    }
  },
  created() {
    this.getAllImages();
    this.socket.on(`updateIndex`, newIndex => {
       this.index = newIndex
    })
  }
}
</script>
