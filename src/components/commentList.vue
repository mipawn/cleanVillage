<template>
  <div>
    <section v-if="list && list.length" class="container__commentlist">
      <div class="item__commentlist" @click="goDetails(item.id)" v-for="(item, index) in list" :key="index">
        <div class="item__thumb">
          <img src="../assets/img/commentlist.png" alt="">
        </div>
        <div class="item__info">
          <div>{{item.title}}</div>
          <div>{{item.create_at}}</div>
        </div>
      </div>
    </section>
    <div v-else-if="!list.length && loading === false" >暂无内容！</div>
    <div class="add" @click="addComment">
      <div></div>
      <div></div>
    </div>
  </div>
</template>
<script>

import { getCommentList } from '../api/index'
import { ImagePreview } from 'vant'

export default {
  data () {
    return {
      list: [],
      info: '',
      page: 0,
      limit: 8,
      loading: false
    }
  },
  methods: {
    goDetails (id) {
      this.$router.push({ name: 'commentDetails', params: { comment_id: id } })
    },
    addComment () {
      this.$router.push({ name: 'comment' })
    },
    getContent () {
      this.loading = true
      getCommentList({
        street_id: this.$route.params.village_id,
        page: this.page + 1,
        limit: this.limit
      }).then(res => {
        this.info = res.data.list.text
        res.data.list.list.forEach(item => {
          item.create_at = item.create_at.slice(0, 10)
        })
        this.list = [...this.list, ...res.data.list.list]
        this.loading = false
        this.page = res.data.list.page.current
      }).catch(() => {
        this.loading = false
      })
    },
    scroll () {
      let height = document.documentElement.clientHeight || document.body.clientHeight;
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      if (scrollHeight - height - scrollTop <= 0 && this.loading === false) {
        this.getContent()
      }
    },
    watchScroll () {
      window.addEventListener('scroll', this.scroll)
      this.$once('hook:beforeDestroy', function () {
        window.removeEventListener('scroll', this.scroll)
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
    document.title = '我有话说'
    this.getContent()
    this.watchScroll()
  }
}
</script>
<style lang="scss" scoped>
.container__inspector {
  padding: 0.5rem 0;
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
.gap {
  height: 0.2rem;
  background: #EAEAEA;
  position: relative;
  left: -0.44rem;
  right: 0;
  width: 7.5rem;
}
.container__commentlist {
  padding: 0 0 1rem;
  margin-bottom: 1.48rem;
}
.item__commentlist {
  height: 1.3rem;
  padding: 0.46rem 0;
  border-bottom: 0.01rem solid #E5E5E5;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.item__thumb {
  width: 1.62rem;
  height: 1.3rem;
  flex: none;
}
.item__info {
  width: 4.4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 1.3rem;
}
.item__info div {
  word-break: break-all;
  font-size: 0.26rem;
  font-family: 'MicrosoftYaHei-light';
  line-height: 1.5;
}
.item__info div:first-child {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
}
.add {
  width: 0.8rem;
  height: 0.8rem;
  background: #F18C79;
  position: fixed;
  right: 0.8rem;
  bottom: 2.4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  div:first-child {
    background: #ffffff;
    width: 60%;
    height: 0.04rem;
    border-radius: 0.04rem;
    position: absolute;
  }
  div:last-child {
    background: #ffffff;
    height: 60%;
    width: 0.04rem;
    border-radius: 0.04rem;
    position: absolute;
  }
}
</style>

<style lang="css">
  .van-image-preview__index, .van-image__img {
    background: #000;
  }
</style>
