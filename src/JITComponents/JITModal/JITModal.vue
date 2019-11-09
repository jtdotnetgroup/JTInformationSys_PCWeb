<template>
    <a-modal :visible="show" :title="title">
        <slot />
    </a-modal>
</template>

<script>
    export default {
        name:'JITModal',
        data() {
            return {
                show: false
            }
        },
        props: {
            title: {
                type: String,
                default:()=>{
                    return ""
                }
            },
        },
    }
</script>

<style lang="scss" scoped>

</style>