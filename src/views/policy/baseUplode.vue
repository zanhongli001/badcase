<template>
	<div>
		<h2>新建底库数据</h2>
		<el-form ref="form" :model="form" :rules="rules" label-width="100px">
			<el-form-item label="数据类型" prop="type">
				<el-select v-model="form.type" placeholder="请选择">
					<el-option
						v-for="(item, key) in typeOptions"
						:key="key"
						:label="item.label"
						:value="item.value"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="数据描述" prop="desc">
				<el-input type="textarea" v-model="form.desc" style="width: 400px"></el-input>
			</el-form-item>
			<el-form-item label="数据分类" prop="cate">
				<el-cascader
					v-model="form.cate"
					:options="cateOptions"
					clearable
					placeholder="请选择"
					@change="cateChange"
					:props="{
						label: 'name',
						value: 'name',
						children: 'members',
					}"
				></el-cascader>
			</el-form-item>
			<el-form-item label="人名" prop="person">
				<el-input
					placeholder="请输入人名"
					v-model="form.person"
					style="width: 200px; margin-right: 15px"
				></el-input>
				<el-button @click="dialogVisible = true">人脸排重</el-button>
			</el-form-item>
			<el-form-item label="选择文件">
				<upload-img action="/v1_badcase/policy/file/" @change="uploadChange"></upload-img>
			</el-form-item>
			<el-form-item>
				<el-button class="opt-btn" @click="backToList">取消</el-button>
				<el-button class="opt-btn" type="primary" @click="handleSubmit('form')">提交</el-button>
			</el-form-item>
		</el-form>
		<!-- 弹框 -->
		<el-dialog
			title="查询底库数据"
			:visible.sync="dialogVisible"
			width="80%"
			:before-close="handleClose"
		>
			<face-repeat></face-repeat>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
	import faceRepeat from './faceRepeat.vue';
	import uploadImg from '@/components/Upload';

	import { addPol, getPolify } from '@/api/api.js';
	import { typeList } from '@/api/common.js';
	export default {
		components: { faceRepeat, uploadImg },
		data() {
			return {
				dialogVisible: false,
				form: {
					type: '',
					desc: '',
					person: '',
					cate: '', // 二级分类的name
					file: [],
					files: [],
					username: 'admin',
				},
				cateOptions: [],
				typeOptions: [],
				rules: {
					type: [{ required: true, message: '请选择数据类型', trigger: 'change' }],
					desc: [{ required: true, message: '请输入描述', trigger: 'blur' }],
					cate: [{ required: true, message: '请选择数据分类', trigger: 'change' }],
					person: [{ required: true, message: '请输入人名', trigger: 'blur' }],
				},
			};
		},
		methods: {
			uploadChange(list) {
				this.form.file = list.map((item) => item.id);
				this.form.files = list.map((item) => item.file);
			},
			// 提交
			handleSubmit(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						console.log('this.form', this.form);
						let result = await addPol(this.form);
						if (result.status === 201) {
							this.$message.success('成功');
						}
					} else {
						this.$message.error('请完善表单');
						return false;
					}
				});
			},
			cateChange(list) {
				this.form.cate = list[1];
			},
			async getCateOption() {
				let result = await getPolify();
				this.cateOptions = [result['1']];
			},
			async getTypeList() {
				let result = await typeList();
				result = result.map((item) => {
					return {
						label: item[1],
						value: item[0],
					};
				});
				this.typeOptions = result;
			},
			backToList() {
				this.$router.push({ name: 'policy' });
			},

			// 弹框
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then((_) => {
						done();
					})
					.catch((_) => {});
			},
		},
		created() {
			this.getCateOption();
			this.getTypeList();
		},
	};
</script>
<style scoped lang="scss">
	.opt-btn {
		width: 120px;
		&:first-child {
			margin-right: 20px;
		}
	}
	.addTitle {
		margin-bottom: 20px;
	}
	.pagination {
		text-align: right;
	}

	.el-upload--picture-card {
		width: 90px;
		height: 50px;
		position: relative;
	}
	.el-upload-list--picture-card .el-upload-list__item {
		width: 90px;
		height: 50px;
	}
	.upImg {
		width: 90px;
		height: 50px;
	}
	.el-icon-plus {
		text-align: center;
		vertical-align: middle;
		position: absolute;
		left: 33%;
		top: 26%;
	}
</style>