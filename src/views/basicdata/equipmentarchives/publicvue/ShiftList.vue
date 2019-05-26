<template>
    <a-modal :visible="visible" title="班次信息" @cancel="onClose">
        <Buttons :search="false"/>
        <a-table :dataSource="tableData" :columns="columns"></a-table>
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
                tableData:[]
            }
        },
        methods: {
            show(EquipmentID) {
                this.visible=true;
                this.EquipmentID=EquipmentID
            },
            onClose(){
                this.visible=false;
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>