import { useHttp } from '~~/utils/request'
// import Http from '@/utils/http'
/**
 *
 */
const request = useHttp()

export const useGetData = (params: any) => {
    return request.post('/api/services/wxapp/lookPointMain/GetLookPointNewsDetail',params)
}
