import {FlatList, View, Text, StyleSheet} from 'react-native';
import {Link, Stack, useLocalSearchParams} from "expo-router";

const currencies = require("../assets/currencies.json");

export default function ValPicker() {
    const {ID} = useLocalSearchParams();

    return (<View style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
        justifyContent: "center"
    }}>
        <Stack.Screen options={{
            title: "Change Value",
            headerTitleAlign: "center",
        }}/>

        <FlatList data={currencies} renderItem={({item}) => (
            <Link dismissTo href={`/?ID=${ID}&code=${item.code}`}>
                <View style={styles.item}>
                    <View style={styles.fullNamePart}>
                        <Text style={styles.itemText}>{item.fullName}</Text>
                    </View>
                    <View style={styles.codePart}>
                        <Text style={styles.itemText}>{item.code}</Text>
                    </View>
                </View>
            </Link>

        )}
                  style={
                      {
                          marginBottom: 12
                      }
                  }
        />
    </View>)
        ;
}

const styles = StyleSheet.create({
    item: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#DDDDDD',
        flexDirection: 'row',
    },
    fullNamePart: {
        marginLeft: 10,
        width: 330 - 56,
    },
    codePart: {
        width: 56,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemText: {
        fontSize: 18,
    },
});