<template lang="pug">
    //- 选择下注部分
    div.multiple
        div.bet-button-area.one
            div.table-cell
                a.button 1X
        div.bet-button-area.five
            div.table-cell
                a.button 5X
        div.bet-button-area.ten
            div.table-cell
                a.button 10X
</template>
<script>
export default {
    data() {
        return {}
    }
}
</script>
<style>
.multiple {
    background: rgba(255, 0, 0, 0.6);
    height: 12%;
}

div.bet-button-area {
    display: table;
    float: left;
    width: 33%;
    height: 100%;
}

div.ten {
    width: 34%;
}

a.button {
    /*width: 100%;*/
    /*height: 50%;*/
    font-size: 2em;
    /*background: #CCC;*/
    background-image: -webkit-linear-gradient(315deg, #feae3d, #ef8b11);
    padding: .1em 1em;
    border-radius: 1em;
}
</style>
