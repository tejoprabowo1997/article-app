<script lang="ts" setup>
import { Ref } from 'vue'
import { H3Error } from 'h3'

const token: any = useCookie('token')

interface IResponse {
  data: Ref<{
    name: string
    username: string
    email: string
    password: string
    balance: number
  } | null>
  error: Ref<H3Error | null>
}
const { data, error }: IResponse = await useFetch('/api/profile', {
  headers: {
    token: token.value,
  },
})
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
                    <v-text-field :value="data?.name" readonly hide-details />
                  </v-col>
                  <v-col cols="6">
                    <label>Username</label>
                    <v-text-field
                      :value="data?.username"
                      readonly
                      hide-details
                    />
                  </v-col>
                  <v-col cols="6">
                    <label>Email</label>
                    <v-text-field :value="data?.email" readonly hide-details />
                  </v-col>
                  <v-col cols="6">
                    <label>Balance</label>
                    <v-text-field
                      :value="data?.balance"
                      readonly
                      hide-details
                    />
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
