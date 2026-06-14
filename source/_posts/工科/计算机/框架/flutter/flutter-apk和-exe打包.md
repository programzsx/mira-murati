---
title: flutter apk和exe打包
date: 2026-05-31 01:09:12
categories: 
  - 工科
  - 计算机
  - 框架
  - flutter
  - 个人经验
tags:
  - flutter
toc: true  
---

## 打包apk

本地代码地址：`C:\Users\codezsx\codebase\frances-allen`。

![](https://zsx-typora.oss-cn-hangzhou.aliyuncs.com/blog/image-20260531020857483.png)

### 第一步 - 自定义图标的素材

在`assets目录`下放`自定义图标的图片（1024×1024，png）`

![](https://zsx-typora.oss-cn-hangzhou.aliyuncs.com/blog/image-20260531020956545.png)

### 第二步 - 安装依赖

![](https://zsx-typora.oss-cn-hangzhou.aliyuncs.com/blog/image-20260531021407233.png)

执行下面的命令。这是按照图中所示的`pubspec.yaml`安装依赖。

```shell
flutter pub get
```

### 第三步 - 生成自定义图标

老命令如下：

```shell
flutter pub run flutter_launcher_icons
```

新命令如下：

```shell
dart run flutter_launcher_icons
```

----

```
PS C:\users\codezsx\codebase\frances-allen\mobile> flutter pub run flutter_launcher_icons
Deprecated. Use `dart run` instead.
Building package executable... (4.1s)
Built flutter_launcher_icons:flutter_launcher_icons.
════════════════════════════════════════════
   FLUTTER LAUNCHER ICONS (v0.14.4)
════════════════════════════════════════════

• Creating default icons Android
• Overwriting the default Android launcher icon with a new icon
No platform provided

✓ Successfully generated launcher icons
```

### 第四步 - 构建apk

执行下面的命令：

```shell
flutter build apk --release
```

执行的效果如下：

```shell
PS C:\users\codezsx\codebase\frances-allen\mobile> flutter build apk --release
Font asset "MaterialIcons-Regular.otf" was tree-shaken, reducing it from 1645184 to 8092 bytes (99.5% reduction). Tree-shaking can be disabled by providing the --no-tree-shake-icons flag when building your app.
Running Gradle task 'assembleRelease'...                          149.3s
✓ Built build\app\outputs\flutter-apk\app-release.apk (52.4MB)
```

### 第五步 - apk规范命名

![](https://zsx-typora.oss-cn-hangzhou.aliyuncs.com/blog/image-20260531022041298.png)

```shell
copy 
C:\Users\codezsx\codebase\frances-allen\mobile\build\app\outputs\flutter-apk\app-release.apk 
C:\Users\codezsx\codebase\frances-allen\31-build-deploy-env\frances-allen-v1.2.0-build25-20260531.apk
```

## 打包exe

### 第一步 - 删除build文件夹

比如：`C:\Users\codezsx\codebase\barbara-liskov\desktop`

![](https://zsx-typora.oss-cn-hangzhou.aliyuncs.com/blog/image-20260531022752652.png)

### 第二步 - 清理旧构建产物

```shell
flutter clean
```

### 第三步 - 安装依赖

```shell
flutter pub get
```

### 第四步 - 构建

```shell
flutter build windows --release
```

### 第五步 - 放置.env文件

把项目根目录下的`.env`文件，复制放下到如下目录：

```shell
copy .env build\windows\x64\runner\Release\.env
```

打包后的地址：`C:\Users\codezsx\codebase\barbara-liskov\desktop\build\windows\x64\runner\Release`