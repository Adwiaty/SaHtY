<template>
  <div
    class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16"
  >
    <div class="px-6">
      <div class="flex flex-wrap justify-center">
        <div class="w-full px-4 flex justify-center">
          <div class="relative">
            <img
              alt="..."
              :src="phaLogo"
              class="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
            />
          </div>
        </div>
        <div class="w-full px-4 text-center mt-20">
          <div class="flex justify-center py-4 lg:pt-4 pt-8">
            <div class="mr-4 p-3 text-center">
              <span
                class="text-xl font-bold block uppercase tracking-wide text-blueGray-600"
              >
              </span>
              <span class="text-sm text-blueGray-400"></span>
            </div>
            <div class="mr-4 p-3 text-center">
              <span
                class="text-xl font-bold block uppercase tracking-wide text-blueGray-600"
              >
              </span>
              <span class="text-sm text-blueGray-400"></span>
            </div>
            <div class="lg:mr-4 p-3 text-center">
              <span
                class="text-xl font-bold block uppercase tracking-wide text-blueGray-600"
              >
              </span>
              <span class="text-sm text-blueGray-400"></span>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center mt-12">
        <h3
          class="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2"
        >
          {{ username }}
        </h3>
        <div
          class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase"
        >
          <i class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
          {{ location }}
        </div>
        <div class="mb-2 text-blueGray-600 mt-10"></div>
        <div class="mb-2 text-blueGray-600"></div>
      </div>

      <div class="mt-10 py-10 border-t border-blueGray-200 text-center">
        <div class="flex flex-wrap justify-center">
          <div class="w-full lg:w-9/12 px-4">
            <p class="mb-4 text-lg leading-relaxed text-blueGray-700"></p>
            <a href="javascript:void(0);" class="font-normal text-emerald-500">
            </a>
            <div
              class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase"
            >
              <i class="fas fa-mail-bulk mr-2 text-lg text-blueGray-400"> </i>
              {{ email }}
            </div>
          </div>
        </div>
      </div>
      <div class="mt-10 py-10 border-t border-blueGray-200 text-center">
        <div class="flex flex-wrap justify-center">
          <div class="w-full lg:w-9/12 px-4">
            <p class="mb-4 text-lg leading-relaxed text-blueGray-700"></p>
            <a href="javascript:void(0);" class="font-normal text-emerald-500">
            </a>
            <div
              class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase"
            >
              <i class="fas fa-phone mr-2 text-lg text-blueGray-400"></i>
              {{ phoneNumber }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import phaLogo from "@/assets/img/medicine-pharmacy-logo-vector-21425252.jpg";
import axios from "axios";

export default {
  data: function () {
    return {
      phaLogo,
      username: "",
      email: "",
      address: "",
      location: "",
      phoneNumber: "",
    };
  },
  methods: {
    getpharmacyData: function () {
      var id = JSON.parse(sessionStorage.getItem("session")).id
      axios
        .get(`http://localhost:5000/pharmacies/profile/${id}`)
        .then(({ data }) => {
          console.log(data);
          this.username = data.username;
          this.location = data.location;
          this.phoneNumber = data.phoneNumber;
          this.email = data.email;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created: function () {
    this.getpharmacyData();
  },
};
</script>
