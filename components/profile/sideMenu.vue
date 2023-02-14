<script lang="ts" setup></script>

<template>
  <v-card>
    <v-card-title> Menu </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-btn to="/profile" variant="outlined" block> Profile </v-btn>
        </v-col>
        <v-col cols="12">
          <v-btn to="/add_article" variant="outlined" block>
            Add Article
          </v-btn>
        </v-col>
        <v-col cols="12">
          <v-btn to="/logout" variant="outlined" block> Sign Out </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style scoped></style>
