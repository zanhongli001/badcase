<template>
	<div class="m-upload-wrapper">
		<el-upload
			:action="action"
			:multiple="multiple"
			:accept="accept"
			:limit="limit"
			:maxSize="maxSize"
			list-type="picture-card"
			:on-preview="handlePreview"
			:on-remove="handleRemove"
			:on-success="handleSuccess"
			:before-upload="beforeUpload"
		>
			<i class="el-icon-plus"></i>
		</el-upload>
		<el-dialog :visible.sync="previewVisible">
			<img width="100%" :src="imageUrl" alt="" />
		</el-dialog>
	</div>
</template>
<script>
	export default {
		name: 'upload',
		props: {
			action: {
				type: String,
				required: true,
			},
			multiple: {
				type: Boolean,
				default: true,
			},
			accept: {
				type: String,
				default: 'image/*',
			},
			limit: {
				type: Number,
				default: 50,
			},
			maxSize: {
				type: Number,
				default: 100,
			},
		},
		data() {
			return {
				previewVisible: false,
				imageUrl: '',
			};
		},
		methods: {
			handleRemove(file, fileList) {},
			handlePreview(file) {
				this.imageUrl = file.url;
				this.previewVisible = true;
			},
			handleSuccess(response, file, fileList) {
				let list = fileList.map((item) => {
					return item.response || {};
				});
				this.$emit('change', list);
			},
			beforeUpload(file, fileList) {},
			checkType(file) {},
			checkSize(file) {},
		},
	};
</script>
<style lang="scss" scoped>
</style>
