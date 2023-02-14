<script lang="ts" setup>
const router = useRouter()

const goHomePage = () => {
  router.push({ path: '/' })
}
const isLogin = useState('isLogin')
const token = useCookie('token')
if (token.value) isLogin.value = true
</script>

<template>
  <v-app-bar color="primary">
    <v-container>
      <div class="d-flex">
        <v-app-bar-title style="cursor: pointer" @click="goHomePage">
          Article App
        </v-app-bar-title>
        <div class="ml-auto">
          <v-btn v-if="!isLogin" to="/sign_in">Sign In</v-btn>
          <v-btn v-else to="/sign_in">Profile</v-btn>
        </div>
      </div>
    </v-container>
  </v-app-bar>
</template>

<style scoped></style>
