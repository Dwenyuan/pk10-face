<template lang="pug">
    //- 兑换 商城 模板
    img.recharge-record(v-bind:src="recordImg",v-bind:style="recordImgStyle")
    div.recharge(v-bind:style="content")
        div.background-img
            div(v-for="item in moneyData",v-bind:style="moneyblock")
                img(v-bind:src="moneyBack")
                div.barcontent(v-bind:style="barcontent")
                    img.money-img(v-bind:style="moneyImg",v-bind:src="item.goodsimg")
                    div.bonus-money(v-bind:style="item.sub?bonusMoneyHasSub:bonusMoney",v-html="item.goodname")
                        //- 副标题
                    div.bonus-money.bonus-sub(v-if="item.sub",v-bind:style="bonusSub",v-html="item.sub")
                    img.recharge(v-bind:src="dorecharge",v-bind:style="rechargeBtn")
    div.my-money(v-bind:style="footer") 我的金币: {{userinfo.money}}
</template>
<script>
    export default {
        props: ['zoomRate', 'userinfo'],
        ready() {

        },
        data() {
            return {
                moneyData: require('../../data/exchange-data'),
                recordImg: require('../../assets/切图/充值/充值记录按钮.png'),
                moneyBack: require('../../assets/切图/充值/块.png'),
                dorecharge: require('../../assets/切图/充值/充值.png'),
                moneyImg: require('../../assets/切图/商城/金币.png')
            }
        },
        computed: {
            recordImgStyle() {
                return {
                    width: 136 * this.zoomRate.x + 'px',
                    height: 50 * this.zoomRate.y + 'px',
                    margin: 28 * this.zoomRate.y + 'px 0 0 ' + 25 * this.zoomRate.x + 'px'
                }
            },
            content() {
                return {
                    width: 495 * this.zoomRate.x + 'px',
                    height: 618 * this.zoomRate.y + 'px',
                    margin: 90 * this.zoomRate.y + 'px 0 0 ' + 25 * this.zoomRate.x + 'px'
                }
            },
            moneyblock() {
                return {
                    width: '100%',
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
                    margin: 37 * this.zoomRate.y + 'px 0 0 ' + 151 * this.zoomRate.x + 'px'
                }
            },
            bonusMoneyHasSub() {
                return {
                    width: 150 * this.zoomRate.x + 'px',
                    height: 20 * this.zoomRate.y + 'px',
                    margin: 32 * this.zoomRate.y + 'px 0 0 ' + 151 * this.zoomRate.x + 'px'
                }
            },
            bonusSub() {
                return {
                    fontSize: 14 * this.zoomRate.x + 'px',
                    padding: 1.5 * this.zoomRate.y + 'px ' + 6 * this.zoomRate.x + 'px',
                    borderRadius: 10 * this.zoomRate.x + 'px',
                    // width: 150 * this.zoomRate.x + 'px',
                    // height: 20 * this.zoomRate.y + 'px',
                    margin: 70 * this.zoomRate.y + 'px 0 0 ' + 151 * this.zoomRate.x + 'px'
                }
            },
            moneyImg() {
                return {
                    width: 116 * this.zoomRate.x + 'px',
                    height: 108 * this.zoomRate.y + 'px',
                    margin: -2 * this.zoomRate.y + 'px 0 0 0px'
                }
            },
            rechargeBtn() {
                return {
                    width: 90 * this.zoomRate.x + 'px',
                    height: 50 * this.zoomRate.y + 'px',
                    margin: 30 * this.zoomRate.y + 'px 0 0 ' + 364 * this.zoomRate.x + 'px'
                }
            },
            footer() {
                return {
                    // width: 136 * this.zoomRate.x + 'px',
                    fontSize: 34 * this.zoomRate.x + 'px',
                    height: 50 * this.zoomRate.y + 'px',
                    margin: 710 * this.zoomRate.y + 'px 0 0 ' + 25 * this.zoomRate.x + 'px'
                }
            }
        },
        methods: {

        }
    }
</script>
<style>
    div.recharge {
        position: absolute;
    }
    
    img.recharge {
        z-index: 3;
    }
    
    div.my-money {
        color: white;
        position: absolute;
    }
    
    img.recharge-record {
        position: absolute;
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
    
    div.bonus-sub {
        background: #f26a30;
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