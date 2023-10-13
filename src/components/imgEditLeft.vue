<template>
    <div class="edit-img-left-box">
        <div class="left-icon-box">
            <div
                class="left-icon"
                v-for="item in leftIconList"
                :key="item.icon"
                :class="activeType == item.icon ? 'active-color' : ''"
                @click="iconTap(item.icon)"
            >
                <Icon
                    :type="item.icon"
                    style="font-size: 30px"
                    :class="activeType == item.icon ? 'active-icon-color' : ''"
                />
                <div
                    class="icon-text"
                    :class="activeType == item.icon ? 'active-icon-color' : ''"
                >
                    {{ item.text }}
                </div>
            </div>
        </div>
        <div class="left-right-edit">
            <div class="text-box" v-show="activeType == 'md-text'">
                <Button class="add-text-btn" @click="addText"
                    >点击添加文字</Button
                >
            </div>
            <div class="" v-show="activeType == 'md-albums'">
                <div style="padding: 20px">背景颜色：</div>
                <ColorPicker
                    style="margin-left: 20px"
                    v-model="color1"
                    @on-change="colorChange"
                    alpha
                />
            </div>
            <div v-show="activeType == 'ios-image-outline'">
                <img
                    :src="demoSrc"
                    alt=""
                    srcset=""
                    style="width: 100%"
                    @click="addImg(demoSrc)"
                />
                <div class="upload-btn-box">
                    <Button class="upload-icon">上传图标</Button>
                    <input
                        type="file"
                        @input="fileInput"
                        ref="files"
                        accept="image/jpg, image/png"
                        class="upload-btn"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            demoSrc:
                "https://gimg3.baidu.com/search/src=http%3A%2F%2Fpics1.baidu.com%2Ffeed%2F83025aafa40f4bfb34053bdc0866f0fcf6361812.jpeg%40f_auto%3Ftoken%3Dee2d57666cd27c587703661edb6ffc85&refer=http%3A%2F%2Fwww.baidu.com&app=2021&size=f360,240&n=0&g=0n&q=75&fmt=auto?sec=1691514000&t=38ac49f490517a164749a5ed7eecfbc3",
            leftIconList: [
                {
                    icon: "md-chatboxes",
                    type: "",
                    text: "描述",
                },
                {
                    icon: "md-text",
                    type: "",
                    text: "文字",
                },
                {
                    icon: "md-albums",
                    type: "",
                    text: "背景",
                },
                {
                    icon: "ios-image-outline",
                    type: "",
                    text: "素材",
                },
            ],
            activeType: "ios-image-outline",
            color1: "white",
        };
    },
    methods: {
        iconTap(type) {
            this.activeType = type;
        },
        addText() {
            this.$emit("addText");
        },
        addImg(src) {
            this.$emit("addImg", src);
        },
        fileInput() {
            const file = this.$refs.files.files[0];
            const _this = this;
            const imageToBase64 = (file) => {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    // _this.addImg(reader.result);
                    _this.$emit("addIconImg", reader.result);
                };
                reader.onerror = function (error) {
                    console.log("Error: ", error);
                };
            };
            imageToBase64(file);
        },
        colorChange(val) {
            this.$emit("setBgColor", val);
        },
    },
};
</script>

<style scoped>
.edit-img-left-box {
    width: 400px;
    height: 800px;
    /* background: red; */
    display: flex;
}
.left-icon-box {
    width: 60px;
}
.left-icon {
    width: 60px;
    height: 80px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
    border-left: 6px solid white;
    transition: 0.2s;
}
.active-color {
    border-left: 6px solid #2d8cf0;
}
.active-icon-color {
    color: #2d8cf0;
}
.icon-text {
    font-size: 14px;
}
.left-right-edit {
    flex: 1;
    display: flex;
}
.add-text-btn {
    width: 100%;
}
.text-box {
    margin: 20px;
    width: 100%;
}
.upload-btn-box {
    position: relative;
    height: 32px;
}
.upload-icon {
    width: 98%;
    margin-left: 1%;
}
.upload-btn {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 32px;
    opacity: 0;
}
</style>
