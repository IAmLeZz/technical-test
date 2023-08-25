"use client"

import useSpaceXData from '@/hooks/useSpaceXData';
import React, { useEffect, useState } from 'react';
import { FaTwitter, FaFlickr, FaGlobe } from 'react-icons/fa';
import './Company.css'

function SpaceXCard() {
  const [company, setCompany] = useState<SpaceXInfo>({
    'name': 'SpaceX',
    'ceo': 'Elon Musk',
    'summary': 'SpaceX designs, manufactures, and launches advanced rockets and spacecraft. They also  test and  deploy  these  rockets and spacecraft.',
    'launch_sites': 1,
    'employees': 12000,
    'coo': '',
    'cto': '',
    'valuation': 140000000,
    'headquarters': {
      'address': '',
      'city': '',
      'state': ''
    },
    'founded': 2002,
    'test_sites': 1,
    'vehicles': 1,
    'founder': 'Elon Musk',
    'cto_propulsion': '',
    'id': '0',
    'links': {
      website: 'https://www.spacex.com/',
      twitter: 'https://twitter.com/spacex',
      flickr: 'https://www.flickr.com/photos/spacex/',
      elon_twitter: 'https://twitter.com/elonmusk',
      webcast: '',
      youtube_id: '',
      article: '',
      presskit: '',
      wikipedia: '',
      'reddit': {
        campaign: '',
        media: '',
        launch: '',
        recovery: ''
      },
      'patch': {
        small: '',
        large: '',
      }
    }
  });

  const { data: companyData, error, loading } = useSpaceXData({ endpoint: 'v4/company' })
  useEffect(() => {
    async function updateCompanyData() {
      if (companyData) {
        setCompany(companyData)
      } else {
        error
      }
    }
    updateCompanyData()
  }, [companyData, error])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="max-w-2xl mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden py-4 mt-5 opacity-0 slide-in">
      <div className="flex items-center justify-center px-6 py-4">
        <h1 className='text-[40px] text-center font-bold company-text text-gray-950'>spaceX</h1>
      </div>
      <div className="px-6 py-4">
        <p className="text-gray-600 text-sm">{company?.summary}</p>
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-gray-800">Details</h2>
          <ul className="mt-2 text-gray-600 text-sm">
            <li>
              <strong>Founder:</strong> {company?.founder}
            </li>
            <li>
              <strong>Founded:</strong> {company?.founded}
            </li>
            <li>
              <strong>Employees:</strong> {company?.employees}
            </li>
            <li>
              <strong>Vehicles:</strong> {company?.vehicles}
            </li>
            <li>
              <strong>Launch sites:</strong> {company?.launch_sites}
            </li>
            <li>
              <strong>Test sites:</strong> {company?.test_sites}
            </li>
            <li>
              <strong>CEO:</strong> {company?.ceo}
            </li>
            <li>
              <strong>CTO:</strong> {company?.cto}
            </li>
            <li>
              <strong>COO:</strong> {company?.coo}
            </li>
            <li>
              <strong>CTO of propulsion:</strong> {company?.cto_propulsion}
            </li>
            <li>
              <strong>Valuation:</strong> ${company.valuation.toLocaleString()}
            </li>
          </ul>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-gray-800">Headquarters</h2>
          <p className="mt-2 text-gray-600 text-sm">
            {company?.headquarters.address}, {company?.headquarters.city}, {company?.headquarters.state}
          </p>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-gray-800">Links</h2>
          <div className="mt-2 flex items-center space-x-4 text-gray-600 text-sm">
            {/* Website link */}
            <a href={company?.links.website} target="_blank" rel="noreferrer">
              <FaGlobe className="w-5 h-5" />
            </a>

            {/* Flickr link */}
            <a href={company?.links.flickr} target="_blank" rel="noreferrer">
              <FaFlickr className="w-5 h-5" />
            </a>

            {/* Twitter link */}
            <a href={company?.links.twitter} target="_blank" rel="noreferrer">
              <FaTwitter className="w-5 h-5" />
            </a>

            {/* Elon Musk's Twitter link */}
            <a href={company?.links.elon_twitter} target="_blank" rel="noreferrer">
              @elonmusk
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpaceXCard;