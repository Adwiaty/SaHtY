<template>
  <div class="container mx-auto px-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-4/12 px-4">
        <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
        >
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <div class="text-blueGray-400 text-center mb-3 font-bold">
              <small>sign in with credentials</small>
            </div>
            <form>
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Username
                </label>
                <input
                  type="text"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Username"
                  v-model="username"
                />
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Password
                </label>
                <input
                  type="password"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Password"
                  v-model="password"
                />
              </div>
              <div>
                <label class="inline-flex items-center cursor-pointer">
                  <input
                    id="customCheckLogin"
                    type="checkbox"
                    class="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                  />
                  <span class="ml-2 text-sm font-semibold text-blueGray-600">
                    Remember me
                  </span>
                </label>
              </div>
                <div>
                  <span class="error"> {{banMessage}}</span>
                </div>
                 <div>
                  <span class="error"> {{error}}</span>
                </div>
                <div>
                  <span class="error"> {{passwordError}}</span>
                </div>
              <div class="text-center mt-6">
                <button
                  class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="button"
                  v-on:click="signin()"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="flex flex-wrap mt-6 relative">
          <div class="w-1/2" style="cursor:pointer">
          <router-link to="/forgotPassword">
            <small class="text-blueGray-200">Forgot password</small>
          </router-link>
          </div>
          <div class="w-1/2 text-right">
          <router-link to="/register">
              <small class="text-blueGray-200">Create new account</small>
          </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      username: "",
      password: "",
      banMessage: "",
      error: "",
      passwordError: "",
    };
  },
  methods: {
    signin: function () {
      var identity = {
        username: this.username,
        password: this.password,
      };

      axios
        .post("http://localhost:5000/pharmacies/authenticate", identity)
        .then(({ data }) => {
         
          if(data.success===false) {
           if(data.msg==="Pharmacy banned"){this.banMessage="Your pharmacy has been banned , please check with the administrator"}
           if(data.msg==="Wrong password"){this.passwordError=" incorrect username or password "}
           if(data.msg==="pharmacy not found"){this.error="Pharmacy not registered"}

         } 
         else {
           let session ={ 
              id:data.pharmacy.id ,
              state:data.pharmacy.state
           }
           
          sessionStorage.setItem('session', JSON.stringify(session));
          sessionStorage.setItem("id", data.token);
          this.$router.push("/Index");
          
        }   
      })
    }
  }
}
</script>
<style scoped>
.error{
  color: red;
  font-size: 12px;
}
</style>