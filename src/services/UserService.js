import axios from '../axios';

const UserService = {
    register(user) {
        return axios.post('/register', user);
    }
};

export default UserService;
