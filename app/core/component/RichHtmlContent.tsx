import React, { Dimensions, StyleSheet, View } from "react-native";
import AutoHeightWebView from "react-native-autoheight-webview";

export default function RichHtmlContent({ html }: { html: string }) {
  const wrapped = `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <style>
          body { margin:0; padding:0; }
          p { color:black; }
          iframe { width:100%; border:0; }
          .image img { width:100%; height:auto; object-fit:contain; }
          .media div[style*="padding-bottom"] { position:relative !important; height:0 !important; }
          .media iframe { position:absolute !important; top:0; left:0; width:100% !important; height:100% !important; }
        </style>
      </head>
      <body>${html}</body>
    </html>
  `;

  return (
    <View style={styles.webviewContainer}>
      <AutoHeightWebView
        javaScriptEnabled
        domStorageEnabled
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        allowsFullscreenVideo
        mixedContentMode="always"
        setSupportMultipleWindows={false}
        thirdPartyCookiesEnabled={true}

        originWhitelist={["*"]}
        source={{
          html: wrapped,
          baseUrl: "https://denmasslamet.com",
        }}

        automaticallyAdjustContentInsets={false}
        style={{ width: Dimensions.get("window").width - 50 }}
        scalesPageToFit={false}
        viewportContent="width=device-width, user-scalable=no"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  webviewContainer: { width: "100%", marginVertical: 10 },
  webview: { width: "100%" },
});
