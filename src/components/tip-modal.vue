<template lang="pug">
	div.tip-content(transition="bounce",v-show="isShow",v-html="content")
</template>
<script>
export default {
    props: [],
    data() {
        return {
            isShow: false,
            content: ''
        }
    },
    methods: {
        showTip(content) {
            this.content = content
            this.isShow = true
            setTimeout(() => this.isShow = false, 3000)
        }
    },
    events: {
        showTip(event) {
            this.showTip(event)
        }
    }
}
</script>
<style>
.tip-content {
    display: table-cell;
    margin: 0% 0 0 30%;
    width: 40%;
    padding: 5px;
    background: rgba(0, 0, 0, .35);
    color: white;
    position: absolute;
    text-align: center;
    border-radius: 1em;
}

.bounce-transition {
    display: inline-block;
    /* 否则 scale 动画不起作用 */
}

.bounce-enter {
    animation: bounce-in .5s;
}

.bounce-leave {
    animation: bounce-out .5s;
}

@keyframes bounce-in {
    0% {
        transform: scale(0);
    }
    100% {
        transform: scale(1);
    }
}

@keyframes bounce-out {
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(0);
    }
}
</style>
