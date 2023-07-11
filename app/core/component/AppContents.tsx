import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppVideoContent from './AppVideoContent';
import AppImageContent from './AppImageContent';
import AppTextContent from './AppTextContent';

type contentsProps = {
  contents: Array<any>,
}

const dummy_text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
const dummy_image = 'https://via.placeholder.com/400x400.png/0077ff?text=animals+veritatis';
const dummy_video = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

export default function AppContents({contents}: contentsProps) {
  return (
    <View>
      {
        contents.map((item, index) => {

          if(item.content_type_id === 1) {
            return <AppTextContent key={index} value={item.value} />
          }else if(item.content_type_id === 2) {
            return <AppImageContent key={index} uri={item.value}/>
          }else if(item.content_type_id === 3) {
            return <AppVideoContent key={index} url={item.value} />
          }else{
            return null;
          }

        })
      }
    </View>
  )
}

const styles = StyleSheet.create({})