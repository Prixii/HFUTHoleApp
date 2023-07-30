import { FC, PropsWithChildren } from 'react'
import { View } from 'react-native'

export const Card: FC<PropsWithChildren> = ({ children }) => (
  <View className="w-full relative overflow-hidden z-0 px-4 py-5 bg-[#29388d] rounded-2xl">
    <View className="w-full relative z-10">{children}</View>
    <View className="absolute top-[30px] right-[-50px] w-[210px] h-[210px] rounded-full bg-[#5482f0]/10" />
    <View className="absolute top-[-50px] right-[-50px] w-[150px] h-[150px] rounded-full bg-[#5482f0]/20" />
  </View>
)
