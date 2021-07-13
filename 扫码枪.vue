/*  扫码枪就是普通那种，先找到一个有焦点的input，然后扫码枪工作，将扫描到的信息录入到input中，必须要有焦点。

打开modal，后input自动聚焦，出现焦点（就是那个一闪一闪的杠杠）。

点击其他位置的时候焦点丢失，然后立即回来，防止用户误点击后，再扫码，找不到焦点就得不到数据。
扫码枪原理就是相当于键盘操作，我们只要给一个输入框获取焦点就行。 */
<template>

  <!-- ant-design-vue 框架，Modal可以忽略，主要看input -->

  <a-modal :visible="visible"

           title="订单详情"

           @cancel="handleCancel">

    <input ref="inputdata"

           v-model="scanData"

           style=""

           @blur="inputblur()" /> {{scanData}}

  </a-modal>

</template>

<script>

export default {

  name: 'OrderScan',

  props: {

    value: {}

  },

  data () {

    return {

      scanData: ''

    }

  },

  computed: {

    visible () {

      return this.value

    }

  },

  methods: {

    // 初始获取焦点

    keyPress () {

      // nextTick 针对DOM 没有渲染出现Undefined问题

      this.$nextTick(() => {

        this.$refs.inputdata.focus()

      })

    },

    handleCancel () {

      this.$emit('input', false)

    },

    // 失去焦点

    inputblur () {

      let that = this

      // FireFox 和 IE 失去焦点，blur直接执行focus 不会生效，加个延时

      setTimeout(() => {

        that.$refs.inputdata.focus()

      }, 10)

    }

  },

  watch: {

    // 监听Modal状态，当Modal 打开，文本框焦点存在

    visible (val) {

      if (val) {

        this.keyPress()

      }

    }

  },

  mounted () {

  }

}

</script>

<style>

</style>
