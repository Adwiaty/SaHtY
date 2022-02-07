<template>
  <table style="width: 1000px">
    <tr>
      <th>
        <div class="container mt-5">
          <div class="row">
            <div id="map" class="col-md-3">
              <div v-for="item in items" :key="item.price" class="card">
                <div class="image-container">
                  <img
                    :src="item.img"
                    class="img-fluid rounded thumbnail-image"
                  />
                </div>
                <div class="product-detail-container p-2">
                  <div
                    class="d-flex justify-content-between align-items-center"
                    v-if="view && currentEdit !== item._id"
                  >
                    <p id="itemName">{{ item.name }}</p>
                    <div class="d-flex flex-column mb-2">
                      <span class="new-price" id="itemName">{{ item.price }}</span>
                      <small class="old-price text-right">TND</small>
                    </div>
                    <div
                      class="d-flex justify-content-between align-items-center pt-1"
                    >
                      <button class="buy" v-on:click="changeView(item._id)">
                        Edit
                      </button>
                    </div>
                  </div>

                  <div
                    class="d-flex justify-content-between align-items-center"
                    v-if="currentEdit === item._id"
                  >
                    <input
                      class="dress-name"
                      :placeholder="item.name"
                      v-model="name"
                    />
                    <div class="d-flex flex-column mb-2">
                      <input
                        class="new-price"
                        :placeholder="item.price"
                        v-model="price"
                      />
                      <small class="old-price text-right">TND</small>
                    </div>
                    <div
                      class="d-flex justify-content-between align-items-center pt-1"
                    >
                      <button class="buy" v-on:click="update(item._id)">
                        Edit
                      </button>
                    </div>
                  </div>

                  <div
                    class="d-flex justify-content-between align-items-center pt-1"
                  >
                    <button class="remove" v-on:click="remove(item._id)">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </th>
      <th id="form">
        <div class="container mx-auto px-4 h-full">
          <div class="flex content-center items-center justify-center h-full">
            <div class="w-full lg:w-6/12 px-4">
              <div
                class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
              >
                <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <div class="text-blueGray-400 text-center mb-3 font-bold">
                    <small>Add Paramedical Items From Here</small>
                  </div>

                  <div class="relative w-full mb-3">
                    <label
                      class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      ProductName
                    </label>
                    <input
                      type="text"
                      class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Name"
                      v-model="name"
                    />
                  </div>

                  <div class="relative w-full mb-3">
                    <label
                      class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Image
                    </label>
                    <input
                      type="file"
                      class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="image"
                      @change="thumbnailimg"
                    />
                  </div>

                  <div class="relative w-full mb-3">
                    <label
                      class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Price
                    </label>
                    <input
                      type="text"
                      class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Price"
                      v-model="price"
                    />
                  </div>

                  <div class="text-center mt-6">
                    <button
                      class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      v-on:click="add()"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </th>
    </tr>
  </table>
</template>
<script>
import axios from "axios";
export default {
  data: function () {
    return {
      items: [],
      name: "",
      price: "",
      img: "",
      view: true,
      currentEdit: "",
      selectedFile: "",
      thumbnail: "",
    };
  },

  methods: {
    add: function () {
      this.upload();
      setTimeout(() => {
        console.log("zzzzzzzzz", this.thumbnail);

        var item = {
          name: this.name,
          price: this.price,
          img: this.thumbnail,
          pharmacyId: JSON.parse(sessionStorage.getItem("session")).id
        };

        axios
          .post("http://localhost:5000/pharmacies/para", item)
          .then(() => {
            this.getPara();
          })
          .catch((err) => {
            console.log(err);
          });
      }, 1000);
    },
    thumbnailimg(event) {
      this.selectedFile = event.target.files[0];
    },
    upload() {
      const formData = new FormData();
      formData.append("file", this.selectedFile);
      formData.append("upload_preset", "lsom30en");
      axios
        .post(
          "https://api.cloudinary.com/v1_1/ben-arous/image/upload",
          formData
        )
        .then((response) => {
          console.log(response.data.url);
          this.thumbnail = response.data.url;
          console.log("test", this.thumbnail);
        });
    },
    getPara: function () {
       var id = JSON.parse(sessionStorage.getItem("session")).id

      axios
        .get(`http://localhost:5000/pharmacies/para/${id}`)
        .then(({ data }) => {
          this.items = data;
          console.log(this.items);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    remove: function (id) {
      axios
        .delete(`http://localhost:5000/pharmacies/delete/${id}`)
        .then(() => {
          this.$router.go();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changeView: function (id) {
      this.currentEdit = id;
    },

    update: function (id) {
      var itemData = {
        name: this.name,
        price: this.price,
      };
      axios
        .put(`http://localhost:5000/pharmacies/updatePara/${id}`, itemData)
        .then(({ data }) => {
          console.log("response from server:", data);
          this.$router.go();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created: function () {
    this.getPara();
  },
};
</script>

<style scoped>
body {
  background-color: #eee;
}
#itemName {
font-size: 30px;
}
.container {
  width: 900px;
}

.card {
  background-color: #fff;
  border: none;
  border-radius: 10px;
  width: 230px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin-top: 100px;
}

.image-container {
  position: relative;
  size: 50%;
}

.thumbnail-image {
  border-radius: 10px !important;
  width: 300px;
  height: 250px;
}
#map {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  margin-left: 15%;
}
.discount {
  background-color: red;
  padding-top: 1px;
  padding-bottom: 1px;
  padding-left: 4px;
  padding-right: 4px;
  font-size: 10px;
  border-radius: 6px;
  color: #fff;
}

.wishlist {
  height: 25px;
  width: 25px;
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.first {
  position: absolute;
  width: 100%;
  padding: 9px;
}

.dress-name {
  font-size: 13px;
  font-weight: bold;
  width: 75%;
}

.new-price {
  font-size: 13px;
  font-weight: bold;
  color: red;
}

.old-price {
  font-size: 8px;
  font-weight: bold;
  color: grey;
}

#form {
  position: fixed;
  margin-left: -150px;
}

.btn {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  padding: 3px;
}

.creme {
  background-color: #fff;
  border: 2px solid grey;
}

.creme:hover {
  border: 3px solid grey;
}

.creme:focus {
  background-color: grey;
}

.red {
  background-color: #fff;
  border: 2px solid red;
}

.red:hover {
  border: 3px solid red;
}

.red:focus {
  background-color: red;
}

.blue {
  background-color: #fff;
  border: 2px solid #40c4ff;
}

.blue:hover {
  border: 3px solid #40c4ff;
}

.blue:focus {
  background-color: #40c4ff;
}

.darkblue {
  background-color: #fff;
  border: 2px solid #01579b;
}

.darkblue:hover {
  border: 3px solid #01579b;
}

.darkblue:focus {
  background-color: #01579b;
}

.yellow {
  background-color: #fff;
  border: 2px solid #ffca28;
}

.yellow:hover {
  border-radius: 3px solid #ffca28;
}

.yellow:focus {
  background-color: #ffca28;
}

.item-size {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid grey;
  color: grey;
  font-size: 10px;
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
}

.rating-number {
  font-size: 10px;
  color: grey;
}

.buy {
  font-size: 12px;
  font-weight: 500;
  color: #eee;
  background: rgb(37, 49, 65);
  border-radius: 5px;
  width: 50px;
}
.remove {
  font-size: 12px;
  font-weight: 500;
  color: #eee;
  background: rgb(209, 26, 26);
  border-radius: 5px;
  width: 50px;
}

.voutchers {
  background-color: #fff;
  border: none;
  border-radius: 10px;
  width: 190px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  overflow: hidden;
}

.voutcher-divider {
  display: flex;
}

.voutcher-left {
  width: 60%;
}

.voutcher-name {
  color: grey;
  font-size: 9px;
  font-weight: 500;
}

.voutcher-code {
  color: red;
  font-size: 11px;
  font-weight: bold;
}

.voutcher-right {
  width: 40%;
  background-color: purple;
  color: #fff;
}

.discount-percent {
  font-size: 12px;
  font-weight: bold;
  position: relative;
  top: 5px;
}

.off {
  font-size: 14px;
  position: relative;
  bottom: 5px;
}
</style>
