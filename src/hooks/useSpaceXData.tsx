"use client"
import { spaceX } from '@/services/spaceX'
import React, { useState, useCallback, useRef, useEffect } from 'react'

export default function useSpaceXData({ endpoint, params }: { endpoint: string, params?: string | undefined }) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const previousParams = useRef(params);

    const getSpaceXData = useCallback(
        async ({ params }: { params: string | undefined }) => {
            try {
                setLoading(true);
                setError(null);
                previousParams.current = params;
                const newData = await spaceX(endpoint);
                console.log(newData)
                setData(newData);
            }
            catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                }
            }
            finally {
                setLoading(false);
            }
        }
        ,
        [],
    )

    // Fetch data from SpaceX API when component mounts
    useEffect(() => {
        getSpaceXData({ params });
    }, [getSpaceXData, params]);

    return {
        data, getSpaceXData, loading
    }
}