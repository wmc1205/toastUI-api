// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com", // Mock API URL
  timeout: 10000, // 요청 타임아웃 (10초)
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    // 요청 전 Authorization 토큰 추가
    const token = localStorage.getItem("authToken"); // 로컬스토리지에서 토큰 가져오기
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API 호출 중 오류 발생:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;