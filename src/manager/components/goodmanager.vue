<template lang="pug">
	div.col-xs-10
		div.panel.panel-info
			div.panel-heading 商品管理
			div.panel-body
				div.row
					div.col-xs-6
						a.btn.btn-default(@click="addGoods") 增加商品 
							span.glyphicon.glyphicon-plus
					div.col-xs-6
						div.input-group.pull-right
							input.form-control(placeholder="搜索商品",v-model="searchname")
							span.input-group-addon
								span.glyphicon.glyphicon-search
				div.row
					div.col-xs-12
						table.table
							thead
								tr
									td 序号
									td 商品名称
									td 价格
									td 图片
									td 剩余数量
									td
							tbody
								tr(v-for="goods in goodsList | filterBy searchname in 'goodname'| limitBy pagenum pageindex*pagenum ",track-by="$index")
									td(v-html="$index+1")
									td(v-html="goods.goodname")
									td(v-html="goods.price")
									td
										img(v-bind:src="goods.goodsimg",alt=".")
									td(v-html="goods.goodsnum")
									td
										a.btn.btn-default(@click="showSetMoney(goods)",data-toggle="modal",data-target="#myModal") 设置商品
									td
										a.btn.btn-default 删除 
			div.panel-footer
				div.btn-toolbar(role="toolbar" aria-label="...")
					div.btn-group
						a.btn.pagebtn(v-for="1 in (goodsList.length/pagenum)",v-html="$index+1",@click="changePage(event,$index)")
	div#mymodel.modal.fade(v-el:model)
		div.modal-dialog
			div.modal-content
				div.modal-header
					button.close(data-dismiss="modal",aria-label="Close")
						span(aria-hidden="true") &times;
					h4.modal-title 编辑商品
				div.modal-body
					div.input-group
						span.input-group-addon 商品名称
						input.form-control(v-model="setGoods.goodname")
					div.input-group
						span.input-group-addon 商品价格
						input.form-control(v-model="setGoods.price")
					div.input-group
						span.input-group-addon 剩余数量
						input.form-control(v-model="setGoods.goodsnum")
					div.input-group
						span.input-group-addon 商品图片
						input.form-control#file(style="display:none;",type="file",@change="changeimg")
						label(style="display:initial;",for="file")
							a.thumbnail.goodimg
								img.img(v-bind:src="setGoods.goodsimg" alt="添加图片")
				div.modal-footer
					div.col-xs-6.bg-info
						a.pull-left.alert-link(href="mailto:liushao1990@sina.com?subject='商品保存问题'",v-html="savemsg")
					button.btn.btn-default(data-dismiss="modal") 关闭
					button.btn.btn-primary(@click="updateGoods") 确认修改
</template>
<script>
export default {
    ready() {
            this.$http.get('getAllGoods').then((res) => {
                this.goodsList = res.data
            })
        },
        data() {
            return {
                savemsg: '保存信息',
                setGoods: {},
                searchname: '',
                goodsList: require('../../data/goods'),
                pageindex: 0,
                pagenum: 20
            }
        },
        methods: {
            addGoods() {
                this.setGoods = {
                    id: null,
                    goodname: '',
                    price: 0,
                    goodsimg: require('../../assets/addimg.png'),
                    goodsnum: 0
                }
                $(this.$els.model).modal('show')
            },
            changePage(event, index) {
                console.log(event)
                this.pageindex = index
            },
            changeimg(event) {
                var reader = new FileReader()
                reader.onloadend = (res) => {
                    this.setGoods.goodsimg = res.target.result
                }
                reader.readAsDataURL(event.target.files[0])
            },
            updateGoods() {
                this.$http.post('saveGoods', {
                    id: this.setGoods.id,
                    goodname: this.setGoods.goodname,
                    price: this.setGoods.price,
                    goodsimg: this.setGoods.goodsimg,
                    goodsnum: this.setGoods.goodsnum
                }).then((res) => {
                    if (res.data.errmsg) {
                        this.savemsg = res.data.errmsg
                    } else {
                        this.savemsg = '保存成功'
                        this.goodsList.splice(0, 0, this.setGoods)
                    }
                    $(this.$els.model).modal('hide')
                }, (res) => {
                    this.savemsg = '保存出错，请联系管理员'
                })
            },
            showSetMoney(goods) {
                this.setGoods = goods
                $(this.$els.model).modal('show')
            }
        }
}
</script>
<style>
.img {
    border: 1px solid gray;
    width: 200px;
    height: 200px;
}

.goodimg {
    margin: 0;
}
</style>
