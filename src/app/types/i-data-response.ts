import { Data } from '../types/i-data-model';

export interface DataResponse {
    totalCount: number;
    data: Data[]; 
}