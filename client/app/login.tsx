import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { useCounterStore } from '@/store/store'
import { Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform } from 'react-native'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { useColorScheme } from '@/hooks/useColorScheme.web'
import { useForm, Controller, type FieldValues } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'

const login = () => {

    const { setLoginStatus } = useCounterStore();
    const router = useRouter();
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const loginSchema = z.object({
        email: z.string().email(),
        password: z.string().min(8, "Atleast 8 characters required")
    })

    type LoginSchema = z.infer<typeof loginSchema>;

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });


    const submit = async (data: LoginSchema) => {
        console.log(data);
        console.log("Email: ", data.email);
        console.log("Password: ", data.password);
        await new Promise(res => setTimeout(res, 2000));
        reset();
        // router.replace('/(tabs)')
    }

    if (!setLoginStatus) return null;
    return (
        <KeyboardAvoidingView className="h-full flex items-center justify-center"
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={10}>
            <View className={`${isDark ? "border-white bg-slate-700" : "border-black bg-slate-200"} border rounded-md w-96 p-4 bg-bg items-center`}>
                <ThemedText className='text-text'>
                    Login
                </ThemedText>
                <View className='w-full'>
                    <ThemedText className='mt-2'>Email</ThemedText>
                    <Controller
                        name='email'
                        control={control}
                        render={({ field: { value, onChange, onBlur } }) => (
                            <TextInput
                                autoFocus={true}
                                inputMode='email'
                                placeholder="Enter Email"
                                className={`${isDark ? "text-white" : "text-black"} border border-gray-500 mt-1 rounded-sm`}
                                placeholderTextColor={colorScheme === 'dark' ? 'grey' : 'grey'}
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                editable={!isSubmitting}
                            />
                        )}
                    />
                    {errors.email && typeof errors.email.message === 'string' &&
                        <Text className='text-red-500 mt-2'>
                            {errors.email.message}
                        </Text>
                    }

                    <ThemedText className='mt-2'>Password</ThemedText>
                    <Controller
                        name='password'
                        control={control}
                        render={({ field: { value, onChange, onBlur } }) => (
                            <TextInput
                                placeholder="Enter Password"
                                inputMode='text'
                                className={`${isDark ? "text-white" : "text-black"} border border-gray-500 mt-1 rounded-sm`}
                                placeholderTextColor={colorScheme === 'dark' ? 'grey' : 'grey'}
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                secureTextEntry
                                editable={!isSubmitting}
                            />
                        )}
                    />
                    {errors.password && typeof errors.password.message === 'string' &&
                        <Text className='text-red-500 mt-2'>
                            {errors.password.message}
                        </Text>
                    }

                </View>
                <TouchableOpacity
                    className={`mt-4 w-1/2 h-12 flex items-center justify-center rounded-md ${isSubmitting ? "bg-green-400/20" : "bg-green-400"}`}
                    onPress={handleSubmit(submit)}
                    disabled={isSubmitting}
                >
                    <Text className="text-black text-center font-bold text-xl">Login</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default login