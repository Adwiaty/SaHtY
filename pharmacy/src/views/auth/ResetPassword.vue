<template>
      <div class="container mx-auto px-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-4/12">
        <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
        >
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <div class="text-blueGray-400 text-center mb-3 font-bold">
              <small>Reset Your Password</small>
            </div>
            <form>
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  New Password
                </label>
                <input
                  type="password"
                  placeholder=" your new password"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  v-model="newPassword"
                />
              </div>              
              <input
                  type="password"
                  placeholder=" confirm your password"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  v-model="confirmedPassord"
                />               
              <div class="text-center mt-3">
                  <button
                    class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    type="button"
                    v-on:click="Change()"
                  >
                    Change Password
                  </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default{
    data: function () {
        return {
            newPassword:"",
            confirmedPassord:"",
            id: "",

        }
    },
    created:function(){
     this.id=this.$route.params.hash_link
    },
    methods:{
     match: function () {
        return this.password === this.confirmedpassword;
    },
    
      Change :function(){
         
      if (this.match){
         let data={ newPassword : this.newPassword , id:this.id }
         console.log(data)
       axios.post('http://localhost:5000/pharmacies/changePassword', data)
        .then(({data})=>{
            console.log(data);
          this.$router.push("/login");

        })
        .catch((err)=>{
            console.error(err)
        })
        }
      
        }

    }
  
}
</script>
