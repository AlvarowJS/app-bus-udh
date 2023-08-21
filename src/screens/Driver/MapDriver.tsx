import React, { useContext } from 'react'
import { Text, View } from 'react-native'
import { AuthContext } from '../../context/AuthContext';
import { HomeStudentStyle } from '../../theme/homeStudentTheme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MapDriver = () => {
    const { userDriver, token, logOut } = useContext(AuthContext);

    console.log(userDriver)
    return (
        <>
            <View style={HomeStudentStyle.header} >
                {/* <Image
                    source={{ uri: user?.avatar }}
                    style={HomeStudentStyle.photo}
                /> */}
                <Text style={HomeStudentStyle.name}>
                    {/* {user?.name.split(' ').slice(0, 2).join(' ')} */}
                </Text>

            </View>
            <View>
                <MaterialCommunityIcons
                    name="logout"
                    size={20}
                    style={HomeStudentStyle.logout}
                    onPress={logOut}
                />

            </View>
        </>
    )
}

export default MapDriver