import React, { Component } from "react";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import Footer from "./Footer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors, Fonts, Sizes } from "../constant/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      Valuue: [],
      value: 1,
      totalPrice: 0,
      id: "",
      gov: null,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("key")
      .then((d) => {
        this.setState({ id: JSON.parse(d).id });
      })
      .then(() => {
        this.fetchdata();
      })
      .catch((err) => console.log(err));
  }
  incrementValue(id) {
    var data = this.state.data;
    for (let i = 0; i < data.length; i++) {
      if (data[i]._id === id && data[i].qt < 5) {
        data[i].qt++;
        data[i].price = data[i].price + data[i].prix;
      }
      this.setState({ data: data });
    }
    this.totalPrice();
  }

  totalPrice(dat = this.state.data) {
    var total = 0;
    for (var i = 0; i < dat.length; i++) {
      total += dat[i].price;
    }
    this.setState({ totalPrice: total });
  }
  decrementValue(id) {
    var data = this.state.data;
    for (let i = 0; i < data.length; i++) {
      if (data[i]._id === id && data[i].qt > 1) {
        data[i].qt--;
        data[i].price = data[i].price - data[i].prix;
      }
      this.setState({ data: data });
    }
    this.totalPrice();
  }

  confirm() {
    axios
      .put(`http://192.168.43.184:5000/ListOrderById/${this.state.id}`, {})
      .then((res) => {
      })
      .catch((err) => {
        console.log(err);
      });
  }

  fetchdata() {
    console.log(this.state.gov);
    axios
      .get(`http://192.168.43.184:5000/medecine/cart/${this.state.id}`)
      .then(({ data }) => {
        var datta = data;
        for (var i = 0; i < datta.length; i++) {1
          datta[i].qt = 1;
          datta[i].prix = datta[i].price;
        }

        this.setState({ data: datta });
        this.totalPrice();
      });
  }
  clickEventListener = (item) => {
    Alert.alert("Item selected: " + item.name);
  };

  __getCompletedIcon = () => {
    return "https://img.icons8.com/flat_round/64/000000/checkmark.png";
  };

  __getDescriptionStyle = (item) => {
    if (item.completed == 1) {
      return {
        textDecorationLine: "line-through",
        fontStyle: "italic",
        color: "#808080",
      };
    }
  };

  delete(id) {
    axios
      .put(`http://192.168.43.184:5000/deleteOrder/${this.state.id}`, { id: id })
      .then(() => {
        this.fetchdata();
      });
  }

  confirmation() {
    AsyncStorage.getItem("state")
      .then((d) => {
        this.setState({ gov: d });
      })
      .then(() => {
        if (this.state.data.length === 0) {
          Alert.alert("hint", "You need to add medecines to your cart");
        } 
        // else if (this.state.gov === null) {
        //   Alert.alert("hint", "You need to mention your location");
        // }
         else {
          AsyncStorage.removeItem("state");
          var res = [];
          var data = this.state.data;

          for (var i = 0; i < data.length; i++) {
            res.push({
              id: data[i]._id,
              quatity: data[i].qt,
            });
          }
          axios
            .put(`http://192.168.43.184:5000/confirmation/${this.state.id}`, {
              data: res,
              totalPrice: this.state.totalPrice,
            })
            .then(({data}) => {
              this.props.navigation.push("Aploder",{money:this.state.totalPrice});
            })
            .catch((err) => err);
        }
      })
      .catch((err) => err);
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.tasks}
          columnWrapperStyle={styles.listContainer}
          data={this.state.data}
          keyExtractor={(item) => {
            return item._id;
          }}
          renderItem={({ item }) => {
            return (
              <View>
                <TouchableOpacity
                  style={[styles.card, { borderColor: item.color }]}
                  onPress={() => {
                    this.clickEventListener(item);
                  }}
                >
                  <Image
                    style={styles.img}
                    source={{ uri: this.__getCompletedIcon(item) }}
                  />
                  <View style={styles.cardContent}>
                    <Text
                      style={[
                        styles.description,
                        this.__getDescriptionStyle(item),
                      ]}
                    >
                      {item.name}
                    </Text>
                    <Text size={29}>Price :{item.price}DT</Text>
                    <Text> </Text>
                    <View style={{ flexDirection: "column" }}>
                      <MaterialCommunityIcons
                        name="plus"
                        size={29}
                        onPress={() => this.incrementValue(item._id)}
                      />
                      <Text> </Text>
                      <View style={{ fontSize: 900 }}>
                        <Text>Quantity : {item.qt}</Text>
                      </View>
                      <Text> </Text>
                      <MaterialCommunityIcons
                        name="minus"
                        size={29}
                        onPress={() => this.decrementValue(item._id)}
                      />
                    </View>
                  </View>
                  <MaterialIcons style={{left:15}} name="delete" size={24} color={Colors.primaryColor}
                                    onPress={() => {
                                       this.delete(item._id)
                                    }}
                                />
                    
                    
                    
                  
                </TouchableOpacity>
              </View>
            );
          }}
        />
        <View>
          <Text> TotalPrice {this.state.totalPrice} DT</Text>

          <Button
            onPress={() => this.confirmation()}
            title="Confirm"
            color="#10857F"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
        <Footer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerInfoWrapStyle: {
    flexDirection: "row",
    paddingLeft: Sizes.fixPadding,
    alignItems: "center",
    justifyContent: "space-between",
  },
  cartItemCountWrapStyle: {
    position: "absolute",
    right: -8.0,
    height: 17.0,
    width: 17.0,
    borderRadius: 8.5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.redColor,
    elevation: 10.0,
  },
  searchButtonStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 1.0,
    marginTop: Sizes.fixPadding + 5.0,
  },

  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#eeeeee",
  },
  tasks: {
    flex: 1,
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10,
  },
  image: {
    width: 25,
    height: 25,
  },

  card: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: "white",
    flexBasis: "46%",
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    borderLeftWidth: 6,
  },

  description: {
    fontSize: 18,
    flex: 1,
    color: "#008080",
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    flex: 1,
    color: "#696969",
    marginTop: 5,
  },
});

// Cart.navigationOptions = () => {
//   return {
//     header: () => null,
//     ...TransitionPresets.SlideFromRightIOS,
//   };
// };
// export default withNavigation(Cart);
