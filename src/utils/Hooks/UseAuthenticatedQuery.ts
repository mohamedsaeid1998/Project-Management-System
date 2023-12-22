import { useQuery } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios"


interface IAuthenticatedQuery {
  queryKey: string[],
  url: string,
  data?: any;
  config?: AxiosRequestConfig
}


const UseAuthenticatedQuery = ({ queryKey, url, config }: IAuthenticatedQuery) => {

  return useQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await axios.get(url, config)
      return data
    }
  })
}

export default UseAuthenticatedQuery