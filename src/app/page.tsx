"use client"
import Rockets from '@/components/Rockets'
import useSpaceXData from '@/hooks/useSpaceXData'
import History from '@/components/History'
import ParticlesBG from '@/components/ParticlesBG'
import Company from '@/components/Company'
import LaunchesChart from '@/components/LaunchesChart'
import PayloadsChart from '@/components/PayloadsChart'
import Landpads from '@/components/Landpads'
import Launchpads from '@/components/Launchpads'
import LandpadsChart from '@/components/LandpadsChart'


export default function Home() {
  const { data: rockets, getSpaceXData: getRockets } = useSpaceXData({ endpoint: 'v4/rockets' })
  const { data: history, getSpaceXData: getHistory } = useSpaceXData({ endpoint: 'v4/history' })
  const { data: company, getSpaceXData: getCompany } = useSpaceXData({ endpoint: 'v4/company' })
  const { data: launches, getSpaceXData: getLaunches } = useSpaceXData({ endpoint: 'v5/launches' })
  const { data: payloads, getSpaceXData: getPayloads } = useSpaceXData({ endpoint: 'v4/payloads' })
  const { data: landpads, getSpaceXData: getLandpads } = useSpaceXData({ endpoint: 'v4/landpads' })

  if (rockets && history && company) {
    return (
      <main style={{ zIndex: '1' }}>
        <ParticlesBG></ParticlesBG>
        <h1 className='text-[40px] text-center font-bold company-text'>SPACEX APP</h1>
        {/* <Company spaceXData={company}></Company> */}
        <h3 className='text-[30px] text-center font-bold'>Our rockets</h3>
        <Rockets rockets={rockets} />
        <Landpads landpadsData={landpads}></Landpads>
        <Launchpads></Launchpads>
        <History events={history}></History>
        <div className='w-[100%] md:w-[45%] m-auto my-5'>
          <LaunchesChart launches={launches} isSuccess={true}></LaunchesChart>
        </div>
        <div className='w-[100%] md:w-[45%] h-auto m-auto my-5'>
          <PayloadsChart payload={payloads}></PayloadsChart>
        </div>
        <div className='w-[100%] md:w-[45%] h-auto m-auto my-5'>
          <LandpadsChart landpadsData={landpads}></LandpadsChart>
        </div>
      </main>
    )
  }
}