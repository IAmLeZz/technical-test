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



  return (
    <main style={{ zIndex: '1' }}>
      <ParticlesBG></ParticlesBG>
      <h1 className='text-[40px] text-center font-bold company-text'>SPACEX APP</h1>
      {/* <Company></Company> */}
      <h3 className='text-[30px] text-center font-bold'>Our rockets</h3>
      <Rockets />
      <Landpads></Landpads>
      <Launchpads></Launchpads>
      <History></History>
      <div className='w-[100%] md:w-[45%] m-auto my-5'>
        <LaunchesChart isSuccess={true}></LaunchesChart>
      </div>
      <div className='w-[100%] md:w-[45%] h-auto m-auto my-5'>
        <PayloadsChart></PayloadsChart>
      </div>
      <div className='w-[100%] md:w-[45%] h-auto m-auto my-5'>
        <LandpadsChart></LandpadsChart>
      </div>
    </main>
  )
}
