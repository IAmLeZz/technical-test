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
  const { data: rockets, getSpaceXData: getRockets } = useSpaceXData({ endpoint: 'v4/rockets' })
  const { data: history, getSpaceXData: getHistory } = useSpaceXData({ endpoint: 'v4/history' })
  const { data: company, getSpaceXData: getCompany } = useSpaceXData({ endpoint: 'v4/company' })
  const { data: launches, getSpaceXData: getLaunches } = useSpaceXData({ endpoint: 'v5/launches' })
  const { data: payloads, getSpaceXData: getPayloads } = useSpaceXData({endpoint: 'v4/payloads'})

  if (rockets && history && company) {
    console.log(company)
    return (
      <main style={{ zIndex: '1' }}>
        <ParticlesBG></ParticlesBG>
        <h1 className='text-[40px] text-center font-bold company-text'>SPACEX APP</h1>
       {  <Company spaceXData={company}></Company>  }
        <h3 className='text-[30px] text-center font-bold'>Our rockets</h3>
        <Rockets rockets={rockets} />
        <History events={history}></History>
        <div className='w-[100%] md:w-[45%] m-auto'>
          <LaunchesChart launches={launches} isSuccess={true}></LaunchesChart>
        </div>
        <div className='w-[100%] md:w-[45%] h-auto m-auto'>
          <PayloadsChart payload={payloads}></PayloadsChart>
        </div>
      </main>
    )
  }
}