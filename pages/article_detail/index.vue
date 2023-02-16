<script lang="ts" setup>
const title = useCookie('titleDetailFreeArticle')
const content = useCookie('contentDetailFreeArticle')
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="8">
        <v-card>
          <v-card-title>{{ title }}</v-card-title>
          <v-card-text>
            {{ content }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
