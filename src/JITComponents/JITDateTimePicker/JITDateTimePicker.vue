<template>
    <div>
        <a-date-picker v-model="localvalue" @change="handleChange" :format="options.format" :disabled="options.disabled" :showTime="options.showtime"></a-date-picker>
    </div>
</template>

<script>
import moment from 'moment'
    export default {
        name:'JITDateTimePicker',
        data() {
            return {
                localvalue: ''
            }
        },
        props: {
            value: {
                type: String |Date |undefined,
                required:true
            },
            options:{
                type:Object,
                required:true
            }
        },
        methods: {
            handleChange(date,dateStr) {
                this.localvalue=date
                this.$emit('input',dateStr)
            }
        },
        created() {
            this.localvalue=moment(this.value)
        },
    }
</script>

<style lang="scss" scoped>

</style>