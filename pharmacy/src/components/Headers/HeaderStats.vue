<template>
  <!-- Header -->
  <div class="relative bg-emerald-600 md:pt-32 pb-32 pt-12">   
    <img :src="appLogo"  class="appLogo" />
    </div>         
</template>

<script>
import appLogo from "../../assets/img/transparent-icon.png"
export default {
  components: {},
  data(){
    return{
    appLogo
  }
  }
 
};
</script>
<style scoped>
.appLogo{
  height:10%;
  width:20%;
  margin-top: -15%;
}
</style>