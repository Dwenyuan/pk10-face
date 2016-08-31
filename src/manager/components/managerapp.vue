<template lang="pug">
	div.row
		div.col-xs-12
			h1.text-center 后台管理
	div.row
		div.col-xs-12
			div.col-xs-2
				div.list-group
					div.list-group-item.btn.btn-default(v-link="{path:'/goodmanager'}") 系统设置
					div.list-group-item.btn.btn-default(v-link="{path:'/usermanager'}") 用户管理
					div.list-group-item.btn.btn-default(v-link="{path:'/goodmanager'}") 商品管理
					div.list-group-item.btn.btn-default(v-link="{path:'/goodmanager'}") 代理商管理
					div.list-group-item.btn.btn-default(v-link="{path:'/goodmanager'}") 开奖记录
			router-view
</template>
<script>
export default {
    data() {
        return {}
    }
}
</script>
