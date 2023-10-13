<template>
    <div
        class="edit-box"
        :style="{
            width: width + 'px',
            height: height + 'px',
        }"
    >
        <!-- <div style="position: absolute">
            {{ list }}
        </div> -->
        <div
            class="img-edit-box"
            id="img-edit-box-container"
            @click="activeId = ''"
            :style="{
                width: width + 'px',
                height: height + 'px',
                'background-color': bgColor,
            }"
            ref="imgEditBox"
        >
            <div
                v-for="item in list"
                :id="item.id"
                :key="item.id"
                :style="{
                    top: item.top + 'px',
                    left: item.left + 'px',
                    'z-index': item.zIndex,
                    backgroundColor: item.backgroundColor,
                    color: item.color,
                    padding: item.padding + 'px',
                    width: item.width ? item.width + 'px' : 'auto',
                    height: item.height ? item.height + 'px' : 'auto',
                    transform: `rotateZ(${(360 / 100) * item.rotateZ}deg)`,
                }"
                class="list-item"
                :class="{ 'active-bd': activeId == item.id }"
            >
                <!-- <Icon
                    type="ios-close-circle"
                    style="color: red"
                    class="list-item-close"
                    v-show="activeId == item.id"
                    @click="deletes(item.id)"
                /> -->
                <span
                    class="point top-left"
                    v-show="activeId == item.id"
                    :id="`${item.id}.top-left`"
                ></span>
                <span
                    class="point top"
                    :id="`${item.id}.top`"
                    v-show="activeId == item.id"
                ></span>
                <span
                    class="point top-right"
                    v-show="activeId == item.id"
                    :id="`${item.id}.top-right`"
                ></span>
                <span
                    class="point right"
                    :id="`${item.id}.right`"
                    v-show="activeId == item.id"
                ></span>
                <span
                    class="point bottom-right"
                    :id="`${item.id}.bottom-right`"
                    v-show="activeId == item.id"
                ></span>
                <span
                    class="point bottom"
                    :id="`${item.id}.bottom`"
                    v-show="activeId == item.id"
                ></span>
                <span
                    class="point bottom-left"
                    v-show="activeId == item.id"
                    :id="`${item.id}.bottom-left`"
                ></span>
                <span
                    class="point left"
                    :id="`${item.id}.left`"
                    v-show="activeId == item.id"
                ></span>
                <div
                    v-if="item.type === 'text'"
                    :contenteditable="item.contenteditable"
                    @click.stop="listItemClickHandler(item.id)"
                    @blur="listDivBlur(item.id)"
                    @dblclick.stop="
                        () => {
                            divDbClickHandler(item.id);
                        }
                    "
                    class="edit-text"
                    :style="{
                        'font-size': item.fontSize + 'px',
                        width: item.width + 'px',
                        height: item.height + 'px',
                    }"
                    :id="`${item.id}edit-text`"
                    @input="contenteditableChange(`${item.id}edit-text`)"
                >
                    {{ item.content }}
                </div>
                <img
                    v-if="item.type == 'img'"
                    :src="item.src"
                    class="edit-img"
                    :style="{
                        width: '100%',
                        height: '100%',
                    }"
                    crossOrigin="anonymous"
                    @click.stop="listItemClickHandler(item.id)"
                />
            </div>
        </div>
    </div>
</template>

<script>
import imgEditData from "./imgEditData";
import html2canvas from "html2canvas";
export default {
    data() {
        return {
            list: [
                // {
                //     id: "drag1",
                //     top: 0,
                //     left: 0,
                // },
                // {
                //     id: "drag2",
                //     top: 50,
                //     left: 50,
                // },
                // {
                //     id: "drag3",
                //     top: 100,
                //     left: 100,
                // },
                // {
                //     backgroundColor: "rgba(0, 0, 0, 0)",
                //     color: "rgba(0,0,0,1)",
                //     content: "双击编辑1",
                //     contenteditable: false,
                //     id: "editCanvas1692077702189",
                //     left: 220,
                //     padding: 0,
                //     top: 237.5,
                //     type: "text",
                //     zIndex: 1,
                // },
                // {
                //     id: "editCanvas1693184972766",
                //     zIndex: 1,
                //     contenteditable: false,
                //     left: 128,
                //     top: 203,
                //     backgroundColor: "rgba(0, 0, 0, 0)",
                //     color: "rgba(0,0,0,1)",
                //     type: "text",
                //     content: "双击3",
                //     padding: 0,
                //     fontSize: 60,
                //     width: 250,
                //     height: 94,
                // },
                // {
                //     id: "editCanvas1693184972786",
                //     zIndex: 1,
                //     contenteditable: false,
                //     left: 0,
                //     top: 203,
                //     backgroundColor: "rgba(0, 0, 0, 0)",
                //     color: "rgba(0,0,33,1)",
                //     type: "text",
                //     content: "双击4",
                //     padding: 0,
                //     fontSize: 20,
                //     height: 94,
                // },
            ],
            activeId: "editCanvas1693184972766",
            width: "500",
            height: "500",
            bgColor: "rgba(255,255,255,0)",
        };
    },
    mounted() {
        this.list.forEach((item) => {
            this.bindDom(item.id);
        });
        // this.bindSetDiv("editCanvas1693184972766");
        // this.bindSetDiv("editCanvas1693184972786");
    },
    beforeDestroy() {
        // console.log("生命周期卸载", this.$refs.imgEditBox.innerHTML);
        if (this.$refs.imgEditBox) {
            this.$refs.imgEditBox.innerHTML = "";
        }
    },
    methods: {
        deleteDom(id) {
            const index = this.list.findIndex((item) => item.id == id);
            this.list.splice(index, 1);
        },
        setZIndex(obj) {
            const { id, type } = obj;
            const index = this.list.findIndex((item) => item.id == id);
            if (index == 0 && this.list.length == 1) {
                this.$Message.error("只有一个图");
                return;
            }
            const swap = (arr, i, j) => {
                var newArr = JSON.parse(JSON.stringify(arr));
                var temp = newArr[i];
                newArr[i] = newArr[j];
                newArr[j] = temp;
                this.list = newArr;
                // console.log(this.list, "==>list");
            };
            if (type == "up") {
                if (index == this.list.length - 1) {
                    this.$Message.error("已经为最上级");
                    return;
                }
                swap(this.list, index, index + 1);
            }
            if (type == "down") {
                if (index == 0) {
                    this.$Message.error("已经为最下级");
                    return;
                }
                swap(this.list, index, index - 1);
            }
        },
        contenteditableChange(id) {
            let scrollEl = document.getElementById(id);
            scrollEl.scrollTo({ top: 0, behavior: "auto" }); //属性值：默认值auto（相当于instant）、平滑滚动smooth、瞬间滚动instant
        },
        setIconColor(obj) {
            const { base64, id } = obj;
            const index = this.list.findIndex((item) => item.id == id);
            this.list[index].src = base64;
            this.$set(this.list, index, this.list[index]);
        },
        setItemVal(val) {
            const index = this.list.findIndex((item) => item.id == val.id);
            this.list[index][val.valType] = val.val;
            this.$set(this.list, index, this.list[index]);
        },
        setBgColor(val) {
            this.bgColor = val;
        },
        deletes(id) {
            const index = this.list.findIndex((item) => item.id == id);
            this.list.splice(index, 1);
        },
        setDom() {
            this.width = "700";
            this.height = "300";
            // 修改画布后。元素的左距离 = 本来距离*新宽  / 原本宽
            //                顶部距离 = 本来距离*新高  / 原本高
            this.list.forEach((item, index) => {
                item.top = (item.top * 300) / 500;
                item.left = (item.left * 700) / 500;
            });
        },
        save() {
            this.activeId = "";
            this.$nextTick(() => {
                html2canvas(document.querySelector("#img-edit-box-container"), {
                    backgroundColor: null,
                    useCORS: true, // Whether to attempt to load images from a server using CORS
                    allowTaint: true, // 是否允许跨源图像污染画布
                }).then((canvas) => {
                    console.log(canvas.toDataURL("image/png"));
                    const url = canvas.toDataURL("image/png");
                    var a = document.createElement("a"); //新建一个a链接
                    a.setAttribute("href", url); // a链接的url为图片的url
                    a.setAttribute("download", name);
                    a.setAttribute("target", "_blank");
                    let clickEvent = document.createEvent("MouseEvents");
                    clickEvent.initEvent("click", true, true);
                    a.dispatchEvent(clickEvent);
                });
            });
        },
        listDivBlur(id) {
            const index = this.list.findIndex((item) => item.id == id);
            this.list[index].contenteditable = false;
        },
        listItemClickHandler(id) {
            const index = this.list.findIndex((item) => item.id == id);
            this.activeId = id;
            this.$emit("itemClickHandler", this.list[index]);
        },
        divDbClickHandler(id) {
            const index = this.list.findIndex((item) => item.id == id);
            this.list[index].contenteditable = true;
        },
        addImg(src, isIcon = false) {
            const img = new Image();
            img.src = src;
            const _this = this;
            img.onload = function () {
                const id = `editCanvas${new Date().getTime()}`;
                // const zIndex = _this.list.length + 1;
                _this.list.push({
                    id,
                    zIndex: 1,
                    src,
                    ...imgEditData["img"],
                    width: img.width,
                    height: img.height,
                    isIcon,
                });
                _this.$nextTick(() => {
                    const thisDiv = document.getElementById(id);
                    const container = document.getElementById(
                        "img-edit-box-container"
                    );
                    let left = 0;
                    let top = 0;
                    if (container.offsetWidth >= thisDiv.offsetWidth) {
                        left =
                            (container.offsetWidth - thisDiv.offsetWidth) / 2;
                    } else {
                        left = -(
                            (thisDiv.offsetWidth - container.offsetWidth) /
                            2
                        );
                    }
                    if (container.offsetHeight >= thisDiv.offsetHeight) {
                        top =
                            (container.offsetHeight - thisDiv.offsetHeight) / 2;
                    } else {
                        top =
                            -(thisDiv.offsetHeight - container.offsetHeight) /
                            2;
                    }

                    const findItemIndex = _this.list.findIndex(
                        (item) => item.id == id
                    );
                    _this.list[findItemIndex].top = top;
                    _this.list[findItemIndex].left = left;
                    _this.$set(
                        _this.list,
                        findItemIndex,
                        _this.list[findItemIndex]
                    );
                    _this.bindDom(id);
                    _this.bindSetDiv(id);
                });
            };
        },
        addText(type) {
            const id = `editCanvas${new Date().getTime()}`;
            // const zIndex = this.list.length + 1;
            this.list.push({
                id,
                zIndex: 1,
                contenteditable: false,
                ...imgEditData[type],
            });
            this.$nextTick(() => {
                const thisDiv = document.getElementById(id);
                const container = document.getElementById(
                    "img-edit-box-container"
                );
                const left = (container.offsetWidth - thisDiv.offsetWidth) / 2;
                const top = (container.offsetHeight - thisDiv.offsetHeight) / 2;
                const findItemIndex = this.list.findIndex(
                    (item) => item.id == id
                );
                this.list[findItemIndex].top = top;
                this.list[findItemIndex].left = left;
                this.$set(this.list, findItemIndex, this.list[findItemIndex]);
                this.bindDom(id);
                this.bindSetDiv(id);
            });
        },
        bindDom(id) {
            const _this = this;
            let drag = document.getElementById(id);
            let container = document.getElementById("img-edit-box-container");
            drag.onmousedown = function (e) {
                e = e || window.event;
                let diffX = e.clientX - drag.offsetLeft;
                let diffY = e.clientY - drag.offsetTop;
                document.onmousemove = function (e) {
                    e = e || window.event;
                    let left = e.clientX - diffX;
                    let top = e.clientY - diffY;
                    if (left < 0) {
                        left = 0;
                    } else if (
                        left >
                        container.clientWidth - drag.offsetWidth
                    ) {
                        left = container.clientWidth - drag.offsetWidth;
                    }
                    if (top < 0) {
                        top = 0;
                    } else if (
                        top >
                        container.clientHeight - drag.offsetHeight
                    ) {
                        top = container.clientHeight - drag.offsetHeight;
                    }
                    drag.style.left = left + "px";
                    drag.style.top = top + "px";
                    const findItemIndex = _this.list.findIndex(
                        (item) => item.id == drag.id
                    );
                    _this.list[findItemIndex].top = top;
                    _this.list[findItemIndex].left = left;
                };
                document.onmouseup = function (e) {
                    this.onmousemove = null;
                    this.onmouseup = null;
                };
            };
        },
        bindSetDiv(id) {
            var box = document.getElementById(`${id}`);

            const topLeft = document.getElementById(`${id}.top-left`);
            const top = document.getElementById(`${id}.top`);
            const topRight = document.getElementById(`${id}.top-right`);
            const right = document.getElementById(`${id}.right`);
            const bottomRight = document.getElementById(`${id}.bottom-right`);
            const bottom = document.getElementById(`${id}.bottom`);
            const bottomLeft = document.getElementById(`${id}.bottom-left`);
            const left = document.getElementById(`${id}.left`);

            topLeft.addEventListener("mousedown", handleMouseDown);
            top.addEventListener("mousedown", handleMouseDown);
            topRight.addEventListener("mousedown", handleMouseDown);
            right.addEventListener("mousedown", handleMouseDown);
            bottomRight.addEventListener("mousedown", handleMouseDown);
            bottom.addEventListener("mousedown", handleMouseDown);
            bottomLeft.addEventListener("mousedown", handleMouseDown);
            left.addEventListener("mousedown", handleMouseDown);

            function handleMouseDown(e) {
                var point = e.target;
                var startX = e.pageX;
                var startY = e.pageY;
                var startWidth = parseInt(getComputedStyle(box).width);
                var startHeight = parseInt(getComputedStyle(box).height);
                var startTop = parseInt(getComputedStyle(box).top);
                var startLeft = parseInt(getComputedStyle(box).left);

                document.addEventListener("mousemove", handleMouseMove);
                document.addEventListener("mouseup", handleMouseUp);

                function handleMouseMove(e) {
                    const name = point.id.split(".")[1];
                    const id = point.id.split(".")[0];
                    var deltaX = e.pageX - startX;
                    var deltaY = e.pageY - startY;
                    const editBox = document.getElementById(`${id}edit-text`);
                    switch (name) {
                        case "top-left":
                            box.style.width = startWidth - deltaX + "px";
                            box.style.height = startHeight - deltaY + "px";
                            box.style.top = startTop + deltaY + "px";
                            box.style.left = startLeft + deltaX + "px";
                            if (editBox) {
                                editBox.style.width =
                                    startWidth - deltaX + "px";
                                editBox.style.height =
                                    startHeight - deltaY + "px";
                            }
                            break;
                        case "top":
                            box.style.height = startHeight - deltaY + "px";
                            box.style.top = startTop + deltaY + "px";
                            if (editBox) {
                                editBox.style.height =
                                    startHeight - deltaY + "px";
                            }
                            break;
                        case "top-right":
                            box.style.width = startWidth + deltaX + "px";
                            box.style.height = startHeight - deltaY + "px";
                            box.style.top = startTop + deltaY + "px";
                            if (editBox) {
                                editBox.style.width =
                                    startWidth + deltaX + "px";
                                editBox.style.height =
                                    startHeight - deltaY + "px";
                            }
                            break;
                        case "right":
                            box.style.width = startWidth + deltaX + "px";
                            if (editBox) {
                                editBox.style.width =
                                    startWidth + deltaX + "px";
                            }
                            break;
                        case "bottom-right":
                            box.style.width = startWidth + deltaX + "px";
                            box.style.height = startHeight + deltaY + "px";
                            if (editBox) {
                                editBox.style.width =
                                    startWidth + deltaX + "px";
                                editBox.style.height =
                                    startHeight + deltaY + "px";
                            }
                            break;
                        case "bottom":
                            box.style.height = startHeight + deltaY + "px";
                            editBox.style.height = startHeight + deltaY + "px";
                            break;
                        case "bottom-left":
                            box.style.width = startWidth - deltaX + "px";
                            box.style.height = startHeight + deltaY + "px";
                            box.style.left = startLeft + deltaX + "px";
                            if (editBox) {
                                editBox.style.width =
                                    startWidth - deltaX + "px";
                                editBox.style.height =
                                    startHeight + deltaY + "px";
                            }
                            break;
                        case "left":
                            box.style.width = startWidth - deltaX + "px";
                            box.style.left = startLeft + deltaX + "px";
                            if (editBox) {
                                editBox.style.width =
                                    startWidth - deltaX + "px";
                            }
                            break;
                        default:
                            break;
                    }

                    e.stopPropagation();
                    e.preventDefault();
                }

                function handleMouseUp(e) {
                    document.removeEventListener("mousemove", handleMouseMove);
                    document.removeEventListener("mouseup", handleMouseUp);
                }

                e.stopPropagation();
                e.preventDefault();
            }
        },
    },
};
</script>

<style lang="less" scoped>
.edit-box {
    background-color: white;
    width: 500px;
    height: 500px;
}
.img-edit-box {
    width: 500px;
    height: 500px;
    position: relative;
    .list-item {
        position: absolute;
        cursor: pointer;
        .point {
            width: 10px;
            height: 10px;
            background-color: #333;
            position: absolute;
        }

        .top-left {
            top: -5px;
            left: -5px;
            cursor: nw-resize;
        }

        .top {
            top: -5px;
            left: 50%;
            margin-left: -5px;
            cursor: n-resize;
        }

        .top-right {
            top: -5px;
            right: -5px;
            cursor: ne-resize;
        }

        .right {
            top: 50%;
            right: -5px;
            margin-top: -5px;
            cursor: e-resize;
        }

        .bottom-right {
            bottom: -5px;
            right: -5px;
            cursor: se-resize;
        }

        .bottom {
            bottom: -5px;
            left: 50%;
            margin-left: -5px;
            cursor: s-resize;
        }

        .bottom-left {
            bottom: -5px;
            left: -5px;
            cursor: sw-resize;
        }

        .left {
            top: 50%;
            left: -5px;
            margin-top: -5px;
            cursor: w-resize;
        }
    }
    .edit-text {
        text-align: left;
        padding: 2px;
        position: relative;
        word-break: break-all;
        overflow: auto;
    }
    .edit-text::-webkit-scrollbar {
        width: 0px;
    }
    .edit-text::-webkit-scrollbar-thumb {
        border-radius: 0px;
        background-color: #808080;
    }
    .edit-text::-moz-scrollbar {
        width: 0px;
    }
    .edit-text::-moz-scrollbar-thumb {
        border-radius: 0px;
        background-color: #808080;
    }
    .edit-img {
        // width: 100px;
        display: block !important;
        -webkit-user-drag: none;
    }
    .list-item-close {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 20px;
    }
}
.active-bd {
    border: 1px dashed #2d8cf0;
}
[contenteditable]:focus {
    outline: none;
}
</style>
