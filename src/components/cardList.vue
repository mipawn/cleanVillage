<template>
  <div v-if="list && list.length">
    <div class="tab-header">
      {{info}}
    </div>
    <div class="card-list">
      <div class="card-item" v-for="(item, index) in list" :key="index">
        <div>{{item.branch}}</div>
        <div>目前党员人数：{{item.num}}人</div>
        <div>支部书记：{{item.clerk}}</div>
        <div>支部委员：{{item.user}}</div>
        <div>支部党员：{{item.party_user}}</div>
        <div class="photo">
          <img :src="itemChild" v-for="(itemChild, indexChild) in item.images" :key="indexChild" @click="showImage(item.images, indexChild)">
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="!list.length && loading === false" >暂无内容！</div>
</template>

<script>

import { getCardList } from '../api/index'
import { ImagePreview } from 'vant'

export default {
  data () {
    return {
      list: [],
      page: 0,
      limit: 3,
      info: '',
      loading: false
    }
  },
  props: {
    id: {
      type: Number,
      default: 0,
      required: true
    }
  },
  methods: {
    getList () {
      this.loading = true
      getCardList({
        pid: this.id,
        street_id: this.$route.params.village_id,
        limit: this.limit,
        page: this.page + 1
      }).then(res => {
        res.data.list.list = res.data.list.list.map(item => {
          item.images = item.images.split('|')
          return item
        })
        this.list = [...this.list, ...res.data.list.list]
        this.info = res.data.list.text
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
        this.getList()
      }
    },
    watchScroll () {
      window.addEventListener('scroll', this.scroll)
      this.$once('hook:beforeDestroy', function () {
        window.removeEventListener('scroll', this.scroll)
      })
    },
    showImage (img, index) {
      ImagePreview({
        images: img,
        startPosition: Number(index)
      })
    }
  },
  mounted () {
    this.getList()
    this.watchScroll()
  }
}
</script>

<style lang="scss" scoped>
.tab-header {
  font-size: 0.26rem;
  line-height: 2;
  text-align: justify;
  font-family: 'MicrosoftYaHei-Light';
  box-shadow:0 0.08rem 0.17rem 0 rgba(151,151,151,0.16);
  padding: 0.4rem;
  text-indent: 2em;
  margin-bottom: 0.3rem;
}
.card-item {
  box-shadow: 0 0.08rem 0.4rem 0 rgba(151,151,151,0.3);
  height: 8rem;
  padding: 0 0.44rem;
  box-sizing: border-box;
  margin-bottom: 0.3rem;
  div {
    height: 1rem;
    border-bottom: 0.01rem solid #E5E5E5;
    line-height: 1rem;
    font-weight: 300;
    font-family: 'MicrosoftYaHei-Regular';
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  div:first-child {
    border-bottom: 0.01rem solid #F18C79;
    font-weight: bold;
    font-family: 'MicrosoftYaHei-Bold';
  }
  div:last-child {
    border-bottom: none;
  }
  .photo {
    height: 2.4rem;
    padding: 0.2rem 0;
    overflow-x: scroll;
    display: flex;
    align-items: center;
    // -webkit-overflow-scrolling: touch;
    img {
      width: 1.8rem;
      object-fit: cover;
      margin-left: 0.2rem;
      flex: none;
    }
    img:first-child {
      margin-left: 0;
    }
  }
}
</style>
