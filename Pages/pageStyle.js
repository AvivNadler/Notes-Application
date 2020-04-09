import  { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 40
    },
    Header: {
        flex: 2
    },
    Content: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30
    },
    textBig: {
        fontSize: 35,
        color: 'red',
        margin: 10
    },
    textMedium: {
        fontSize: 30,
        color: 'blue'
    },
    textSmall: {
        fontSize: 17,
        color: 'rgb(100,150,250)',
        margin:5
    },
    Button: {
        backgroundColor: 'lightgray',
        padding: 20,
        borderRadius: 15
    },
    TxtInp: {
        height: 50,
        width: 200,
        borderColor: 'gray',
        borderWidth: 2,
        margin: 15,
        fontSize:30,
        padding:5,
        borderRadius:5
    },
    Err:{
        color:'red',
        margin:15,
        
    },
    lblText:{
        fontSize:30
    }
});