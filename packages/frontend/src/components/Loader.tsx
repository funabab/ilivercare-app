import React from 'react'
import { Bars } from 'react-loader-spinner'

interface Props {}

const Loader: React.FC<Props> = () => {
  return (
    <Bars
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="bars-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  )
}

export default Loader
