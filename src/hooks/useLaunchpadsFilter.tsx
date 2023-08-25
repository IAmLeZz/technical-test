import React, { ChangeEvent, useState } from 'react'

export default function useLaunchpadsFilter({ launchpads }: { launchpads: LaunchPad[] }) {

    const [filter, setFilter] = useState({
        status: '',
        locality: '',
        region: '',
        rocket: '',
    })

    const handleFilter = (event: ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault()
        const { name, value } = event.target
        setFilter((prevFilter) => ({
            ...prevFilter,
            [name]: value,
        }))
    }

    // Filter launchpads data based on filter state
    const filteredLaunchpads = launchpads?.filter((launchpad) => {
        return (
            (filter.status === '' || filter.status === launchpad.status) &&
            (filter.locality === '' ||
                filter.locality.toUpperCase() === launchpad.locality.toUpperCase()) &&
            (filter.region === '' ||
                filter.region.toUpperCase() === launchpad.region.toUpperCase()) &&
            (filter.rocket === '' ||
                launchpad.rockets.some((rocket) => rocket === filter.rocket))
        )
    })
    const statuses = Array.from(
        new Set(launchpads.map(launchpad => launchpad.status))
    )

    const localities = Array.from(
        new Set(launchpads.map((launchpad) => launchpad.locality))
    )
    const regions = Array.from(
        new Set(launchpads.map((launchpad) => launchpad.region))
    )
    const rockets = Array.from(
        new Set(launchpads.flatMap((launchpad) => launchpad.rockets))
    )

    // Map values to options for select elements
    const statusOptions = statuses.map((status) => ({
        value: status,
        label: status.charAt(0).toUpperCase() + status.slice(1),
    }))

    const localityOptions = localities.map((locality) => ({
        value: locality,
        label: locality,
    }))
    const regionOptions = regions.map((region) => ({
        value: region,
        label: region,
    }))
    const rocketOptions = rockets.map((rocket) => ({
        value: rocket,
        label: rocket,
    }))

    return { statusOptions, localityOptions, regionOptions, rocketOptions, handleFilter, filteredLaunchpads }
}
