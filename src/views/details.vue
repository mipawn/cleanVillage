<template>
  <div>
    <div class="title">{{content.title}}</div>
    <div class="content" v-html="content.content"></div>
  </div>
</template>

<script>

import { getNewsContent, getNormalDetails, getLabelDetails } from '../api/index'

export default {
  data () {
    return {
      content: ''
    }
  },
  methods: {
    getContent () {
      if (this.$route.name === 'newsDetails') {
        getNormalDetails({
          id: this.$route.params.details_id,
          pid: this.$route.query.tab_id,
          street_id: Number(this.$route.params.village_id)
        }).then(res => {
          this.content = res.data || {}
        })
      } else if (this.$route.name === 'labelDetails') {
        getLabelDetails({
          id: this.$route.params.details_id,
          pid: this.$route.query.tab_id,
          street_id: this.$route.params.village_id,
          type: this.$route.query.type
        }).then(res => {
          this.content = res.data || {}
        })
      } else {
        getNewsContent({
          id: this.$route.params.details_id,
          pid: this.$route.query.tab_id,
          street_id: this.$route.params.village_id
        }).then(res => {
          this.content = res.data || {}
        })
      }
    }
  },
  mounted () {
    this.getContent()
  }
}
</script>

<style lang="scss" scoped>
.content {
  margin-top: 0.4rem;
  /deep/ p {
    font-size: 0.26rem;
    line-height: 1.5;
    // text-indent: 2em;
    text-align: justify;
    margin-top: 0.2rem;
    img {
      max-width: 100%;
      object-fit: cover;
    }
  }
  /deep/ p:first-child {
    margin-top: 0;
  }
}
.title {
  font-size: 0.4rem;
  color: #333333;
  text-align: center;
}
</style>
