import React, { useState } from "react";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import storage from "@react-native-firebase/storage";

import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Photo } from "../../components/Photo";

import { Container, Content, Progress, Transferred } from "./styles";

export function Upload() {
  const [image, setImage] = useState("");
  const [bytesTransferred, setBytesTransferred] = useState("");
  const [progress, setProgress] = useState("0");

  async function handlePickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status == "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  }

  async function handleUpload() {
    // pega a extensao da imagem
    const MINE = image.match(/\.(?:.(?!\.))+$/);

    console.log(MINE);
    // nome do arquivo
    const fileName = new Date().getTime();
    // local onde vc deseja salvar
    const reference = storage().ref(`/images/${fileName}${MINE}`);

    // envia pegando a url da imagem
    const uploadTask = reference.putFile(image);

    // usamos o on para acompanhar o status de mudança
    uploadTask.on("state_changed", (taskSnapshot) => {
      const percent = (
        (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
        100
      ).toFixed(0);

      setProgress(percent);
      setBytesTransferred(
        `${taskSnapshot.bytesTransferred} transferido de ${taskSnapshot.totalBytes}`
      );
    });

    // qunado finalizar da um alert
    uploadTask.then(async () => {
      const imageUrl = await reference.getDownloadURL();

      Alert.alert("Upload concluído com sucesso");
    });
  }

  return (
    <Container>
      <Header title="Upload de fotos" />

      <Content>
        <Photo uri={image} onPress={handlePickImage} />

        <Button title="Fazer upload" onPress={handleUpload} />

        <Progress>{progress}%</Progress>

        <Transferred>{bytesTransferred}</Transferred>
      </Content>
    </Container>
  );
}
