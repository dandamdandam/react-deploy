import { useQuery } from "@tanstack/react-query";

import { useAPIBaseURL } from "@/provider/APIBaseURL";

import { fetchInstance } from "../instance";

export const getPointPath = (baseURL?: string) => `${baseURL ?? ''}/api/point`;

export interface PointData {
    point: number;
}

export const useGetPoint = () => {
    const baseURL = useAPIBaseURL()[0];
    return useQuery({
        queryKey: ['point'],
        queryFn: async () => {
            const response = await fetchInstance(baseURL).get<PointData>(getPointPath());
            return response.data.point;
        }
    })    
}