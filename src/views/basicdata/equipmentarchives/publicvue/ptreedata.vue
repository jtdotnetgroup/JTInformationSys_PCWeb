<template>
    <div>
        
        <a-tree   :treeData="organizations" defaultExpandAll @click="onButtonClick()">
         </a-tree>

    </div>
</template>

<script>

import { GetTreeList } from '@/api/Organization'

    export default {
        data() {
            return {
                 organizations:[]
            }
        },
        mounted:{

        },

        methods: {

            _LoadData(){




            },


            onButtonClick(){
                this.$emit('btnClick');
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>