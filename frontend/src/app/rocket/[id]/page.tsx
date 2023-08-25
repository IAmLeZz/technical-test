import React from 'react'
import Rocket from './Rocket';
import ParticlesBG from '@/components/ParticlesBackground';
import { PageProps } from '../../../../.next/types/app/rocket/[id]/page';

export default function Page({ params }: PageProps) {
    return (
        <div style={{ zIndex: '1' }}>
            <ParticlesBG></ParticlesBG>
            <Rocket Id={params}></Rocket>
        </div>

    )
}
