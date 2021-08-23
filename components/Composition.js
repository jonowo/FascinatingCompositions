import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import LoadingIcon from './LoadingIcon';

const block = '\u3000';

const Composition = ({ route }) => {
    const { filename } = route.params;

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState({});

    const fetchComposition = async () => {
        try {
            const resp = await fetch(
                `https://raw.githubusercontent.com/wykoj/compositions/main/${filename}`
            );
            let data = await resp.text();
            data = data.trim().split(/\r?\n/);
            setData({
                title: data[0],
                author: data[1],
                content: data.slice(2, data.length)
            });
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => fetchComposition(), []);

    if (isLoading) {
        return (
            <View style={styles.outerContainer}>
                <LoadingIcon />
            </View>
        );
    }

    let paragraphs = [];
    data.content.forEach((paragraph, i) => {
        paragraphs.push(
            <Text key={i} style={styles.paragraph}>{block.repeat(2) + paragraph}</Text>
        );
    });

    return (
        <ScrollView style={styles.outerContainer}>
            <View style={styles.innerContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>{data.title + block + data.author}</Text>
                </View>
                {paragraphs}
            </View>
        </ScrollView>
    );
};

Composition.propTypes = {
    route: PropTypes.shape({
        params: PropTypes.shape({
            filename: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: '#fce4e3'
    },
    innerContainer: {
        flex: 1,
        marginTop: 6,
        marginLeft: 12,
        marginRight: 12
    },
    header: {
        alignItems: 'center',
        marginBottom: 6
    },
    title: {
        fontSize: 24
    },
    paragraph: {
        marginBottom: 12,
        fontSize: 16
    }
});

export default Composition;
