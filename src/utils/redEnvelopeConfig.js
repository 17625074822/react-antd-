class redEnvelopeConfig {

    // 性别
    static SEX_UNKNOWN = 0
    static SEX_MEN = 1
    static SEX_WOMEN = 2
    static sexAlias = {
        [this.SEX_UNKNOWN]: '未知',
        [this.SEX_MEN]: '男',
        [this.SEX_WOMEN]: '女',
    }

    // 红包是否已拆的状态 status：0.全部 10.未拆  20.已拆
    static STATUS_ALL = 0
    static STATUS_WAITING = 10
    static STATUS_FINISH = 20
    static  statusAlias = {
        [this.STATUS_ALL]: '全部',
        [this.STATUS_WAITING]: '未拆',
        [this.STATUS_FINISH]: '已拆',
    }

}

export default redEnvelopeConfig
