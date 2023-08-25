import React, { ChangeEvent, useState } from 'react'

export default function useLandpadsFilter({ landpads }: { landpads: LandingZone[] }) {

    const [filter, setFilter] = useState({
        status: '',
        type: '',
        locality: '',
        region: '',
    })

    const handleFilter = (event: ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault()
        const { name, value } = event.target
        setFilter((prevFilter) => ({
            ...prevFilter,
            [name]: value,
        }))
    }

    // Filter landpads data based on filter state
    const filteredLandpads = landpads.filter((landpad) => {
        return (
            (filter.status === '' || filter.status === landpad.status) &&
            (filter.type === '' || filter.type === landpad.type) &&
            (filter.locality === '' || filter.locality === landpad.locality) &&
            (filter.region === '' || filter.region === landpad.region)
        )
    })

    const statuses = Array.from(
        new Set(landpads.map(landpad => landpad.status))
    )

    const localities = Array.from(
        new Set(landpads.map(landpad => landpad.locality))
    )
    const types = Array.from(
        new Set(landpads.map(landpad => landpad.type))
    )
    const regions = Array.from(
        new Set(landpads.map(landpad => landpad.region))
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
    const typesOptions = types.map((type) => ({
        value: type,
        label: type,
    }))

    return { statusOptions, localityOptions, regionOptions, typesOptions, handleFilter, filteredLandpads }
}
