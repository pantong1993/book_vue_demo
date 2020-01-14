<template>
    <div>
        作者管理
        <el-table :data="authorData" style="width: 100%" stripe border>
            <el-table-column type="index" label="序号" width="50">
            </el-table-column>
            <el-table-column prop="id" label="ID" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column label="操作" align="center" width="200">
                <template slot-scope="scope">
                    <el-button type="warning" size="mini" @click="openUpdate(scope.row)">编辑作者</el-button>
                    <el-button type="danger" size="mini" @click="deleteAuthor(scope.row.id)">删除作者</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-button type="info" size="large" @click="authorDialog = true,isCreate=true">添加作者</el-button>

        <el-dialog :title="isCreate?'新增':'更新'" :visible.sync="authorDialog" width="80%" @close="closeDialog">

            <el-form ref="form" :model="updateAuthorInfo" label-width="80px">
                <el-form-item label="作者名称">
                    <el-input v-model="updateAuthorInfo.name"></el-input>
                </el-form-item>
            </el-form>

            <span>
                <el-button type="primary" @click="authorCommit">确 定</el-button>
                <el-button @click="authorDialog = false">取 消</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "Author",
        data() {
            return {
                authorData: [],
                authorDialog: false,
                updateAuthorInfo: {},
                isCreate: false
            }
        },
        methods: {
            initData() {
                this.$http.authorGetAll().then((ret) => {
                    console.log(ret.data)
                    if (ret.data.code === "1000") {
                        this.authorData = ret.data.data
                    }
                })
            },
            deleteAuthor(id) {
                this.$http.authorDelete(id).then((ret) => {
                    if (ret.data.code === "1000") {
                        console.log("OK");
                        this.initData()
                    }
                })
            },
            openUpdate(data) {
                this.authorDialog = true;
                this.updateAuthorInfo = data
            },
            authorUpdate() {
                let params = {
                    name: this.updateAuthorInfo.name
                }
                this.$http.authorUpdate(this.updateAuthorInfo.id, params).then((ret) => {
                    if (ret.data.code === "1000") {
                        console.log("OK");
                        this.authorDialog = false;

                        this.initData()
                    }
                })
            },
            authorCommit() {
                if (this.isCreate) {
                    this.$http.authorCreate(this.updateAuthorInfo).then((ret) => {
                        if (ret.data.code === "1000") {
                            console.log("OK");
                            this.authorDialog = false;
                            this.initData()
                        }
                    })
                } else {
                    this.authorUpdate()
                }
            },
            closeDialog() {
                this.isCreate = false;
                this.updateAuthorInfo = {}
            }
        },
        created() {
            this.initData()
        }
    }
</script>

<style scoped>

</style>