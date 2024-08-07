import { useQuery } from "@tanstack/react-query";
import { getUserAuthenticated } from "../api/AuthAPI";

export const useAuth = () => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: getUserAuthenticated,
        retry: 1,
        refetchOnWindowFocus: false
    })
    return {data, isError, isLoading}
}