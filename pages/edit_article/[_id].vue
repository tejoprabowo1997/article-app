<script lang="ts" setup>
const token: any = useCookie('token')
const route = useRoute()
const _idArticle: any = route.params._id
const router = useRouter()

const title = ref(useCookie('titleArticleEdit').value)
const content = ref(useCookie('titleArticleContent').value)
const status = ref(useCookie('titleArticleStatus').value)
const price = ref(useCookie('titleArticlePrice').value)
const selectStatusArticle = ref<string[]>(['FREE', 'PAID'])

const showInputPrice = ref<boolean>(false)
if (status.value === 'PAID') showInputPrice.value = true
else showInputPrice.value = false
watch(status, function (val) {
  if (val === 'FREE') showInputPrice.value = false
  if (val === 'PAID') showInputPrice.value = true
})

const inputValidation = () => {
  let error: boolean = false

  if (!title.value) {
    alert('Title cannot be empty')
    error = true
  }

  if (!content.value) {
    alert('Content cannot be empty')
    error = true
  }

  if (content.value) {
    const contentLength = content.value.length
    if (contentLength < 500) {
      alert('Content min 500 character')
      error = true
    }
  }

  if (status.value === 'PAID') {
    if (!price.value) {
      alert('Price cannot be empty')
      error = true
    }
  }

  return error
}

const updateArticle = async () => {
  const errInput = inputValidation()
  if (errInput) return

  interface IDataUpdateArticle {
    filter: {
      _id: string
    }
    update: {
      title: string
      content: string
      status: 'FREE' | 'PAID'
      price: number
    }
  }

  const dataArticle: IDataUpdateArticle = {
    filter: {
      _id: _idArticle,
    },
    update: {
      title: title.value,
      content: content.value,
      status: status.value,
      price: price.value,
    },
  }

  const { data, error } = await useLazyFetch('/api/article/update', {
    headers: {
      token: token.value,
    },
    method: 'post',
    body: dataArticle,
  })

  router.push({ path: '/profile' })
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
              <v-card-title> Edit Article </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="title" label="Title" hide-details />
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      v-model="content"
                      label="Content"
                      hide-details
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      v-model="status"
                      :items="selectStatusArticle"
                      label="Status"
                      hide-details
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-if="showInputPrice"
                      v-model="price"
                      label="Price"
                      hide-details
                    />
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-btn block variant="outlined" @click="updateArticle">
                  Update Article
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
