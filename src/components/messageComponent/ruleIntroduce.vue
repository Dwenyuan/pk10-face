<template lang="pug">
	div.introduce(v-bind:style="content",v-html="rule")
</template>
<script>
export default {
    ready() {
            console.log(this.rule)
        },
        props: ['zoomRate'],
        data() {
            return {
                rule: require('./../../data/ruleIntro.html')
            }
        },
        computed: {
            content() {
                return {
                    width: 458 * this.zoomRate.x + 'px',
                    height: 580 * this.zoomRate.y + 'px',
                    margin: 90 * this.zoomRate.y + 'px 0 0 ' + 37 * this.zoomRate.x + 'px'
                }
            }
        }
}
</script>
<style>
div.introduce {
    position: absolute;
    overflow: auto;
    padding: 10px;
}
</style>
