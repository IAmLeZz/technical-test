"use client"
import Rockets from '@/components/Rockets'
import useSpaceXData from '@/hooks/useSpaceXData'
import History from '@/components/History'
import ParticlesBG from '@/components/ParticlesBG'
import Company from '@/components/Company'
import { useEffect, useState } from 'react'
import EmployeesChart from '@/components/PayloadsChart'
import LaunchesChart from '@/components/LaunchesChart'
import PayloadsChart from '@/components/PayloadsChart'


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
