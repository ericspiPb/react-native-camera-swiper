import React, { useRef, useEffect } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { Video } from 'expo-av';

import styles from './camera.gallery.styles';

export default ({ captures = [] }: { captures: Array<{ uri: string }> }) => {
  return (
    <ScrollView horizontal={true} style={[styles.bottomToolbar, styles.galleryContainer]}>
      {
        captures.map(({ uri }) => (
          <View style={styles.galleryImageContainer} key={uri}>
            {
              uri.lastIndexOf('.mov') > -1 ?
              <Video source={{ uri }} isLooping={true} style={styles.galleryImage} ref={video => video?.playAsync()} /> :
              <Image source={{ uri }} style={styles.galleryImage} />
            }
          </View>
        ))
      }
    </ScrollView>
  )
};
