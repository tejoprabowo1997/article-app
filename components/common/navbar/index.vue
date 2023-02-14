<script lang="ts" setup>
const router = useRouter()

const goHomePage = () => {
  router.push({ path: '/' })
}
</script>

<template>
  <v-app-bar color="primary">
    <v-container>
      <div class="d-flex">
        <v-app-bar-title style="cursor: pointer" @click="goHomePage">
          Article App
        </v-app-bar-title>
        <div class="ml-auto">
          <v-btn to="/sign_in">Sign In</v-btn>
        </div>
      </div>
    </v-container>
  </v-app-bar>
</template>

<style scoped></style>
