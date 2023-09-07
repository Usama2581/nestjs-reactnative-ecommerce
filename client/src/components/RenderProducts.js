import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Stars from './Stars'
import { useNavigation } from '@react-navigation/native'
import Loader from './Loader'


export default function RenderProducts({ data }) {

  const navigation = useNavigation()
  const [products, setProducts] = useState([])

  const title = data.title
  const category = data.category
  // console.log(title);



  useEffect(() => {
    axios.get((`https://curious-toad-suspenders.cyclic.app/products/get/${category}`))
      .then(res => setProducts(res.data))
      .catch(err => console.error(err))

  }, [])




  const renderItem = ({ item }) => {
    // console.log(item)
    return (
      <>

        <View style={styles.product_box}>
          <TouchableOpacity style={styles.product} onPress={() => navigation.navigate('Details', { item, screen: 'Home' })} >
            <View style={styles.image_box}>
              <Image source={{ uri: item?.thumbnail }} style={styles.image} />
            </View>
            <View style={{ padding: 10 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>Rs. {item.price} </Text>

              <Text style={styles.oldPrice}>Rs. {Math.round(item.price + (item.price * item.discountPercentage) / 100)}</Text>

              <Stars rating={item.rating} size={15} />
            </View>
          </TouchableOpacity>

        </View>
      </>
    )
  }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{title}</Text>
      <FlatList
        decelerationRate='fast'
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        ListEmptyComponent={
          <View style={{ height: 150, width: 350 }}>
            <Loader style={{ alignSelf: 'center' }} />
          </View>
        }

      />
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 20,
  },
  product_box: {
    marginLeft: 15 // to add space from between products
  },
  product: {
    width: 150,
    height: 270,
    backgroundColor: 'white',
    marginBottom: 10, // to add space between products categories
    marginTop: 3, // to add space between products categories
    elevation: 8,
    borderRadius: 20
  },
  image_box: {
    width: '100%',
    height: '50%',
  },
  image: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  text: {
    color: 'black',
    fontSize: 15,
  },
  heading: {
    marginLeft: 15
  },
  oldPrice: {
    textDecorationStyle: 'solid',
    textDecorationLine: 'line-through',
    fontSize: 12,
    color: '#808080',
    textDecorationColor: '#808080',
    fontFamily: 'Poppins-Regular',
  },
  title: {
    fontSize: 13,
    color: '#282828',
    fontFamily: 'Poppins-Medium',
  },
  price: {
    color: '#282828',
    fontFamily: 'Poppins-Medium',
    fontSize: 17,
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 25,
    fontFamily: 'Poppins-Regular',
    marginLeft: 17,
    textTransform: 'capitalize'
  },
})