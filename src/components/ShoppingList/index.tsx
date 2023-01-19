import React, { useState, useEffect } from "react";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { FlatList } from "react-native";

import { styles } from "./styles";
import { Product, ProductProps } from "../Product";

export function ShoppingList() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  function loadProducts() {
    const subscribe: any = firestore();
    // onSnapshot a atualização é em tempo real, sem atualizar o app.
    firestore()
      .collection("products")
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as ProductProps[];
        setProducts(data);
      });

    return () => subscribe();
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Product data={item} />}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
}
