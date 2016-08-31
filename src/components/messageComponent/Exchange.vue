<template lang="pug">
    //- 兑换 商城 模板
    div.exchange(v-bind:style="content")
        //- img.background-img(v-bind:src="backgroundImg")
        div.background-img
            div(v-for="item in moneyData",v-bind:style="moneyblock")
                img(v-bind:src="moneyBack")
                div.barcontent(v-bind:style="barcontent")
                    img.money-img(v-bind:style="moneyImg",v-bind:src="item.goodsimg")
                    div.bonus-money(v-bind:style="bonusMoney",v-html="item.goodname")
                    img.exchange(v-bind:src="doexchange",v-bind:style="exchangeBtn")
            div.change-button(v-bind:style="buttonBar")
                div.bonus-button
                    img.bonus-button(v-bind:src="bonusButton")
                div.prize-button
                    img.prize-button(v-bind:src="prizeButton")
</template>
<script>
export default {
    ready() {

        },
        props: ['zoomRate'],
        data() {
            return {
                moneyData: require('../../data/money-data.js'),
                backgroundImg: require('../../assets/切图/商城/内底.png'),
                moneyBack: require('../../assets/切图/商城/块.png'),
                bonusButton: require('../../assets/切图/商城/奖金.png'),
                prizeButton: require('../../assets/切图/商城/奖品.png'),
                doexchange: require('../../assets/切图/商城/兑换.png'),
                moneyImg: require('../../assets/切图/商城/金币.png')
            }
        },
        computed: {
            content() {
                return {
                    width: 478 * this.zoomRate.x + 'px',
                    height: 618 * this.zoomRate.y + 'px',
                    margin: 90 * this.zoomRate.y + 'px 0 0 ' + 37 * this.zoomRate.x + 'px'
                }
            },
            moneyblock() {
                return {
                    width: 478 * this.zoomRate.x + 'px',
                    height: 108 * this.zoomRate.y + 'px',
                    margin: '0 0 ' + 16 * this.zoomRate.y + 'px 0'
                }
            },
            buttonBar() {
                return {
                    width: 260 * this.zoomRate.x + 'px',
                    height: 68 * this.zoomRate.y + 'px',
                    margin: 52 * this.zoomRate.y + 'px 0 0 ' + 105 * this.zoomRate.x + 'px'
                }
            },
            barcontent() {
                return {
                    margin: -110 * this.zoomRate.y + 'px 0 0 0'
                }
            },
            bonusMoney() {
                return {
                    width: 150 * this.zoomRate.x + 'px',
                    height: 20 * this.zoomRate.y + 'px',
                    margin: 35 * this.zoomRate.y + 'px 0 0 ' + 151 * this.zoomRate.x + 'px'
                }
            },
            moneyImg() {
                return {
                    width: 116 * this.zoomRate.x + 'px',
                    height: 108 * this.zoomRate.y + 'px',
                    margin: 0 * this.zoomRate.y + 'px 0 0 0px'
                }
            },
            exchangeBtn() {
                return {
                    width: 90 * this.zoomRate.x + 'px',
                    height: 50 * this.zoomRate.y + 'px',
                    margin: 30 * this.zoomRate.y + 'px 0 0 ' + (364) * this.zoomRate.x + 'px'
                }
            }
        },
        methods: {

        }
}
</script>
<style>
div.exchange {
    position: absolute;
}

img.exchange {
    z-index: 3;
}

div.barcontent {
    width: 100%;
    height: 100%;
}

img.money-img {
    position: absolute;
}

div.barcontent div {
    float: left;
}

div.bonus-money {
    position: absolute;
    color: white;
}

.background-img {
    position: absolute;
    width: 100%;
    height: 100%;
}

div.background-img {
    padding: 1%;
}

div.change-button div {
    float: left;
    height: 100%;
    width: 50%;
}
</style>
