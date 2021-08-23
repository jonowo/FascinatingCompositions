import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

const LoadingIcon = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#5eb69d" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});

export default LoadingIcon;
