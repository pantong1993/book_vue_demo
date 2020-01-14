<template>
    <div id="app">

        <div>
            <el-menu :default-active="this.$route.path" class="el-menu-demo" mode="horizontal" router>
                <el-menu-item index="/book">图书管理</el-menu-item>
                <el-menu-item index="/author">作者管理</el-menu-item>
                <el-menu-item index="/publisher">出版社管理</el-menu-item>
            </el-menu>
            <router-view></router-view>
        </div>

    </div>
</template>

<script>
    // import Home from "./components/Home";

    export default {
        name: 'app',
        components: {
            // Home
        }
    }
</script>

<style>

</style>
