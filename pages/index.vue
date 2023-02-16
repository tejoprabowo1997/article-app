<script lang="ts" setup>
import { Ref } from 'vue'
import { H3Error } from 'h3'

const router = useRouter()

interface IDataArticle {
  title: string
  content: string
  status: 'FREE' | 'PAID'
  price: number
  user_id: string
}
interface IResponseGetArticleFree {
  data: Ref<IDataArticle[] | false | null>
  error: Ref<H3Error | null>
}
const { data: resFreeArticle, error: errFreeArticle }: IResponseGetArticleFree =
  await useFetch('/api/article/free')

const detailArticleFree = (article: any) => {
  useCookie('titleDetailFreeArticle').value = article.title
  useCookie('contentDetailFreeArticle').value = article.content
  router.push('/article_detail')
}

interface IResponseGetArticlePaid {
  data: Ref<IDataArticle[] | false | null>
  error: Ref<H3Error | null>
}
const { data: resPaidArticle, error: errPaidArticle }: IResponseGetArticlePaid =
  await useFetch('/api/article/paid')
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h3>Free Article</h3>
      </v-col>
      <v-col cols="12">
        <v-divider />
      </v-col>
      <v-col
        v-for="(freeArticle, keyFreeArticle) in resFreeArticle"
        :key="keyFreeArticle"
        cols="12"
        xl="12"
        lg="12"
        md="12"
        sm="12"
        xs="12"
      >
        <v-card
          style="cursor: pointer"
          class="article"
          @click="detailArticleFree(freeArticle)"
        >
          <v-card-title>{{ freeArticle.title }}</v-card-title>
          <v-card-text class="text-truncate">
            {{ freeArticle.content }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <h3>Paid Article</h3>
      </v-col>
      <v-col cols="12">
        <v-divider />
      </v-col>
      <v-col
        v-for="(paidArticle, keyPaidArticle) in resPaidArticle"
        :key="keyPaidArticle"
        cols="12"
        xl="12"
        lg="12"
        md="12"
        sm="12"
        xs="12"
      >
        <v-card style="cursor: pointer">
          <v-card-title>{{ paidArticle.title }}</v-card-title>
          <v-card-text class="text-truncate">
            {{ paidArticle.content }}
          </v-card-text>
          <v-card-actions>
            <div class="text-primary mr-2">Price: {{ paidArticle.price }}</div>
            <v-btn color="error">PAID</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.article:hover {
  background-color: grey;
}
</style>
