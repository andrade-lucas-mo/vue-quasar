import axios from '../axios';

const DespesasService = {
    getDespesas(token) {
        return axios.get('/despesa', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    },
    createDespesa(despesa, token) {
        return axios.post('/despesa', despesa, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    },
    updateDespesa(despesa, token) {
        return axios.put(`/despesa/${despesa.id}`, despesa, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    },
    deleteDespesa(id, token) {
        return axios.delete(`/despesa/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }
};

export default DespesasService;
