import { FC } from 'react'

export const Alert: FC<{
  text: string
  type?: 'success' | 'warning' | 'danger'
  centeredText?: boolean
}> = ({
  text,
  type = 'default',
  centeredText = false
}) => {
    const bgColor = (type: string) => {
      switch (type) {
        case 'success':
          return 'bg-green-200'
        case 'warning':
          return 'bg-amber-200'
        case 'danger':
          return 'bg-red-200'
      }
    }

    const textColor = (type: string) => {
      switch (type) {
        case 'success':
          return 'text-green-700'
        case 'warning':
          return 'text-amber-700'
        case 'danger':
          return 'text-red-700'
      }
    }

    return (
      <div className={`rounded-md p-4 my-2 ${bgColor(type)}`}>
        <p className={`text-sm ${centeredText ? 'text-center' : ''} ${textColor(type)}`} >{text}</p>
      </div>
    )
  }