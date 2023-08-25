import Rockets from '@/components/Rockets'
import History from '@/components/History'
import Company from '@/components/Company'
import LaunchesChart from '@/components/charts/LaunchesChart'
import PayloadsChart from '@/components/charts/PayloadsChart'
import Landpads from '@/components/Landpads'
import Launchpads from '@/components/Launchpads'
import Notification from '@/components/Notification'
import LandpadsChart from '@/components/charts/LandpadsChart'
import ParticlesBackground from '@/components/ParticlesBackground'

export default function Home() {

  return (
    <main style={{ zIndex: '1' }}>
      <Notification />
      <ParticlesBackground />
      <Company />
      <Rockets />
      <Landpads />
      <Launchpads />
      <History />
      <div className='w-[100%] md:w-[45%] m-auto my-5'>
        <LaunchesChart isSuccess={true} />
      </div>
      <div className='w-[100%] md:w-[45%] h-auto m-auto my-5'>
        <PayloadsChart />
      </div>
      <div className='w-[100%] md:w-[45%] h-auto m-auto my-5'>
        <LandpadsChart />
      </div>
    </main>
  )
}
