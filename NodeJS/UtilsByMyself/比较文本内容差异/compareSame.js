const fs = require('fs');
const path = require('path');

// 文件路径
const fileAPath = path.resolve(__dirname, "textSrc", "file7.txt");
const fileBPath = path.resolve(__dirname, "textSrc", "file8.txt");
const outputPath = path.resolve(__dirname, "textSrc", "com8.txt");

// 读取文件内容
function readFileContent(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf-8')
      .split('\n')
      .map(line => line.trim())
      .filter(line => line); // 过滤掉空行
  } catch (err) {
    console.error(`读取文件失败: ${filePath}`, err);
    return [];
  }
}

// 写入内容到文件
function writeFileContent(filePath, content) {
  try {
    fs.writeFileSync(filePath, content.join('\n'), 'utf-8');
    console.log(`合并后的内容已写入到: ${filePath}`);
  } catch (err) {
    console.error(`写入文件失败: ${filePath}`, err);
  }
}

// 合并文件内容并去重
function mergeFiles(fileAPath, fileBPath, outputPath) {
  const contentA = readFileContent(fileAPath);
  const contentB = readFileContent(fileBPath);

  // 合并两个数组并去重,并排序
  const mergedContent = Array.from(new Set([...contentA, ...contentB])).sort();

  // 写入到新文件
  writeFileContent(outputPath, mergedContent);
}

// 执行合并
mergeFiles(fileAPath, fileBPath, outputPath);
