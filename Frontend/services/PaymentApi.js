import axios from "axios"

export const getPayment = async (currentPage,size,token) => {
    let response = await axios.get('http://localhost:8086/paymentapp/getAllPayments',
      {
        params: {
          pageno: currentPage-1,
          pagesize: size,
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    
     )
     return response
}

export const getPaymentFromTo = async (currentPage,size,token,fromdate,todate) => {
  let response = await axios.get(`http://localhost:8086/paymentapp/getAllPayments/${fromdate}/${todate}`,
    {
      params: {
        pageno: currentPage-1,
        pagesize: size,
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  
   )
   return response
}

export const getPaymentFrom= async (currentPage,size,token,fromdate) => {
  let response = await axios.get(`http://localhost:8086/paymentapp/getAllPayments/${fromdate}`,
    {
      params: {
        pageno: currentPage-1,
        pagesize: size,
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  
   )
   return response
}

export const getPaymentTo = async (currentPage,size,token,todate) => {
  let response = await axios.get(`http://localhost:8086/paymentapp/getPayments/${todate}`,
    {
      params: {
        pageno: currentPage-1,
        pagesize: size,
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  
   )
   return response
}