<template>
    <div>
        <h4 style="color: red;">Child</h4>
        <p>{{ value }}</p>
        <button @click="fun">触发自定义事件</button>
    </div>

</template>

<script>
export default {
    name: "Child",
    props: ["value"],
    mounted() {
        console.log(this)
    },
    methods: {
        fun(){
            this.$emit('input',20)
        }
    },
}
</script>