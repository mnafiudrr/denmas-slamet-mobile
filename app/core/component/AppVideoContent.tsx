import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

type AppVideoContentProps = {
  url: string,
}

const dummy_video = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

export default function AppVideoContent({url}: AppVideoContentProps) {
  
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  return (
    <View style={styles.containerVideo}>
    </View>
  )
}

const styles = StyleSheet.create({
  containerVideo: {
    alignItems: 'center',
    paddingVertical: wp(2),
  },
})