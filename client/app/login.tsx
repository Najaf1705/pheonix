import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { userStore } from '@/store/store'
import { Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform } from 'react-native'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { useColorScheme } from '@/hooks/useColorScheme.web'
import { useForm, Controller, type FieldValues } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'

const login = () => {

    const { setLoginStatus, setUser } = userStore();
    const router = useRouter();
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const loginSchema = z.object({
        // name: z.string().min(3),
        email: z.string(),
        password: z.string(),
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

    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const submit = async (data: LoginSchema) => {
        setErrorMsg(null);
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/userEntry`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: " ",
                    email: data.email,
                    password: data.password
                })
            })
            console.log("response", response);
            const res = await response.json();

            if (response.ok) {
                console.log(res.message);
                reset();
                setUser(res.data);
                router.replace('/(tabs)')
            } else {
                if (res.message === "Password does not match") {
                    setErrorMsg("Wrong password");
                } else {
                    setErrorMsg("Invalid credentials");
                }
                console.log(res.message);
            }
        } catch (error) {
            setErrorMsg("Network error");
            console.log(error);
        }
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
                    {/* <ThemedText className='mt-2'>Name</ThemedText>
                    <Controller
                        name='name'
                        control={control}
                        render={({ field: { value, onChange, onBlur } }) => (
                            <TextInput
                                autoFocus={true}
                                inputMode='text'
                                placeholder="Enter Name"
                                className={`${isDark ? "text-white" : "text-black"} border border-gray-500 mt-1 rounded-sm`}
                                placeholderTextColor={colorScheme === 'dark' ? 'grey' : 'grey'}
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                editable={!isSubmitting}
                            />
                        )}
                    />
                    {errors.name && typeof errors.name.message === 'string' &&
                        <Text className='text-red-500 mt-2'>
                            {errors.name.message}
                        </Text>
                    } */}

                    <ThemedText className='mt-2'>Email</ThemedText>
                    <Controller
                        name='email'
                        control={control}
                        render={({ field: { value, onChange, onBlur } }) => (
                            <TextInput
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
                {errorMsg && (
                    <Text className='text-red-500 mt-2'>
                        {errorMsg}
                    </Text>
                )}
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