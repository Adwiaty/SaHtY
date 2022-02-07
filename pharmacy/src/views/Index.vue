<template>
  <div class="body">
    <section
      class="header relative pt-16 items-center flex h-screen max-h-860-px"
    >
      <div class="logo">
        <img alt="..." :src="logo" />
      </div>
      <div class="container mx-auto">
        <div class="justify-center flex flex-wrap">
          <div class="w-full lg:w-12/12 px-4 -mt-24">
            <div class="flex flex-wrap">
              <div class="w-full lg:w-4/12 px-4">
                <h5 class="text-xl font-semibold pb-4 text-center">
                  Paramedical
                </h5>
                <router-link to="/admin/paramedical">
                  <div
                    class="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150"
                  >
                    <img
                      alt="..."
                      class="align-middle border-none max-w-full h-auto rounded-lg"
                      :src="para1"
                    />
                  </div>
                </router-link>
              </div>

              <div id="profile">
                <h5 class="text-xl font-semibold pb-4 text-center">
                  Dashboard
                </h5>
                <router-link to="/admin/tables">
                  <div
                    class="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150"
                  >
                    <img
                      alt="..."
                      class="align-middle border-none max-w-full h-auto rounded-lg"
                      :src="dashboard1"
                    />
                  </div>
                </router-link>
              </div>

              <div id="order" class="w-full lg:w-4/12 px-4">
                <h5 class="text-xl font-semibold pb-4 text-center">
                  Orders History
                </h5>
                <router-link to="/admin/dashboard">
                  <div
                    class="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150"
                  >
                    <img
                      alt="..."
                      class="align-middle border-none max-w-full h-auto rounded-lg"
                      :src="profile1"
                    />
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <img
        class="absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860-px"
        :src="patternVue"
        alt="..."
      /> -->
    </section>

    <footer-component />
  </div>
</template>
<script>
// import IndexNavbar from "@/components/Navbars/IndexNavbar.vue";
import FooterComponent from "@/components/Footers/Footer.vue";
import patternVue from "@/assets/img/pattern_vue.png";
import componentBtn from "@/assets/img/component-btn.png";
import componentProfileCard from "@/assets/img/component-profile-card.png";
import componentInfoCard from "@/assets/img/component-info-card.png";
import componentInfo2 from "@/assets/img/component-info-2.png";
import componentMenu from "@/assets/img/component-menu.png";
import componentBtnPink from "@/assets/img/component-btn-pink.png";
import documentation from "@/assets/img/documentation.png";
// import login from "@/assets/img/login.jpg";
import profile1 from "@/assets/img/profile1.jpg";
import landing from "@/assets/img/landing.jpg";
import parapharamcy from "@/assets/img/PARAPHARMACY.jpg";
import para1 from "@/assets/img/para2.jpg";
import dashboard1 from "@/assets/img/dashboard1.jpg";
import logo from "@/assets/img/logos.png";


export default {
  data() {
    return {
      patternVue,
      componentBtn,
      componentProfileCard,
      componentInfoCard,
      componentInfo2,
      componentMenu,
      componentBtnPink,
      documentation,
      
      profile1,
      landing,
      parapharamcy,
      para1,
      dashboard1,
      logo,
    };
  },
  components: {
    // IndexNavbar,
    FooterComponent,
  },
};
</script>
<style scoped>
#order {
  margin-top: 90px;
}
#profile {
  /* margin-bottom: 5px; */
  height: 50px;
  margin-top: 10px;
  width: 52%;
}
.logout {
  margin-left: 90%;
  margin-top: 1%;
}
.logo {
  margin-bottom: 800px;
}
</style>
