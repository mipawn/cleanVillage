<template>
  <div v-if="content">
    <section class="container__inspector">
      <img :src="content.photo_img" alt="" class="inspector-avatur" @click="showImage(content.photo_img)">
      <div class="inspector-info">
        <div>{{content.realname}}</div>
        <div>职务：{{content.job}}<br>电话：{{content.telphone}}</div>
        <div>一句话承诺：<br>{{content.motto}}</div>
      </div>
    </section>
    <section class="address" v-html="content.content">
    </section>
  </div>
  <div v-else-if="!content && loading === false" >暂无内容！</div>
</template>

<script>

import { getInspectorDetails } from '../api/index'
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
      default: 0,
      type: Number,
      required: true
    }
  },
  methods: {
    getContent () {
      this.loading = true
      getInspectorDetails({
        pid: this.id,
        street_id: this.$route.params.village_id
      }).then(res => {
        this.content = res.data
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    showImage (img) {
      ImagePreview({
        images: [
          img
        ],
        startPosition: 0
      })
    }
  },
  mounted () {
    this.getContent()
  }
}
</script>

<style lang="scss" scoped>
.container__inspector {
  display: flex;
  height: 3rem;
}
.inspector-avatur {
  width: 2.5rem;
  height: 3rem;
  flex: none;
  object-fit: cover;
}
.inspector-info {
  margin-left: 0.5rem;
  flex: none;
}
.inspector-info div:first-child {
  font-family:'MicrosoftYaHei-bold';
  font-weight:bold;
  color:#000000;
  font-size: 0.36rem;
}
.inspector-info div:nth-child(2) {
  margin-top: 0.38rem;
  font-weight:400;
  font-size: 0.26rem;
  line-height: 1.5;
}
.inspector-info div:nth-child(3) {
  margin-top: 0.26rem;
  font-weight:400;
  font-size: 0.26rem;
  line-height: 1.5;
  font-family:'MicrosoftYaHei-regular';
  width: 2.8rem;
  text-align: justify;
}
.address {
  margin-top: 0.8rem;
  /deep/ img {
    width: 100%;
    object-fit: cover;
  }
  /deep/ p {
    margin-top: 0.2rem;
    font-size: 0.26rem;
  }
}
</style>
<style lang="css">
  .van-image-preview__index, .van-image__img {
    background: #000;
  }
</style>
