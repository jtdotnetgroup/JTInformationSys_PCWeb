<template>
    <a-modal :visible="visible" title="班次信息" @cancel="onClose">
        <Buttons :search="false" @btnClick="handelBtnClick"/>
        <a-table :dataSource="tableData" :columns="columns">
            <template  slot="employeeID">
                <a-select >
                  <a-select-option v-for="(item) in workers" :key="item.EquipmentID" :value="item.EquipmentID">{{item.FName}}</a-select-option>
                </a-select>
            </template>
        </a-table>
    </a-modal>
</template>

<script>
import {columnShift} from '../js/columns'
    export default {
        components: {
            Buttons:()=>import('@/JtComponents/TableOperatorButton'),
        },
        data() {
            return {
                visible: false,
                columns:columnShift,
                EquipmentID:0,
                tableData:[],
                workers:this.$store.getters.workers
            }
        },
        methods: {
            show(EquipmentID) {
                this.visible=true;
                this.EquipmentID=EquipmentID
            },
            onClose(){
                this.visible=false;
            },
            handelBtnClick(val){

            }
        },
    }
</script>

<style lang="scss" scoped>

</style>