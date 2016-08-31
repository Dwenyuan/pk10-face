<template lang="pug">
    div.background
    	div.up-background
    	div.buttom-background
</template>
<style>
.background {
    position: absolute;
    z-index: -1;
    height: 100%;
    width: 100%;
    background: url(../assets/切图/主界面/BG.png);
    background-size: cover;
    background-repeat: no-repeat;
}

div.up-background {
    /*position: absolute;*/
    z-index: -1;
    height: 89%;
    width: 100%;
    border-bottom: 2px rgba(255, 255, 255, .3) solid;
    background: url(../assets/切图/主界面/dock.png);
    background-size: cover;
    background-repeat: no-repeat;
}

div.buttom-background {
    /*position: absolute;*/
    z-index: -1;
    height: 11%;
    width: 100%;
    /*background: white;*/
    background-size: cover;
    background-repeat: no-repeat;
}
</style>
