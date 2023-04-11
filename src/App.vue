<template>
<div id="app">
  <div class="container">
    
    <router-view /> <!-- when we load the page, the component of index.js from router folder will be loaded here-->
  </div>

      </div>
    

  
  

</template>

<script>


export default {
  name: 'App',

}
</script>

<style>
#app {
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  margin-top: 60px;
}

</style>
