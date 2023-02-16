<script lang="ts" setup>
import { Ref } from 'vue'
import { H3Error } from 'h3'

const token: any = useCookie('token')
const router = useRouter()

interface IResponseGetProfile {
  data: Ref<{
    name: string
    username: string
    email: string
    password: string
    balance: number
  } | null>
  error: Ref<H3Error | null>
}
const { data: resProfile, error: errProfile }: IResponseGetProfile =
  await useFetch('/api/profile', {
    headers: {
      token: token.value,
    },
  })

interface IDataArticle {
  title: string
  content: string
  status: 'FREE' | 'PAID'
  price: number
  user_id: string
}
interface IResponseGetArticle {
  data: Ref<IDataArticle[] | false | null>
  error: Ref<H3Error | null>
  refresh: (opts?: { dedupe?: boolean }) => Promise<void>
}

const {
  data: resArticle,
  error: errArticle,
  refresh: refreshArticle,
}: IResponseGetArticle = await useFetch('/api/article', {
  headers: {
    token: token.value,
  },
})

const editArticle = (article: any) => {
  useCookie('titleArticleEdit').value = article.title
  useCookie('titleArticleContent').value = article.content
  useCookie('titleArticleStatus').value = article.status
  useCookie('titleArticlePrice').value = article.price
  router.push({ path: `/edit_article/${article._id.toString()}` })
}

const deleteArticle = async (idArticle: any) => {
  await useFetch('/api/article/delete', {
    method: 'post',
    body: idArticle,
  })

  await refreshArticle()
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col cols="3">
            <profile-side-menu />
          </v-col>
          <v-col cols="9">
            <v-card>
              <v-card-title> Profile </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="6">
                    <label>Name</label>
                    <v-text-field
                      :value="resProfile?.name"
                      readonly
                      hide-details
                    />
                  </v-col>
                  <v-col cols="6">
                    <label>Username</label>
                    <v-text-field
                      :value="resProfile?.username"
                      readonly
                      hide-details
                    />
                  </v-col>
                  <v-col cols="6">
                    <label>Email</label>
                    <v-text-field
                      :value="resProfile?.email"
                      readonly
                      hide-details
                    />
                  </v-col>
                  <v-col cols="6">
                    <label>Balance</label>
                    <v-text-field
                      :value="resProfile?.balance"
                      readonly
                      hide-details
                    />
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <v-card class="mt-10" elevation="0">
              <v-card-title> Your written work </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col v-if="resArticle.length === 0">
                    <v-card>
                      <v-card-text>
                        You dont have any written work
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col
                    v-else
                    v-for="(article, keyArticle) in resArticle"
                    :key="keyArticle"
                    col="6"
                  >
                    <v-card>
                      <v-card-title>
                        {{ article.title }}
                      </v-card-title>
                      <v-card-text class="text-truncate">
                        {{ article.content }}
                      </v-card-text>
                      <v-card-actions class="text-primary">
                        <div v-if="article.status === 'PAID'" class="mr-2">
                          Price: {{ article.price }}
                        </div>

                        <v-btn
                          color="error"
                          class="mr-2"
                          @click="deleteArticle(article._id)"
                        >
                          Delete article
                        </v-btn>
                        <v-btn color="warning" @click="editArticle(article)">
                          Edit article
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <v-card class="mt-10" elevation="0">
              <v-card-title> Article you purchased </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col col="6">
                    <v-card>
                      <v-card-title> Article 1 </v-card-title>
                      <v-card-text>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Corporis distinctio magni perferendis perspiciatis
                        velit. Ab consectetur consequatur distinctio excepturi
                        necessitatibus numquam, porro repellat. Amet libero nemo
                        non obcaecati provident soluta.
                      </v-card-text>
                    </v-card>
                  </v-col>

                  <v-col col="6">
                    <v-card>
                      <v-card-title> Article 2 </v-card-title>
                      <v-card-text>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Corporis distinctio magni perferendis perspiciatis
                        velit. Ab consectetur consequatur distinctio excepturi
                        necessitatibus numquam, porro repellat. Amet libero nemo
                        non obcaecati provident soluta.
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
