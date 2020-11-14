import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Modal } from "react-native";
import { Video } from "expo-av";
import VideoPlayer from "expo-video-player";

import Card from "../components/Card";

const { width, height } = Dimensions.get("window");

const MoviePlayer = props => {
  const [fullscreen, setFullscreen] = useState(false);

  const video = () => {
    return (
      <VideoPlayer
        videoProps={{
          shouldPlay: false,
          resizeMode: Video.RESIZE_MODE_CONTAIN,
          source: props.uri,
        }}
        inFullscreen={fullscreen}
        switchToPortrait={() => {
          setFullscreen(false);
        }}
        switchToLandscape={() => {
          setFullscreen(true);
        }}
        showControlsOnLoad={true}
        width={fullscreen ? height : styles.video.width}
        height={fullscreen ? width : styles.video.height}
        videoBackground="#000"
      />
    );
  };

  if (!fullscreen) {
    return (
      <View style={styles.videoContainer}>
        <Card style={styles.video}>{video()}</Card>
      </View>
    );
  } else {
    return (
      <Modal>
        <View style={styles.fullscreenVideo}>{video()}</View>
      </Modal>
    );
  }
};

const styles = StyleSheet.create({
  videoContainer: {
    flex: 1,
    width: "100%",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    height: width * (9 / 16),
    width: width * (9 / 10),
    overflow: "hidden",
    backgroundColor: "#000",
  },
  fullscreenVideo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "90deg" }],
    backgroundColor: "black",
  },
});

export default MoviePlayer;
