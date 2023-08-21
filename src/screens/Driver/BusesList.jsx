import React, { useContext, useState } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { HomeDriverStyle } from '../../theme/driverHomeTheme'
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const data = [
    { id: '1', title: 'Bus 1', subtitle: 'Placa X34543XD', status: 'disponible' },
    { id: '2', title: 'Bus 2', subtitle: 'Placa Y45678YE', status: 'ocupado' },
    { id: '3', title: 'Bus 3', subtitle: 'Placa Z56789ZF', status: 'disponible' },
];


const BusCard = ({ item, seleccionarBus, seleccionado }) => {


    return (
        <TouchableOpacity
            onPress={() => seleccionarBus(item.id, item)}
            style={
                item.id == seleccionado ? HomeDriverStyle.busCardActive : HomeDriverStyle.busCard
            }>
            <Text style={
                item.status == 'disponible' ? HomeDriverStyle.busTitleBusFree :
                    item.status == 'ocupado' ? HomeDriverStyle.busTitleBusBusy :
                        HomeDriverStyle.busTitleBusActive
            }>{item.title}</Text>
            <Text style={
                item.status == 'disponible' ? HomeDriverStyle.busSubtitleBusFree :
                    item.status == 'ocupado' ? HomeDriverStyle.busSubtitleBusBusy :
                        HomeDriverStyle.busSubtitleBusActive
            }>{item.subtitle}</Text>
        </TouchableOpacity>
    );
};
const BusesList = () => {
    const navigation = useNavigation();
    const [seleccionado, setSeleccionado] = useState(null)

    const seleccionarBus = (id, data) => {
        if (data.status == 'ocupado') {
            return null
        } else {
            setSeleccionado(id)

        }
    }

    const comenzarCarrera = () => {
        if (seleccionado == null) {
            return null
        } else {
            console.log(seleccionado)
            navigation.navigate('MapDriver')
        }
    }

    const { user, token, logOut } = useContext(AuthContext);
    return (
        <>
            <View style={HomeDriverStyle.busesback}>
                <Text style={HomeDriverStyle.busesTitle}>SELECCIONE SU BUS</Text>
                <View style={HomeDriverStyle.busesCollection}>

                    <FlatList
                        data={data}
                        renderItem={({ item }) => <BusCard
                            item={item}
                            seleccionarBus={seleccionarBus}
                            seleccionado={seleccionado}
                        />}
                        keyExtractor={item => item.id}
                        columnWrapperStyle={{ flexWrap: 'wrap' }}
                        numColumns={2}
                    >

                    </FlatList>
                    <Icon
                        onPress={() => comenzarCarrera()}
                        name="play-circle"
                        size={50}
                        style={HomeDriverStyle.busPlayGreen}
                    />
                </View>
                <MaterialCommunityIcons
                    name="logout"
                    size={30}
                    style={HomeDriverStyle.logout}
                />
            </View>

        </>
    )
}

export default BusesList