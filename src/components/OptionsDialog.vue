<template lang="pug">
    //- 右上侧选项列表
    div.option-list(v-show="isOptionShow",transition="expand",v-bind:style="optionStyle")
        //- img(v-bind:src="menuImg")
        div.pointer
        div.inner-pointer
        div.option-item(v-html="n",v-for="n in gameData.options",@touchend="showMessage($index)",v-bind:style="itemStyle")
</template>
<script>
export default {
    ready() {
            console.log(this.gameData)
        },
        props: ['gameData', 'zoomRate'],
        data() {
            return {
                isOptionShow: false,
                menuImg: require('../assets/切图/主界面/菜单展开.png')
            }
        },
        computed: {
            optionStyle() {
                return {
                    borderRadius: 12 * this.zoomRate.x + 'px'
                }
            },
            itemStyle() {
                return {
                    fontSize: 26 * this.zoomRate.x + 'px'
                }
            }
        },
        methods: {
            showMessage(event) {
                this.isOptionShow = false
                this.$dispatch('showMessage', event)
            }
        },
        events: {
            triggerOption() {
                this.isOptionShow = !this.isOptionShow
            }
        }
}
</script>
<style>
div.pointer {
    height: 0px;
    width: 0px;
    border: 0.5em solid;
    margin-left: 20%;
    margin-top: -1em;
    position: absolute;
    border-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) #fed095 rgba(0, 0, 0, 0);
}


/* 必需 */

.expand-transition {
    transition: all .3s ease;
    /*height: 30px;*/
    /*padding: 10px;*/
    /*background-color: #eee;*/
    overflow: hidden;
}


/* .expand-enter 定义进入的开始状态 */


/* .expand-leave 定义离开的结束状态 */

.expand-enter,
.expand-leave {
    height: 0;
    /*padding: 0 10px;*/
    opacity: 0;
}

div.inner-pointer {
    height: 0px;
    width: 0px;
    border: 0.5em solid;
    margin-left: calc(20% + 0em);
    margin-top: -0.9em;
    position: absolute;
    border-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) #ffa956 rgba(0, 0, 0, 0);
}

div.option-list {
    /*width: 30%;*/
    /*height: 70%;*/
    margin: 13% 0 0 70%;
    text-align: center;
    background: #ffa956;
    border: 0.1em solid #fed095;
}

div.option-item {
    padding: .5em;
    border-bottom: 0.1em solid #e89342;
}
</style>
