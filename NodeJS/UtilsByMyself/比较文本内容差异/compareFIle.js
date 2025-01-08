const fs = require("fs");
const path = require("path");

// 文件路径
const subsetFile = path.resolve(__dirname, "textSrc", "sub.txt");
const supersetFile = path.resolve(__dirname, "textSrc", "super.txt");
const resultFile = path.resolve(__dirname, "textSrc", "result.txt");

// 读取文件内容并去重（忽略空行和重复行）
function readFileLines(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`文件不存在: ${filePath}`);
    return [];
  }
  return fs.readFileSync(filePath, "utf-8")
    .split("\n")
    .map(line => line.trim())
    .filter(line => line); // 移除空行
}

function writeFileLines(filePath, lines) {
  fs.writeFileSync(filePath, lines.join("\n"), "utf-8");
  console.log(`结果已写入文件: ${filePath}`);
}

function main() {
  // 读取子集和全集文件，存入集合（Set）
  const subset = new Set(readFileLines(subsetFile));
  const superset = new Set(readFileLines(supersetFile));

  // 找出全集中不在子集的数据（全集 - 子集）
  const missingInSubset = [...superset].filter(item => !subset.has(item));

  // 找出子集中不在全集的数据（子集 - 全集）
  const extraInSubset = [...subset].filter(item => !superset.has(item));

  // 输出多余的数据
  if (extraInSubset.length > 0) {
    console.log("子集中存在全集中没有的数据:");
    console.log(extraInSubset.join("\n"));
  } else {
    console.log("子集数据完全包含于全集中，无额外数据。");
  }

  // 写入结果文件
  writeFileLines(resultFile, missingInSubset);
}

// 执行主程序
main();
