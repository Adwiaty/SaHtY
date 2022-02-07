<template>
  <div>
    <div class="flex flex-wrap">
      <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
        <card-line-chart />
      </div>
      <div class="w-full xl:w-4/12 px-4">
        <card-bar-chart />
      </div>
    </div>
    <div class="flex flex-wrap mt-4">
      <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
        <card-page-visits />
      </div>
      <div class="w-full xl:w-4/12 px-4">
        <card-social-traffic />
      </div>
    </div>
    <div class="w-full mb-12 px-4" style="margin-top:5%">
      <orders-history v-bind:orders="orders" v-bind:medecines="medecines" v-bind:username="username"/>
    </div>
    
  </div>
</template>
<script>
import CardLineChart from "@/components/Cards/CardLineChart.vue";
import CardBarChart from "@/components/Cards/CardBarChart.vue";
import OrdersHistory from "@/components/History/OrdersHistory.vue";


import axios from "axios";
export default {
  name: "dashboard-page",
  components: {
    CardLineChart,
    CardBarChart,
    OrdersHistory
  },
  data: function(){
    return {
    id:'',
   orders:[],
   medecines:[],
   username:""
   
    }
  },
    mounted:function(){
    let y = sessionStorage.getItem('session')
    this.id = JSON.parse(y).id
   axios.get(`http://localhost:5000/orders/getOrders/${this.id}`)
   .then(({data})=>{
     console.log('data' ,data);
      this.orders=data.orders
      this.medecines=data.arr
      this.username = data.username;

    
   })
  
    }
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato&family=Poppins&display=swap');
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box
}

body {
    background-color: #777;
    font-family: 'Poppins', sans-serif
}

.wrapper {
    background-color: #222;
    min-height: 100px;
    max-width: 800px;
    margin: 10px auto;
    padding: 10px 30px
}

.dark,
.input:focus {
    background-color: #222
}

.navbar {
    padding: 0.5rem 0rem
}

.navbar .navbar-brand {
    font-size: 30px
}

#income {
    border-right: 1px solid #bbb
}

.notify {
    display: none
}

.nav-item .nav-link .fa-bell-o,
.fa-long-arrow-down,
.fa-long-arrow-up {
    padding: 10px 10px;
    background-color: #444;
    border-radius: 50%;
    position: relative;
    font-size: 18px
}

.nav-item .nav-link .fa-bell-o::after {
    content: '';
    position: absolute;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: #ffc0cb;
    right: 10px;
    top: 10px
}

.nav-item input {
    border: none;
    outline: none;
    box-shadow: none;
    padding: 3px 8px;
    width: 75%;
    color: #eee
}

.nav-item .fa-search {
    font-size: 18px;
    color: #bbb;
    cursor: pointer
}

.navbar-nav:last-child {
    display: flex;
    align-items: center;
    width: 40%
}

.navbar-nav .nav-item {
    padding: 0px 0px 0px 10px
}

.navbar-brand p {
    display: block;
    font-size: 14px;
    margin-bottom: 3px
}

.text {
    color: #bbb
}

.money {
    font-family: 'Lato', sans-serif
}

.fa-long-arrow-down,
.fa-long-arrow-up {
    padding-left: 12px;
    padding-top: 8px;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    font-size: 1rem;
    font-weight: 100;
    color: #28df99
}

.fa-long-arrow-up {
    color: #ffa500
}

.nav.nav-tabs {
    border: none
}

.nav.nav-tabs .nav-item .nav-link {
    color: #bbb;
    border: none
}

.nav.nav-tabs .nav-link.active {
    background-color: #222;
    border: none;
    color: #fff;
    border-bottom: 4px solid #fff
}

.nav.nav-tabs .nav-item .nav-link:hover {
    border: none;
    color: #eee
}

.nav.nav-tabs .nav-item .nav-link.active:hover {
    border-bottom: 4px solid #fff
}

.nav.nav-tabs .nav-item .nav-link:focus {
    border-bottom: 4px solid #fff;
    color: #fff
}

.table-dark {
    background-color: #222
}

.table thead th {
    text-transform: uppercase;
    color: #bbb;
    font-size: 12px
}

.table thead th,
.table td,
.table th {
    border: none;
    overflow: auto auto
}

td .fa-briefcase,
td .fa-bed,
td .fa-exchange,
td .fa-cutlery {
    color: #ff6347;
    background-color: #444;
    padding: 5px;
    border-radius: 50%
}

td .fa-bed,
td .fa-cutlery {
    color: #40a8c4
}

td .fa-exchange {
    color: #b15ac7
}

tbody tr td .fa-cc-mastercard,
tbody tr td .fa-cc-visa {
    color: #bbb
}

tbody tr td.text-muted {
    font-family: 'Lato', sans-serif
}

tbody tr td .fa-long-arrow-up,
tbody tr td .fa-long-arrow-down {
    font-size: 12px;
    padding-left: 7px;
    padding-top: 3px;
    height: 20px;
    width: 20px
}

.results span {
    color: #bbb;
    font-size: 12px
}

.results span b {
    font-family: 'Lato', sans-serif
}

.pagination .page-item .page-link {
    background-color: #444;
    color: #fff;
    padding: 0.3rem .75rem;
    border: none;
    border-radius: 0
}

.pagination .page-item .page-link span {
    font-size: 16px
}

.pagination .page-item.disabled .page-link {
    background-color: #333;
    color: #eee;
    cursor: crosshair
}

@media(min-width:768px) and (max-width: 991px) {
    .wrapper {
        margin: auto
    }

    .navbar-nav:last-child {
        display: flex;
        align-items: start;
        justify-content: center;
        width: 100%
    }

    .notify {
        display: inline
    }

    .nav-item .fa-search {
        padding-left: 10px
    }

    .navbar-nav .nav-item {
        padding: 0px
    }
}

@media(min-width: 300px) and (max-width: 767px) {
    .wrapper {
        margin: auto
    }

    .navbar-nav:last-child {
        display: flex;
        align-items: start;
        justify-content: center;
        width: 100%
    }

    .notify {
        display: inline
    }

    .nav-item .fa-search {
        padding-left: 10px
    }

    .navbar-nav .nav-item {
        padding: 0px
    }

    #income {
        border: none
    }
}

@media(max-width: 400px) {
    .wrapper {
        padding: 10px 15px;
        margin: auto
    }

    .btn {
        font-size: 12px;
        padding: 10px
    }

    .nav.nav-tabs .nav-link {
        padding: 10px
    }
}
</style>