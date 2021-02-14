class userConfig {

    // 性别
    static SEX_UNKNOWN = 0
    static SEX_MEN = 1
    static SEX_WOMEN = 2
    static sexAlias = {
        [this.SEX_UNKNOWN]: '未知',
        [this.SEX_MEN]: '男',
        [this.SEX_WOMEN]: '女',
    }

    // 状态
    static USER_STATUS_ALL = 0
    static USER_STATUS_YES = 10
    static USER_STATUS_NO = 90
    static  statusAlias = {
        [this.USER_STATUS_ALL]: '全部',
        [this.USER_STATUS_YES]: '活跃',
        [this.USER_STATUS_NO]: '封禁',
    }

}

export default userConfig
