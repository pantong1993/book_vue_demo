<template>
    <div>
        图书管理

        <el-table :data="bookData" style="width: 100%" stripe border>
            <el-table-column type="index" label="序号" width="50">
            </el-table-column>
            <el-table-column prop="id" label="ID" width="180">
            </el-table-column>
            <el-table-column prop="title" label="书名" width="180">
            </el-table-column>

            <el-table-column label="出版社" align="center" width="200">
                <template slot-scope="scope">
                    {{scope.row.publisher.name}}
                </template>
            </el-table-column>

            <el-table-column label="作者" align="center" width="200">
                <template slot-scope="scope">
                    <span v-for="(info,index) in scope.row.authors" :key="index">{{info.name}},</span>
                </template>
            </el-table-column>

            <el-table-column label="操作" align="center" width="200">
                <template slot-scope="scope">
                    <el-button type="warning" size="mini" @click="openUpdate(scope.row)">编辑图书</el-button>
                    <el-button type="danger" size="mini" @click="deleteBook(scope.row.id)">删除图书</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-button type="info" size="large" @click="bookDialog = true,isCreate=true">添加图书</el-button>

        <el-dialog :title="isCreate?'新增':'更新'" :visible.sync="bookDialog" width="80%" @close="closeDialog">

            <el-form ref="form" :model="bookForm" label-width="80px">
                <el-form-item label="书名">
                    <el-input v-model="bookForm.title"></el-input>
                </el-form-item>

                <el-form-item label="出版社">
                    <el-select v-model="bookForm.publisher_id" placeholder="请选择出版社">
                        <el-option v-for="(info,index) in publisherList" :key="index" :label="info.name"
                                   :value="info.id"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="出版社">
                    <el-select v-model="bookForm.author_list" placeholder="请选择作者" multiple>
                        <el-option v-for="(info,index) in authorList" :key="index" :label="info.name"
                                   :value="info.id"></el-option>
                    </el-select>
                </el-form-item>

            </el-form>

            <span>
                <el-button type="primary" @click="bookCommit">确 定</el-button>
                <el-button @click="bookDialog = false">取 消</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "Book",
        data() {
            return {
                bookData: [],
                bookDialog: false,
                bookForm: {},
                isCreate: false,
                publisherList: [],
                authorList: [],
            }
        },
        methods: {
            initData() {
                this.$http.bookGetAll().then((ret) => {
                    if (ret.data.code === "1000") {
                        this.bookData = ret.data.data
                    }
                })
                this.$http.authorGetAll().then((ret) => {
                    if (ret.data.code === "1000") {
                        this.authorList = ret.data.data
                    }
                })
                this.$http.publisherGetAll().then((ret) => {
                    if (ret.data.code === "1000") {
                        this.publisherList = ret.data.data
                    }
                })
            },
            closeDialog() {
                this.bookForm = {}
                this.isCreate = false
            },
            bookCommit() {
                if (this.isCreate) {
                    this.$http.bookCreate(this.bookForm).then((ret) => {
                        if (ret.data.code === "1000") {
                            this.bookDialog = false
                            this.initData()
                        }
                    })
                }else {
                    this.$http.bookUpdate(this.bookForm.id, this.bookForm).then((ret) => {
                        if (ret.data.code === "1000") {
                            this.bookDialog = false
                            this.initData()
                        }
                    })
                }

            },
            openUpdate(data) {
                this.bookDialog = true
                let author_list = []
                for (let i=0;i<data.authors.length;i++) {
                    console.log(data.authors[i]);
                    author_list.push(data.authors[i].id)
                }
                console.log(author_list)
                this.bookForm = {
                    id: data.id,
                    title: data.title,
                    publisher_id: data.publisher.id,
                    author_list: author_list
                }
            },
            deleteBook(id){
                this.$http.bookDelete(id).then((ret)=>{
                    if (ret.data.code === "1000"){
                        console.log("删除图书成功")
                        this.initData()
                    }
                })
            }
        },
        created() {
            this.initData()
        }
    }
</script>

<style scoped>

</style>