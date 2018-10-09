<!-- 用于显示在线运行结果的卡槽 -->
<template>
    <iframe frameborder="0">
        <!DOCTYPE html>
        <html>
            <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width,initial-scale=1.0">
            <title>在线运行效果展示</title>
            <!-- 此处是样式卡槽 -->
            <slot name="style"></slot>
            </head>
            <body>
                <!-- js链接卡槽 -->
                <slot></slot>
                <slot name="js"></slot>
                <!-- dom结构卡槽 -->
                <slot name="body"></slot>
            </body>
        </html>
    </iframe>
</template>
<script>

</script>
<style>

</style>