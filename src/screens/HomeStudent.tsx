import React, { useContext } from 'react'
import { Image, Text, View } from 'react-native'
import { AuthContext } from '../context/AuthContext';
import { HomeStudentStyle } from '../theme/homeStudentTheme';

const HomeStudent = () => {
  const { user, token, logOut } = useContext(AuthContext);
  const words = user.name.split(' ');
  const firstTwoWords = words.slice(0, 2);
  const displayName = firstTwoWords.join(' ');
  return (
    <>
      <View style={HomeStudentStyle.header} >
        <Image
          source={{ uri: user.avatar }}
          style={HomeStudentStyle.photo}
        />
        <Text style={HomeStudentStyle.name}>{displayName}</Text>
  
      </View>
      <View>
        <Text style={HomeStudentStyle.logout}>Salir</Text>
      </View>
    </>
  )
}

export default HomeStudent