import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { IconProps } from 'react-native-vector-icons/Icon'
import React from 'react'
import { useTheme } from 'react-native-paper'

export const Icons = (props: IconProps) => <MaterialIcon {...props} />

const withIconProps = (
  WrappedIconComponent: React.ComponentType<IconProps>,
  name: string
) => {
  return (
    props: Omit<IconProps, 'name'> & { name?: string; active?: boolean }
  ) => {
    const theme = useTheme()

    return (
      <WrappedIconComponent
        name={name}
        color={props.active ? theme.colors.primary : 'grey'}
        {...props}
      />
    )
  }
}

const withFontAV5Icon = (name: string) => withIconProps(FontAwesome5Icon, name)
const withMaterialIcon = (name: string) => withIconProps(MaterialIcon, name)

export const LikeIcon = withMaterialIcon('thumb-up')

export const MenuIcon = withMaterialIcon('menu')

export const CommentIcon = withMaterialIcon('chat')

export const SearchIcon = withMaterialIcon('search')

export const DeleteIcon = withMaterialIcon('delete')

export const CloseIcon = withMaterialIcon('close')

export const RightIcon = withMaterialIcon('chevron-right')

export const AddIcon = withMaterialIcon('add')
