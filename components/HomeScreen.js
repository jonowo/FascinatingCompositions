import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import LoadingIcon from './LoadingIcon';

const HomeScreen = ({ navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const fetchMeta = async () => {
        try {
            const resp = await fetch(
                'https://raw.githubusercontent.com/wykoj/compositions/main/meta.txt'
            );
            let data = await resp.text();
            data = data.trim().split(/\r?\n/);
            let compositions = [];
            for (let line of data) {
                line = line.split(' ');
                compositions.push({
                    key: line[0],
                    filename: line[0],
                    title: line[1],
                    author: line[2]
                });
            }
            setData(compositions);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => fetchMeta(), []);

    if (isLoading) {
        return (
            <View style={styles.container}>
                <LoadingIcon />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={
                    ({ item }) =>
                        <TouchableOpacity
                            style={styles.item}
                            onPress={
                                () => navigation.navigate(
                                    'Composition',
                                    { filename: item.filename, title: item.title }
                                )
                            }
                        >
                            <Text style={styles.itemText}>{item.title}</Text>
                            <Text style={styles.itemText}>{item.author}</Text>
                        </TouchableOpacity>
                }
            />
        </View>
    );
};

HomeScreen.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired
    }).isRequired
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffbfc3'
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 8,
        paddingBottom: 8,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 80,
        backgroundColor: 'white'
    },
    itemText: {
        fontSize: 24
    }
});

export default HomeScreen;
