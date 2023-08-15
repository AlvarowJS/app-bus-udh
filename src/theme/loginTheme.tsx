import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
    title: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
        top: 50
    },
    text: {
        color: '#39D793',
        fontWeight: 'bold'
    },
    text_active: {
        color: 'white',
        fontWeight: 'bold'
    },
    content_inputs: {
        top: -10,
        marginHorizontal: '12%'

    },
    input: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 10,
        marginVertical: 5,
        color: 'black'
    },
    container: {
        flex: 1,
        justifyContent: 'center', // Centra verticalmente
        alignItems: 'center', // Centra horizontalmente

    },
    login_button: {
        backgroundColor: '#158957',
        paddingHorizontal: 90,
        marginBottom: 15,
    },
    google: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingHorizontal: 55,
        paddingVertical: 10,
        alignItems: 'center',
    },
    aviso: {
        color: 'white',
        marginHorizontal: 20,
        textAlign: 'center',
        fontSize: 15
    }
});