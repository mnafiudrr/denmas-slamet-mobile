import React, { Dimensions, StyleSheet, View } from "react-native";
import AutoHeightWebView from "react-native-autoheight-webview";

export default function HtmlContent({ html }: { html: string }) {

  return (
    <View style={styles.webviewContainer}>
      <AutoHeightWebView
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        mixedContentMode="always"
        setSupportMultipleWindows={false}
        allowsFullscreenVideo={true}

        automaticallyAdjustContentInsets={false}
        originWhitelist={["*"]}
        source={{
          html: html,
        }}
        customStyle={`
          p {
            color: black;
          }
          iframe {
            width: 100%;
            // height: auto; 
          }
          .image img {
            width: 100%; 
            height: auto; 
            object-fit: contain; 
          }
        `}
        // allowsFullscreenVideo={true}
        style={{ width: Dimensions.get("window").width - 50 }}
        scalesPageToFit={false}
        viewportContent={"width=device-width, user-scalable=no"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  webviewContainer: {
    width: "100%",
    marginVertical: 10,
  },
  webview: {
    width: "100%",
  },
});
