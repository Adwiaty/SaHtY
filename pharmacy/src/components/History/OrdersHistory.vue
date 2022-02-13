<template>

  <div
    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
    :class="[color === 'light' ? 'bg-white' : 'bg-emerald-900 text-white']"
  >
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3
            class="font-semibold text-lg"
            :class="[color === 'light' ? 'text-blueGray-700' : 'text-white']"
          >
            Orders's History
          </h3>
        </div>
      </div>
    </div>
    <div class="block w-full overflow-x-auto">
      <!-- Projects table -->
      <table class="items-center w-full bg-transparent border-collapse">
        <thead>
          <tr>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              User
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              MEDICINES
            </th>
            <th v-on:click="test()"
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
              
            >
              TOTAL PRICE 
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              DATE
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td 
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              <div class="flex">
                <strong class="text-muted">{{username}}</strong>
                
              </div>
            </td>
            
            <td 
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              <i v-if="!hovered" class="far fa-eye" @click="hover()"></i>
                 <div v-if="hovered">
                     <ul class="check-list"  v-for="medecin in medecines" :key="medecin.name"  >
                       <li>{{medecin}}</li>
                     </ul>
                 </div>
            </td>
            <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-black whitespace-nowrap p-4"
              
            >
               {{totalPrice}}
             
            </td>
           
          <td><small class="text-muted">{{createdAt}}</small></td>
          </tr>
          
          
         
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>



// import moment from "moment";
// import axios from "axios";
export default {
 
  props:{
    orders:{
      type:Array ,
     
    },
     medecines:{
      type:Array ,
      
    },
    username:{
      type:String ,
    },
     color: {
      default: "light",
      validator: function (value) {
        // The value must match one of these strings
        return ["light", "dark"].indexOf(value) !== -1;
      },
    },},
    
  data:function() {
    return {
      
      hovered:false,
      id:0,
      createdAt:"",
      totalPrice:0,
    };
    
  },
  beforeUpdate:function(){
  this.createdAt = this.orders.createdAt,
  this.totalPrice = this.orders.totalPrice
  },
  methods:{
    
    hover:function() {
      this.hovered=!this.hovered
    }

  }
  
    
  
    
    
   

  
};
</script>
<style scoped>
#p{
  color:white
}
.check-list {
  margin: 0;
  padding-left: 1.2rem;
}

.check-list li {
  position: relative;
  list-style-type: none;
  padding-left: 2.5rem;
  margin-bottom: 0.5rem;
}

.check-list li:before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: -2px;
    width: 5px;
    height: 11px;
    border-width: 0 2px 2px 0;
    border-style: solid;
    border-color: #00a8a8;
    transform-origin: bottom left;
    transform: rotate(45deg);
}
</style>