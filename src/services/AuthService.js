import axios from '../axios';

const AuthService = {
    login(credentials) {
        return axios.post('/login', credentials);
    },
    logout(token) {
        return axios.post('/logout', {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }
};

export default AuthService;
