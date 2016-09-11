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
    background: url('./../assets/修改切图/背景图.png');
    background-size: cover;
    background-repeat: no-repeat;
}

div.up-background {
    /*position: absolute;*/
    z-index: -1;
    height: 85%;
    width: 100%;
    border-bottom: 2px rgba(255, 255, 255, .3) solid;
    background: url('./../assets/修改切图/背景图.png');
    background-size: cover;
    background-repeat: no-repeat;
}

div.buttom-background {
    /*position: absolute;*/
    z-index: -1;
    height: 15%;
    width: 100%;
    /*background: white;*/
    background: url('./../assets/修改切图/底栏.png');
    background-size: cover;
    background-repeat: no-repeat;
}
</style>
