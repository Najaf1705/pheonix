import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, useColorScheme, Modal, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import { useColors } from '@/constants/Colors';
import { useRouter } from 'expo-router';

interface HeaderProps {
    title: string;
}


export default function Header({ title }: HeaderProps) {
    const colors = useColors();
    const router=useRouter();

    return (
        <ThemedView style={[{}]}>
            <ThemedView style={[styles.header, { backgroundColor: colors.safeAreaBg }]}>
                <ThemedText 
                    className='mt-2 font-semibold'
                    style={[{fontSize: 20}]}>
                    {title}
                </ThemedText>
                <TouchableOpacity className='flex justify-center bg-indigo-300 rounded'>
                    <Text
                        className='mx-2 font-bold'
                        onPress={()=>router.replace('/login')}
                    >
                        Logout
                    </Text>
                </TouchableOpacity>
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 54,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        zIndex: 1,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 10,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    greetingText: {
        fontSize: 16,
        fontWeight: '600',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 7,
        borderRadius: 5,
        justifyContent: 'center',
        height: 30,
    },
    logoutButtonText: {
        fontSize: 16,
    },
    logoutIcon: {
        marginLeft: 5,
    },
});