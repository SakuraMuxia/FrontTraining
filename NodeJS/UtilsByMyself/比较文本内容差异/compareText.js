const fs = require("fs");
const path = require("path");

// 比较两个文件内容（忽略行的顺序）
function compareFilesIgnoreOrder(filePath1, filePath2) {
    try {
        // 读取文件内容并按行分割
        const file1Content = fs.readFileSync(filePath1, "utf-8").split("\n").map(line => line.trim());
        const file2Content = fs.readFileSync(filePath2, "utf-8").split("\n").map(line => line.trim());

        // 去除空行并排序
        const file1Lines = file1Content.filter(line => line).sort();
        const file2Lines = file2Content.filter(line => line).sort();

        // 找到文件1中有但文件2中没有的行
        const onlyInFile1 = file1Lines.filter(line => !file2Lines.includes(line));

        // 找到文件2中有但文件1中没有的行
        const onlyInFile2 = file2Lines.filter(line => !file1Lines.includes(line));

        // 输出比较结果
        if (onlyInFile1.length === 0 && onlyInFile2.length === 0) {
            console.log("两个文件的内容完全一致（忽略顺序）。");
        } else {
            if (onlyInFile1.length > 0) {
                console.log("文件1中存在但文件2中不存在的行：");
                console.log(onlyInFile1.join("\n"));
            }

            if (onlyInFile2.length > 0) {
                console.log("文件2中存在但文件1中不存在的行：");
                console.log(onlyInFile2.join("\n"));
            }
        }
    } catch (err) {
        console.error("读取文件时出错：", err.message);
    }
}

// 设置文件路径为当前目录下的 textSrc 子目录内的文件
const filePath1 = path.resolve(__dirname, "textSrc", "file1.txt");
const filePath2 = path.resolve(__dirname, "textSrc", "file2.txt");

// 调用比较函数
compareFilesIgnoreOrder(filePath1, filePath2);
