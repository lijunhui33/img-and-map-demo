<template>
    <div class="edit-img-right">
        <Button @click="moveUp">上移</Button>
        <Button @click="moveDown">下移</Button>
        <div
            class="list"
            v-for="(item, index) in list"
            :key="`editRightList${index}`"
        >
            <div class="title">{{ item.title }}</div>
            <Input
                v-model="item.val"
                v-if="item.type == 'input'"
                @on-change="
                    (val) => {
                        valChange(val, item);
                    }
                "
            ></Input>
            <InputNumber
                v-model="item.val"
                v-if="item.type == 'numberInput'"
                @on-change="
                    (val) => {
                        valChange(val, item);
                    }
                "
            ></InputNumber>
            <ColorPicker
                v-model="item.val"
                v-if="item.type == 'colorPicker'"
                alpha
                @on-change="
                    (val) => {
                        valChange(val, item);
                    }
                "
            />
            <Slider
                v-model="item.val"
                v-if="item.type == 'slider'"
                alpha
                style="margin: 0 20px 0 0px"
                show-input
                @on-change="
                    (val) => {
                        valChange(val, item);
                    }
                "
            />
            <ColorPicker
                v-model="item.val"
                v-if="item.type == 'setIconColor'"
                @on-change="
                    (val) => {
                        setIconColor(val, item);
                    }
                "
            />
        </div>
        <Button @click="deleteDom">删除</Button>
    </div>
</template>

<script>
import imgEditForm from "./imgEditForm.js";
export default {
    data() {
        return {
            list: [
                // {
                //     type: "input",
                //     val: 1,
                //     title: "标题",
                // },
            ],
            id: "",
        };
    },
    methods: {
        deleteDom() {
            this.$emit("deleteDom", this.val.id);
        },
        moveUp() {
            console.log("点击上移");
            console.log(this.val);
            if (!this.val) return;
            this.$emit("setZIndex", {
                id: this.val.id,
                type: "up",
            });
        },
        moveDown() {
            console.log("点击下移");
            console.log(this.val);
            if (!this.val) return;
            this.$emit("setZIndex", {
                id: this.val.id,
                type: "down",
            });
        },
        // 点击画布中间的内容后，初始化编辑栏
        initData(val) {
            this.list = [];
            this.id = val.id;
            this.val = val;
            console.log(val, 84);
            Object.keys(imgEditForm[val.type]).forEach((key) => {
                this.list.push({
                    type: imgEditForm[val.type][key],
                    val: val[key],
                    title: imgEditForm.DESC[key],
                    valType: key,
                });
            });
            // 如果该图标是矢量图，新增一个修改其矢量颜色的功能选项
            if (val.isIcon) {
                this.list.push({
                    type: "setIconColor",
                    val: "",
                    title: "修改矢量图颜色",
                    valType: "setIconColor",
                });
            }
        },
        // 值改变
        valChange(val, item) {
            this.$emit("itemChange", {
                id: this.id,
                ...item,
            });
        },
        setIconColor(val, item) {
            console.log(val);
            // 将获取的颜色转为数组输出
            const hex2Rgb = (bgColor) => {
                let color = bgColor.slice(1); // 去掉'#'号
                let rgb = [
                    parseInt("0x" + color.slice(0, 2)),
                    parseInt("0x" + color.slice(2, 4)),
                    parseInt("0x" + color.slice(4, 6)),
                ];
                console.log(rgb);
                return rgb;
            };
            this.changeImageColor(this.val.src, hex2Rgb(val), (base64) => {
                this.$emit("setIconColor", {
                    base64,
                    id: this.val.id,
                });
            });
            // console.log(val, item);
        },
        /**
         * 将png图片转成目标颜色
         * @param imgUrl 可传入图片URL 或者 Base64
         * @param RGBArr 要换成的目标颜色RGB 数组格式[R,G,B]
         * @param Functon callback回调
         */
        changeImageColor(imgUrl, RGBArr, callback) {
            let image = new Image();
            image.src = imgUrl;
            image.onload = function () {
                let newCanvas = document.createElement("canvas");
                let ctx = newCanvas.getContext("2d");

                newCanvas.width = image.width;
                newCanvas.height = image.height;

                ctx.drawImage(image, 0, 0, image.width, image.height);

                let imageData = ctx.getImageData(
                    0,
                    0,
                    newCanvas.width,
                    newCanvas.height
                );
                //imageData 则为图片内每个像素点的RGB信息
                for (let p = 0; p < imageData.data.length; p += 4) {
                    if (imageData.data[p + 3] !== 0) {
                        //判断当前像素点的A值不为0 (RGBA A为透明度) 则替换成目标颜色
                        imageData.data[p] = RGBArr[0];
                        imageData.data[p + 1] = RGBArr[1];
                        imageData.data[p + 2] = RGBArr[2];
                    }
                }
                ctx.putImageData(imageData, 0, 0);

                const dataUri = newCanvas.toDataURL("image/png");
                // 清除画布
                ctx.clearRect(0, 0, image.width, image.height);
                // 回调
                callback && callback(dataUri);
            };
        },
    },
};
</script>

<style lang="less" scoped>
.edit-img-right {
    width: 100%;
    height: 100%;
    .list {
        padding: 10px;
    }
}
</style>
