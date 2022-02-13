import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  Button,
  ScrollView,
  FlatList,
  TextInput,
  I18nManager,
} from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../constant/styles";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Footer from "./Footer";
import axios from "axios";
import data from "react-native-ico/src/data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "./CredentialsContext";
import { colors, Icon } from "react-native-elements";
import { FontAwesome5 } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

class Navbar extends Component {
  static contextType = CredentialsContext;
  constructor(props) {
    super(props);
    this.state = {
      view: [],
      medecine: [],
      medecines: [],
      orderId: "",
      value: 0,
      id: "",
      spesificMed: "",
    };
  }

  componentDidMount() {
    this.fetchdata();
    AsyncStorage.getItem("key")
      .then((d) => {
        console.log('ddddddddddddddddd',d);
        this.setState({ id: JSON.parse(d).id });
      })
      .catch((err) => console.log(err));
  }

  fetchdata = async () => { 
    try {
      let response = await axios.get("http://192.168.1.17:5000/medecine");
      this.setState({ medecine: response.data });
      this.setState({ medecines: response.data });
    } catch (error) {
      console.log(error);
    }
  };

  fetchParasData = async () => {
    try {
      let response = await axios.get("http://192.168.1.17:5000/para/paras");
      this.setState({ medecine: response.data });
    } catch (error) {
      console.log(error);
    }
  };

  myCart(id) {
    console.log('aaaaaaaaaaaaaaaaa',this.state.id);
    console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyy", id);
    this.incrementValue();

    axios
      .put(`http://192.168.1.17:5000/OrderId/${this.state.id}`, { id })
      .then((res) => {
        this.addProductToCart(id);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  incrementValue() {
    this.setState({
      value: this.state.value + 1,
    });
    console.log("value+" + (this.state.value + 1));
  }

  renderView(id) {
    if (true && this.state.view.indexOf(id) === -1) {
      return (
        <View style={styles.socialBarSection}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.socialBarButton}
            onPress={() => {
              this.myCart(id);
            }}
          >
            <Image
              style={styles.icon}
              source={{
                uri: "https://preview.pixlr.com/images/800wm/100/1/1001388439.jpg",
              }}
            />
            <Text style={[styles.socialBarLabel, styles.buyNow]}>
              Ajouté dans la corbeille
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View>
          <Text>Ajouté dans la corbeille</Text>
        </View>
      );
    }
  }

  addProductToCart = (id) => {
    Alert.alert("Succès", "Le produit a été ajouté à votre panier");
    this.setState({ view: [...this.state.view, id] });
    console.log(this.state.view);
  };

  searshForMedicines(medName) {
    var res = [];
    var meds = this.state.medecine;
    if (medName == "") {
      this.setState({ medecine: this.state.medecines });
      return;
    }
    for (var i = 0; i < meds.length; i++) {
      if (meds[i].name.split(medName).length > 1) {
        res.push(meds[i]);
      }
    }
    this.setState({ medecine: res });
  }

  allMeds() {
    this.setState({ medecine: this.state.medecines });
  }

  covidMeds() {
    var res = [];
    for (var i = 0; i < this.state.medecines.length; i++) {
      if (this.state.medecines[i].category === "SOIN ET PROTECTION COVID") {
        res.push(this.state.medecines[i]);
      }
    }
    this.setState({ medecine: res });
  }

  teethMeds() {
    var res = [];
    for (var i = 0; i < this.state.medecines.length; i++) {
      if (this.state.medecines[i].category === "les dents") {
        res.push(this.state.medecines[i]);
      }
    }
    this.setState({ medecine: res });
  }

  cardiohMeds() {
    var res = [];
    for (var i = 0; i < this.state.medecines.length; i++) {
      if (this.state.medecines[i].category === "Cardio") {
        res.push(this.state.medecines[i]);
      }
    }
    this.setState({ medecine: res });
  }

  noseMeds() {
    var res = [];
    for (var i = 0; i < this.state.medecines.length; i++) {
      if (this.state.medecines[i].category === "Nez") {
        res.push(this.state.medecines[i]);
      }
    }
    this.setState({ medecine: res });
  }

  eyesMeds() {
    var res = [];
    for (var i = 0; i < this.state.medecines.length; i++) {
      if (this.state.medecines[i].category === "Yeux") {
        res.push(this.state.medecines[i]);
      }
    }
    this.setState({ medecine: res });
  }

  headMeds() {
    var res = [];
    for (var i = 0; i < this.state.medecines.length; i++) {
      if (this.state.medecines[i].category === "Tête") {
        res.push(this.state.medecines[i]);
      }
    }
    this.setState({ medecine: res });
  }
  scrollListToStart(contentWidth, contentHeight) {
    if (I18nManager.isRTL) {
      this.scrollView.scrollTo({ x: contentWidth });
    }
  }

  render() {
    let containerStyle = I18nManager.isRTL
      ? styles.RTLContainer
      : styles.LTRContainer;
    return (
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: Colors.primaryColor,
            padding: Sizes.fixPadding,
            flexDirection: "column",
          }}
        >
          <View style={styles.headerInfoWrapStyle}>
            <View>
              <Image
                source={require("../assets/images/logoz.png")}
                style={styles.appLogoStyle}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity>
                <Fontisto
                  name="prescription"
                  size={24}
                  color="black"
                  color={Colors.whiteColor}
                  style={{ marginLeft: Sizes.fixPadding + 160.0 }}
                  onPress={() => this.props.navigation.navigate("Identity")}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity>
                <MaterialIcons
                  name="shopping-cart"
                  size={26}
                  color={Colors.whiteColor}
                  style={{ marginLeft: Sizes.fixPadding + 10.0,marginRight:20 }}
                  onPress={() => this.props.navigation.push("cart")}
                />
                <View style={styles.cartItemCountWrapStyle}>
                  <Text>{this.state.value}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.searchButtonStyle}>
            <MaterialIcons
              name="search"
              size={22}
              color={Colors.primaryColor}
              onPress={() => this.searshForMedicines(this.state.spesificMed)}
            />
            <TextInput
              onChangeText={(text) => {
                this.setState({ spesificMed: text });
                this.searshForMedicines(this.state.spesificMed);
              }}
              numberOfLines={1}
              selectionColor={Colors.primaryColor}
              style={{
                ...Fonts.primaryColor18Regular,
                flex: 1,
                marginLeft: Sizes.fixPadding,
              }}
              placeholderTextColor={Colors.primaryColor}
              placeholder="Rechercher des médicaments"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            backgroundColor: "transparent",
          }}
        >
          <ScrollView
            ref={(ref) => (this.scrollView = ref)}
            onContentSizeChange={this.scrollListToStart.bind(this)}
            horizontal={true}
            style={[styles.buttonsContainer, containerStyle]}
          >
            <View>
              <TouchableOpacity
                style={{
                  marginRight: 20,
                  borderWidth: 1,
                  borderColor: "rgba(0,0,0,0.2)",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 55,
                  height: 55,
                  backgroundColor: "white",
                  borderRadius: 50,
                }}
                onPress={() => this.allMeds()}
              >
                <Text>Tous</Text>
              </TouchableOpacity>
              <Text style={{ marginLeft: 15, marginTop: 5 }}>Tous</Text>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  marginRight: 20,
                  borderWidth: 1,
                  borderColor: "rgba(0,0,0,0.2)",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 55,
                  height: 55,
                  backgroundColor: "white",
                  borderRadius: 50,
                }}
                onPress={() => this.covidMeds()}
              >
                <FontAwesome5 name="virus" size={30} color="#185c12" />
              </TouchableOpacity>
              <Text style={{ marginLeft: 7, marginTop: 5 }}>COVID</Text>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  marginRight: 20,
                  borderWidth: 1,
                  borderColor: "rgba(0,0,0,0.2)",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 55,
                  height: 55,
                  backgroundColor: "white",
                  borderRadius: 50,
                }}
                onPress={() => this.teethMeds()}
              >
                <Image
                  source={require("../assets/images/teeth.png")}
                  style={styles.teethStyle}
                />
              </TouchableOpacity>
              <Text style={{ marginLeft: 4, marginTop: 5 }}>DENTAL</Text>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  marginRight: 20,
                  borderWidth: 1,
                  borderColor: "rgba(0,0,0,0.2)",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 55,
                  height: 55,
                  backgroundColor: "white",
                  borderRadius: 50,
                }}
                onPress={() => this.cardiohMeds()}
              >
                {/* <FontAwesome5 name="lungs" size={30} color="#ed8079" /> */}
                <Image
                  source={require("../assets/images/cardio.jpg")}
                  style={styles.noseStyle}
                />
              </TouchableOpacity>
              <Text style={{ marginLeft: 2, marginTop: 5 }}>CARDIO</Text>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  marginRight: 20,
                  borderWidth: 1,
                  borderColor: "rgba(0,0,0,0.2)",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 55,
                  height: 55,
                  backgroundColor: "white",
                  borderRadius: 50,
                }}
                onPress={() => this.noseMeds()}
              >
                <Image
                  source={require("../assets/images/nose.jpg")}
                  style={styles.noseStyle}
                />
              </TouchableOpacity>
              <Text style={{ marginLeft: 8, marginTop: 5 }}>O.R.L</Text>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  marginRight: 20,
                  borderWidth: 1,
                  borderColor: "rgba(0,0,0,0.2)",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 55,
                  height: 55,
                  backgroundColor: "white",
                  borderRadius: 50,
                }}
                onPress={() => this.eyesMeds()}
              >
                <Image
                  source={require("../assets/images/eye.jpg")}
                  style={styles.eyeStyle}
                />
              </TouchableOpacity>
              <Text style={{ marginLeft: 11, marginTop: 5 }}>O.M.G</Text>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  marginRight: 20,
                  borderWidth: 1,
                  borderColor: "rgba(0,0,0,0.2)",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 55,
                  height: 55,
                  backgroundColor: "white",
                  borderRadius: 50,
                }}
                onPress={() => this.headMeds()}
              >
                <Image
                  source={require("../assets/images/hea.jpg")}
                  style={styles.noseStyle}
                />
              </TouchableOpacity>
              <Text style={{ marginLeft: 10, marginTop: 5 }}>Tête</Text>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  marginRight: 20,
                  borderWidth: 1,
                  borderColor: "rgba(0,0,0,0.2)",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 55,
                  height: 55,
                  backgroundColor: "white",
                  borderRadius: 50,
                }}
                onPress={() => this.fetchParasData()}
              >
                <Image
                  source={require("../assets/images/para.jpg")}
                  style={styles.noseStyle}
                />
              </TouchableOpacity>
              <Text style={{ marginLeft: 5, marginTop: 5 }}>PARAS</Text>
            </View>
          </ScrollView>
        </View>

        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={this.state.medecine}
          horizontal={false}
          numColumns={2}
          keyExtractor={(item) => {
            return item.name;
          }}
          ItemSeparatorComponent={() => {
            return <View style={styles.separator} />;
          }}
          renderItem={(post) => {
            const item = post.item;
            return (
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.price}>{item.price} TND</Text>
                  </View>
                </View>

                <Image style={styles.cardImage} source={{ uri: item.img }} />

                <View style={styles.cardFooter}>
                  <View style={styles.socialBarContainer}>
                    {this.renderView(item._id)}
                  </View>
                </View>
              </View>
            );
          }}
        />
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
    right: 9.0,
    height: 19.0,
    width: 17.0,
    bottom: 20.0,
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
  },
  list: {
    paddingHorizontal: 5,
  },
  listContainer: {
    alignItems: "center",
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: "white",
    flexBasis: "47%",
    marginHorizontal: 5,
    borderRadius: 30,
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    flex: 1,
    height: 150,
    width: null,
  },
  /******** card components **************/
  title: {
    fontSize: 18,
    flex: 1,
  },
  price: {
    fontSize: 16,
    color: "green",
    marginTop: 5,
  },
  buyNow: {
    color: "purple",
  },
  icon: {
    width: 25,
    height: 25,
  },
  /******** social bar ******************/
  socialBarContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  teethStyle: {
    width: 50.0,
    height: 50.0,
  },
  noseStyle: {
    width: 50.0,
    height: 20.0,
  },
  eyeStyle: {
    width: 50.0,
    height: 22.0,
  },
  appLogoStyle: {
    width: 120.0,
    height: 40.0,

    // marginBottom: Sizes.fixPadding,
    // marginTop: Sizes.fixPadding * 1.0,
  },
  continueButtonStyle: {
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding - 2.0,
    marginTop: Sizes.fixPadding - 20,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Sizes.fixPadding,
    width: 120.0,
    marginLeft: 120,
    marginTop: 4,
  },
  socialBarSection: {
    justifyContent: "center",
    flexDirection: "row",
    flex: 1,
  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: "flex-end",
    justifyContent: "center",
  },
  socialBarButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  RTLContainer: {
    flexDirection: "row-reverse",
  },

  LTRContainer: {
    flexDirection: "row",
  },
});
Navbar.navigationOptions = () => {
  return {
    header: () => null,
    ...TransitionPresets.SlideFromRightIOS,
  };
};
export default Navbar;
