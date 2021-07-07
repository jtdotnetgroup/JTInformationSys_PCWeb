<template>
    <div>
        <a-checkbox-group @change="handleChange" :defaultValue="defaultValue">
            <a-row>
              <a-col v-for="(item,index) in options.selectlist" :key="index" :span="8">
                  <a-checkbox   :value="item.key">{{item.label}}</a-checkbox>
              </a-col>
            </a-row>
            
        </a-checkbox-group>
    </div>
</template>

<script>
    export default {
        name:'JITMulitpleCheck',
        data() {
            return {
                localvalue: ''
            }
        },
        props: {
            value: {
                type: String|Array|undefined,
                required:true
            },
            options:{
                type:Object,
                required:true
            },
            defaultValue:{
                type: String|Array|undefined
            }
        },
        methods: {
            handleChange(values) {
                console.log(values)
                this.localvalue=values;
                this.$emit('input',this.localvalue)
            }
        },
        created () {
            this.localvalue=this.value;
        },
        watch:{
            value(newval,oldval){
                this.localvalue=newval;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>