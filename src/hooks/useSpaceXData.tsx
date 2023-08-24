import { spaceXApiCaller } from '@/services/spaceX'
import { useState, useCallback, useEffect } from 'react'

export default function useSpaceXData<T extends ApiEndpoints>({ endpoint, params }: { endpoint: T, params?: Params }) {
    const [data, setData] = useState<ApiResponse<T> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getSpaceXData = useCallback(
        async ({ params }: { params: Params | undefined }) => {
            try {
                setLoading(true);
                setError(null);
                const newData = await spaceXApiCaller(endpoint, params);
                setData(newData);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                }
            } finally {
                setLoading(false);
            }
        },
        [],
    );

    useEffect(() => {
        getSpaceXData({ params });
    }, [getSpaceXData, params]);

    return {
        data, getSpaceXData, loading, error
    };
}