<script lang="ts" setup>
import { Ref } from 'vue'
import { H3Error } from 'h3'

const router = useRouter()

const name = ref<string>('')
const email = ref<string>('')
const username = ref<string>('')
const password = ref<string>('')
const reTypePassword = ref<string>('')

const inputValidation = () => {
  let error: boolean = false

  if (!name.value) {
    alert('Name cannot be empty')
    error = true
  }
  if (!email.value) {
    alert('Email cannot be empty')
    error = true
  }
  if (!username.value) {
    alert('Username cannot be empty')
    error = true
  }
  if (!password.value) {
    alert('Password cannot be empty')
    error = true
  }
  if (!reTypePassword.value) {
    alert('ReType Password cannot be empty')
    error = true
  }
  if (reTypePassword.value !== password.value) {
    alert("Password doesn't match")
    error = true
  }

  return error
}

const createUser = async () => {
  const errInput = inputValidation()
  if (errInput) return

  interface IDataCreateUser {
    name: string
    username: string
    email: string
    password: string
  }
  interface IResponse {
    data: Ref<IDataCreateUser | null>
    error: Ref<H3Error | null>
  }

  const dataCreateUser: IDataCreateUser = {
    name: name.value,
    username: username.value,
    email: email.value,
    password: password.value,
  }

  const { data, error }: IResponse = await useLazyFetch('/api/sign_up', {
    method: 'post',
    body: dataCreateUser,
  })

  if (error.value) {
    alert(error.value.data.message)
  }

  if (data.value) {
    name.value = ''
    username.value = ''
    email.value = ''
    password.value = ''
    reTypePassword.value = ''
    router.push({ path: '/sign_in' })
  }
}
</script>

<template>
  <v-container>
    <v-row align="center" no-gutters class="h-screen" justify="center">
      <v-col cols="12" xl="6" lg="6" md="10" sm="12" xs="12">
        <v-card>
          <v-toolbar color="primary">
            <v-toolbar-title> Sign Up Article App </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-container fluid>
              <v-row>
                <v-col cols="=12" xl="12" lg="12" md="12" sm="12" xs="12">
                  <v-text-field
                    v-model="name"
                    label="Name"
                    variant="outlined"
                    hide-details
                    color="primary"
                  />
                </v-col>
                <v-col cols="=12" xl="12" lg="12" md="12" sm="12" xs="12">
                  <v-text-field
                    v-model="email"
                    label="Email"
                    variant="outlined"
                    hide-details
                    color="primary"
                  />
                </v-col>
                <v-col cols="=12" xl="12" lg="12" md="12" sm="12" xs="12">
                  <v-text-field
                    v-model="username"
                    label="Username"
                    variant="outlined"
                    hide-details
                    color="primary"
                  />
                </v-col>
                <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12">
                  <v-text-field
                    v-model="password"
                    type="password"
                    label="Password"
                    variant="outlined"
                    hide-details
                    color="primary"
                  />
                </v-col>
                <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12">
                  <v-text-field
                    v-model="reTypePassword"
                    type="password"
                    label="ReType Password"
                    variant="outlined"
                    hide-details
                    color="primary"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-container fluid>
              <v-row>
                <v-col col="6">
                  <v-btn to="/sign_in" color="warning" block>Sign In</v-btn>
                </v-col>
                <v-col col="6">
                  <v-btn color="primary" block @click="createUser">
                    Sign Up
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
