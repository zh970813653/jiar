import React from 'react'
import {Rate} from 'antd'

interface PinProps extends React.ComponentProps<typeof Rate> {
  checked: boolean
  onCheckedChange?: (checked: boolean) => void
}

export const Pin  = (props: PinProps) => {
  const {checked,onCheckedChange,...r} = props
  return (
    <Rate
    count={1}
    value={checked? 1 : 0}
    onChange={value => onCheckedChange?.(!!value)}
    {...r}
    ></Rate>
  )
}
