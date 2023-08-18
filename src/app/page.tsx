"use client"
import Rockets from '@/components/Rockets'
import useSpaceXData from '@/hooks/useSpaceXData'
import Image from 'next/image'


export default function Home() {
  const { data, getSpaceXData } = useSpaceXData({endpoint: 'v4/rockets'})
  return (
    <main>
      <h1 className='text-[60px] text-center font-bold'>SPACEX APP</h1>
      <h3 className='text-[30px] text-center font-bold'>Our Rockets</h3>
      <Rockets rockets={data} />
    </main>
  )
}
