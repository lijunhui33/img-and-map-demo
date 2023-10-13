<template>
    <div id="app">
        <ImgEditIndex />
    </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import ImgEditIndex from "./components/ImgEditIndex.vue";

export default {
    name: "App",
    components: {
        ImgEditIndex,
    },
};
function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
var newArr = [1, 2];
swap(newArr, 1, 0);
console.log(newArr);
</script>

<style>
* {
    margin: 0;
    padding: 0;
}
#app {
    /* font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px; */
}
</style>
