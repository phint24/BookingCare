import axios from 'axios';

// Tạo instance của axios với các cấu hình mặc định
const instance = axios.create({
    baseURL: 'http://localhost:5000',  // URL của backend API
    timeout: 10000,  // Timeout request
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add interceptor để xử lý request trước khi gửi đi
instance.interceptors.request.use(
    (config) => {
        // Lấy token từ localStorage (nếu có authentication)
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add interceptor để xử lý response trước khi trả về
instance.interceptors.response.use(
    (response) => {
        // Trả về dữ liệu response
        return response.data;
    },
    (error) => {
        // Xử lý các lỗi response
        if (error.response) {
            // Lỗi từ server (status code không phải 2xx)
            switch (error.response.status) {
                case 401:
                    // Xử lý lỗi unauthorized
                    localStorage.removeItem('token');
                    // Có thể redirect về trang login
                    break;
                case 403:
                    // Xử lý lỗi forbidden
                    break;
                case 404:
                    // Xử lý lỗi not found
                    break;
                default:
                    // Xử lý các lỗi khác
                    break;
            }
        } else if (error.request) {
            // Lỗi không nhận được response
            console.error('No response received:', error.request);
        } else {
            // Lỗi khi setup request
            console.error('Error setting up request:', error.message);
        }
        return Promise.reject(error);
    }
);

export default instance;
