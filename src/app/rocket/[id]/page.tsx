import React from 'react'
import { PageProps } from '../../../../.next/types/app/layout';
import Rocket from './Rocket';
import ParticlesBG from '@/components/ParticlesBackground';

export default function Page({ params }: PageProps) {
    return (
        <div style={{ zIndex: '1' }}>
            <ParticlesBG></ParticlesBG>
            <Rocket Id={params}></Rocket>
        </div>

    )
}
