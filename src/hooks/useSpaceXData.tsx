import { spaceXApiCaller } from '@/services/spaceX'

export default function useSpaceXData({ endpoint, params }: { endpoint: string, params?: Params }) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const getSpaceXData = useCallback(
        async ({ params }: { params: Params | undefined }) => {
            try {
                setLoading(true);
                setError(null);
                const newData = await spaceXApiCaller(endpoint, params);
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
        data, getSpaceXData, loading, error
    }
}