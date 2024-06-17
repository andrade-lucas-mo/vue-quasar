<template>
    <q-card>
        <q-dialog :model-value="showModal" @update:model-value="updateShowModal">
            <q-card>
                <q-card-section>
                    <div class="text-h6">{{ novaDespesa.id ? 'Atualizar Despesa' : 'Criar Nova Despesa' }}</div>
                </q-card-section>
                <q-card-section>
                    <q-form @submit.prevent="saveDespesa">
                        <div class="row q-col-gutter-md q-mt-md">
                            <q-input
                                v-model="novaDespesa.valor"
                                type="number"
                                label="Valor"
                                :rules="[val => val > 0 || 'Valor deve ser positivo']"
                                required
                            />
                        </div>
                        <div class="row q-col-gutter-md q-mt-md">
                            <q-input
                                v-model="novaDespesa.descricao"
                                label="Descrição"
                                maxlength="191"
                                :rules="[val => !!val || 'Descrição é obrigatória', val => val.length <= 191 || 'Descrição deve conter menos de 191 caracteres']"
                                required
                            />
                        </div>
                        <div class="row q-col-gutter-md q-mt-md">
                            <q-input
                                v-model="novaDespesa.data"
                                type="date"
                                label="Data"
                                :rules="[val => new Date(val) > new Date() || 'Data deve ser superior a hoje']"
                                required
                            />
                        </div>
                        <div class="row q-col-gutter-md q-mt-md">
                            <div class="col">
                                <q-btn v-if="novaDespesa.id" type="submit" label="Atualizar" color="primary" class="full-width" />
                                <q-btn v-else type="submit" label="Salvar" color="primary" class="full-width" />
                            </div>
                            <div class="col">
                                <q-btn type="button" label="Cancelar" color="secondary" flat @click="closeModal" />
                            </div>
                        </div>
                    </q-form>
                </q-card-section>
            </q-card>
        </q-dialog>
    </q-card>
</template>
  
<script>
export default {
    name: 'ModalDespesa',
    props: {
        showModal: {
            type: Boolean,
            required: true,
            default: false
        },
        despesa: {
            type: Object,
            default: () => ({ valor: '', descricao: '', data: '' })
        }
    },
    data() {
        return {
            novaDespesa: { ...this.despesa }
        };
    },
    watch: {
        despesa(newVal) {
            this.novaDespesa = { ...newVal };
        }
    },
    methods: {
        saveDespesa() {
            this.$emit('save-despesa', { ...this.novaDespesa });
            this.closeModal();
        },
        closeModal() {
            this.$emit('update:showModal', false);
            this.$emit('reset-despesa');
        },
        updateShowModal(value) {
            this.$emit('update:showModal', value);
            if (!value) {
                this.$emit('reset-despesa');
            }
        }
    }
};
</script>
  