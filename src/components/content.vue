<template>
  <div v-if="content" class="content" v-html="content.content" @click="showImage($event)"></div>
  <div v-else-if="!content && loading === false" >暂无内容！</div>
</template>

<script>

import { getContents } from '../api/index'
import { ImagePreview } from 'vant'

export default {
  data () {
    return {
      content: '',
      loading: false
    }
  },
  props: {
    id: {
      required: true,
      default: 0,
      type: Number
    }
  },
  methods: {
    getContent () {
      this.loading = true
      getContents({
        pid: this.id,
        street_id: this.$route.params.village_id
      }).then(res => {
        this.content = res.data || {}
        this.loading = false
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    },
    showImage (e) {
      if (e.target.nodeName === 'IMG') {
        ImagePreview({
          images: [e.target.currentSrc],
          startPosition: 0
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

</style>
