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
