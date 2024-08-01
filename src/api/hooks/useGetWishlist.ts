import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { useAPIBaseURL } from "@/provider/APIBaseURL";
import type { ProductData } from "@/types";

import { fetchInstance, queryClient } from "../instance";

interface RequestParams {
    userId?: string;
    page?: number;
    size?: number;
    sort?: string;
}

export interface WishResponseData {
    id: number;
    product: Omit<ProductData, 'categoryId'>;
    createdDate: Date;
    userId: string;
}

export const postWishlistPath = (baseURL?: string) => `${baseURL ?? ''}/api/wishes`;
export const deleteWishlistPath = (wishId: string, baseURL?: string) => `${baseURL ?? ''}/api/wishes/${wishId}`;
export const getWishlistPath = ({userId, page, size, sort}: RequestParams, baseURL?: string) => {
    const params = new URLSearchParams();

    if(userId) params.append('userId', userId);
    if(page) params.append('page', page.toString());
    if(size) params.append('size', size.toString());
    if(sort) params.append('sort', sort);

    if(params.size === 0) return `${baseURL ?? ''}/api/wishes`;

    return `${baseURL ?? ''}/api/wishes?${params.toString()}`;
} 

export const addWishlist = async (productId: number, userId: string, baseURL: string) => {
    try{
        const response = await fetchInstance(baseURL).post(postWishlistPath(), {
            productId,
            userId,
        });
        return !axios.isAxiosError(response);
    } catch (e) {
        console.error(e);
        return false;
    }
}
export const deleteWishlist = async (wishId: string, baseURL: string) => {
    try{
        const response = await fetchInstance(baseURL).delete(deleteWishlistPath(wishId));
        if(axios.isAxiosError(response)) {
            return false;
        }
        queryClient.invalidateQueries({ queryKey: ['wishlist'] });
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

const getWishlist = async (params: RequestParams, baseURL: string) => {
    const response = await fetchInstance(baseURL).get<WishResponseData[]>(getWishlistPath(params));
    return response.data;
}
export const useGetWishlist = (params: RequestParams) => {
    const baseURL = useAPIBaseURL()[0];
    return useQuery({
        queryKey: ['wishlist', params],
        queryFn: () => getWishlist(params, baseURL),
    }) 
}