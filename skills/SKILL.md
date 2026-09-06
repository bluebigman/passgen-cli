# 强密码生成器（passgen-cli）

本地生成强密码/中文口令短语/密码强度检查。纯本地生成，不上传不存储。

本工具仅做本地数据/文本处理，不采集任何个人信息。

## 命令
| 命令 | 用途 |
|---|---|
| `passgen status` | 自检（返回含 ok） |
| `passgen auth` | 校验可用（本地工具无需密钥） |
| `passgen unAuth` | 清除本地状态 |
| `passgen strong [长度] [lun/luns]` | 强密码（小写/大写/数字/符号） |
| `passgen phrase [词数]` | 中文口令短语 |
| `passgen check <密码>` | 强度检查 |

所有命令输出 JSON：`{"code":0|1,"ok":true|false,"data":...,"error":"人类可读错误"}`。

## AI 使用指引
生成密码用 strong/phrase，检查已有密码用 check；提示用户自行保管。
