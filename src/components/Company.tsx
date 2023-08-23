"use client"

import useSpaceXData from '@/hooks/useSpaceXData';
import React, { useEffect, useState } from 'react';
import { FaTwitter, FaFlickr, FaGlobe } from 'react-icons/fa';

function SpaceXCard() {
  const [company, setCompany] = useState<SpaceXInfo>({});
  const { data: companyData, error, loading } = useSpaceXData({ endpoint: 'v4/company' })
  useEffect(() => {
    async function updateCompanyData() {
      setCompany(companyData)
    }
    updateCompanyData()
  }, [companyData])


  // Format the valuation number
  const formatValuation = (num: number) => {
    return num.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
  };

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="max-w-2xl mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden py-4 mt-5">
      <div className="flex items-center justify-center px-6 py-4">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/SpaceX-Logo.svg/1280px-SpaceX-Logo.svg.png"
          alt="SpaceX logo"
          className="h-16 w-auto"
        />
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
              <strong>Valuation:</strong> {formatValuation(company.valuation)}
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