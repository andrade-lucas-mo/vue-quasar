<template>
    <q-page class="q-pa-md q-gutter-sm">
        <q-card class="q-pa-lg" >
            <q-card-section>
                <q-list bordered padding class="rounded-borders">
                    <q-item-label header>
                        <div class="row">
                            <div class="col-4">Ações</div>
                            <div class="col-4">Descrição</div>
                            <div class="col-2">Valor</div>
                            <div class="col-2">Data</div>
                        </div>
                    </q-item-label>
                    <q-item v-if="loading" class="q-pa-md">
                        <q-spinner size="30px" color="primary" />
                    </q-item>
                    <q-item v-else v-for="despesa in despesas" :key="despesa.id" clickable>
                        <q-item-section>
                            <div class="row">
                                <div class="col-4">
                                    <q-btn flat icon="edit" @click="editDespesa(despesa)" />
                                    <q-btn flat icon="delete" @click="confirmDelete(despesa)" />
                                </div>
                                <div class="col-4">{{ despesa.descricao }}</div>
                                <div class="col-2">R${{ despesa.valor }}</div>
                                <div class="col-2">{{ formatDate(despesa.data) }}</div>
                                
                            </div>
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-card-section>
        </q-card>
        <q-btn @click="showModal = true" label="Nova Despesa" color="primary" class="q-mt-md" />
            <ModalDespesa
                :showModal="showModal"
                :despesa="selectedDespesa"
                @update:showModal="showModal = $event"
                @save-despesa="saveDespesa"
                @reset-despesa="resetDespesa" 
            />

            <q-dialog v-model="confirmDialog">
                <q-card>
                    <q-card-section class="text-h6">
                        Confirmar Exclusão
                    </q-card-section>
                    <q-card-section>
                        Você tem certeza de que deseja excluir a despesa "{{ selectedDespesa.descricao }}"?
                    </q-card-section>
                    <q-card-actions align="center">
                        <q-btn flat label="Cancelar" color="secondary" v-close-popup />
                        <q-btn flat label="Excluir" color="primary" @click="deleteDespesa" />
                    </q-card-actions>
                </q-card>
            </q-dialog>
        </q-page>
</template>
  
<script>
import DespesasService from '../services/DespesasService';
import ModalDespesa from './ModalDespesa.vue';
  
export default {
    name: 'Despesas',
    components: {
        ModalDespesa
    },
    data() {
        return {
            despesas: [],
            showModal: false,
            confirmDialog: false,
            selectedDespesa: { valor: '', descricao: '', data: ''},
            loading: false
        };
    },
    methods: {
        async fetchDespesas(token){
            this.loading = true;
            try {
                const { data } = await DespesasService.getDespesas(token);
                this.despesas = data.data;
            } catch (e) {
                const errors = e.response.data.errors;
                let errorMessage = '';

                if (Array.isArray(errors)) {
                    errorMessage = errors.map(error => error.message).join('\n');
                } else {
                    errorMessage = Object.values(errors).flat().join('\n');
                }
                this.$q.notify({
                    type: 'negative',
                    message: errorMessage
                });
            } finally {
                this.loading = false;
            }
        },
        async saveDespesa(despesa){
            this.loading = true;
            const token = localStorage.getItem('token');
            try {
                if (despesa.id) {
                    await DespesasService.updateDespesa(despesa, token);
                    this.$q.notify({
                        type: 'positive',
                        message: 'Despesa atualizada com sucesso!'
                    });
                } else {
                    await DespesasService.createDespesa(despesa, token);
                    this.$q.notify({
                        type: 'positive',
                        message: 'Despesa adicionada com sucesso!'
                    });
                }
                await this.fetchDespesas(token);
                this.closeModal();
            } catch (e) {
                const errors = e.response.data.errors;
                let errorMessage = '';

                if (Array.isArray(errors)) {
                    errorMessage = errors.map(error => error.message).join('\n');
                } else {
                    errorMessage = Object.values(errors).flat().join('\n');
                }
                this.$q.notify({
                    type: 'negative',
                    message: errorMessage
                });
            } finally {
                this.loading = false;
            }
        },
        async deleteDespesa() {
            this.loading = true;
            const token = localStorage.getItem('token');
            try {
                await DespesasService.deleteDespesa(this.selectedDespesa.id, token);
                this.$q.notify({
                    type: 'positive',
                    message: 'Despesa excluída com sucesso!'
                });
                this.fetchDespesas(token);
                this.confirmDialog = false;
                this.selectedDespesa = { valor: '', descricao: '', data: '' };
            } catch (e) {
                const errors = e.response.data.errors;
                let errorMessage = '';

                if (Array.isArray(errors)) {
                    errorMessage = errors.map(error => error.message).join('\n');
                } else {
                    errorMessage = Object.values(errors).flat().join('\n');
                }
                this.$q.notify({
                    type: 'negative',
                    message: errorMessage
                });
            } finally {
                this.loading = false;
            }
        },
        newDespesa() {
            this.selectedDespesa = { valor: '', descricao: '', data: '' };
            this.showModal = true;
        },
        editDespesa(despesa) {
            this.selectedDespesa = { ...despesa, data: this.formatDateForInput(despesa.data) };
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        resetDespesa() {
            this.selectedDespesa = { valor: '', descricao: '', data: '' };
        },
        formatDate(date) {
            const d = new Date(date);
            return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
        },
        formatDateForInput(date) {
            const d = new Date(date);
            return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        },
        confirmDelete(despesa) {
            this.selectedDespesa = despesa;
            this.confirmDialog = true;
        },
    },
    created() {
        const token = localStorage.getItem('token');
        if (token) {
            this.fetchDespesas(token)
        }
    }
};
</script>

<style scoped>

.q-list {
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}

.row {
  display: flex;
  align-items: center;
}

.col-2, .col-4, .col-3 {
  flex: 1;
}
</style>