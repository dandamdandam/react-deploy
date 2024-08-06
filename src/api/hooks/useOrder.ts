import axios from "axios";

import type { OrderFormData } from "@/types";

import { fetchInstance } from "../instance";

export const postOrderPath = (baseURL?: string) => `${baseURL ?? ''}/api/order`;

export const addOrder = async (order: OrderFormData, baseURL: string) => {
    try {
        const response = await fetchInstance(baseURL).post(postOrderPath(), order);
        return !axios.isAxiosError(response);
    } catch (e) {
        console.error(e);
        return false;
    }
};